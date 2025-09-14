package com.pear27.WiseCard_front;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.service.notification.StatusBarNotification;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class NotificationBridgeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "NotificationBridge";

    private static ReactApplicationContext reactContext = null;
    private static NotificationListener notificationListenerInstance = null;

    // 이벤트 큐: 이벤트명을 같이 보관하기 위해 PendingEvent 사용
    private static final List<PendingEvent> pendingEvents =
            Collections.synchronizedList(new ArrayList<PendingEvent>());

    // simple holder for queued events
    private static class PendingEvent {
        final String eventName;
        final WritableMap payload;
        PendingEvent(String eventName, WritableMap payload) {
            this.eventName = eventName;
            this.payload = payload;
        }
    }

    public NotificationBridgeModule(ReactApplicationContext context) {
        super(context);
        reactContext = context; // 정적 보관: 서비스에서 꺼내 쓰기 위함
    }

    @NonNull @Override
    public String getName() {
        return NAME;
    }

    public static void setNotificationListenerInstance(NotificationListener instance) {
        notificationListenerInstance = instance;

        // reactContext가 이미 준비되어 있으면 큐를 플러시
        if (reactContext != null) {
            synchronized (pendingEvents) {
                for (PendingEvent ev : pendingEvents) {
                    sendEventToJS(ev.eventName, ev.payload);
                }
                pendingEvents.clear();
            }
        }
    }

    /** RN에서 상태 체크용으로 호출 가능하게 노출 */
    @ReactMethod
    public void isListenerConnected(Promise promise) {
        promise.resolve(isListenerConnected());
    }

    /** static helper */
    public static boolean isListenerConnected() {
        return notificationListenerInstance != null;
    }

    @ReactMethod
    public void getActiveNotifications(Promise promise) {
        if (notificationListenerInstance == null) {
            promise.reject("NO_LISTENER", "NotificationListener not connected");
            return;
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            try {
                StatusBarNotification[] active = notificationListenerInstance.getActiveNotifications();
                WritableArray arr = Arguments.createArray();
                if (active != null) {
                    for (StatusBarNotification sbn : active) {
                        WritableMap map = Arguments.createMap();
                        map.putString("package", sbn.getPackageName());
                        CharSequence titleCs = sbn.getNotification().extras.getCharSequence("android.title");
                        CharSequence textCs = sbn.getNotification().extras.getCharSequence("android.text");
                        String title = titleCs != null ? titleCs.toString() : "";
                        String text = textCs != null ? textCs.toString() : "";
                        map.putString("title", title);
                        map.putString("text", text);
                        map.putDouble("postedAt", sbn.getPostTime());
                        arr.pushMap(map);
                    }
                }
                promise.resolve(arr);
            } catch (Exception e) {
                promise.reject("ERR_ACTIVE_NOTIFS", e);
            }
        } else {
            promise.reject("NOT_SUPPORTED", "Requires API >= 18");
        }
    }

    @ReactMethod
    public void getInstalledApps(Promise promise) {
        try {
            PackageManager pm = getReactApplicationContext().getPackageManager();
            List<ApplicationInfo> apps = pm.getInstalledApplications(PackageManager.GET_META_DATA);

            WritableArray result = Arguments.createArray();
            for (ApplicationInfo app : apps) {
                String appName = pm.getApplicationLabel(app).toString();
                String packageName = app.packageName;

                WritableMap map = Arguments.createMap();
                map.putString("name", appName);
                map.putString("package", packageName);

                result.pushMap(map);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERR_GET_APPS", e);
        }
    }

        /** 서비스에서 호출하는 정적 이벤트 전송 헬퍼 */    
        public static void sendNotificationEvent(String eventName, @Nullable WritableMap payload) {
        if (reactContext == null) {
            // reactContext가 없으면 큐에 저장
            // payload가 null일 수 있으므로 null-safe 처리: 빈 map으로 대체하거나 허용
            WritableMap safePayload = payload != null ? payload : Arguments.createMap();
            pendingEvents.add(new PendingEvent(eventName, safePayload));
            Log.d(NAME, "ReactContext not ready, queued event: " + eventName);
            return;
        }

        // 즉시 JS로 보냄
        sendEventToJS(eventName, payload != null ? payload : Arguments.createMap());
    }

    /** JS로 이벤트를 보낼 때는 UI 스레드에서 호출 (안전성) */
    private static void sendEventToJS(final String eventName, final WritableMap payload) {
        if (reactContext == null) return;

        // runOnUiQueueThread을 이용해 안전하게 emit
        reactContext.runOnUiQueueThread(new Runnable() {
            @Override
            public void run() {
                try {
                    reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit(eventName, payload);
                } catch (Exception e) {
                    Log.w(NAME, "Failed to emit event to JS: " + eventName, e);
                }
            }
        });
    }

    /** 설정 화면 열기: 사용자에게 알림 접근 권한 켜도록 유도 */
    @ReactMethod
    public void openNotificationAccessSettings() {
        Activity activity = getCurrentActivity();
        Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
        if (activity != null) {
            try {
                activity.startActivity(intent);
            } catch (Exception e) {
                // fallback
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                reactContext.startActivity(intent);
            }
        } else {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        }
    }

    /** 간단한 헬스체크(옵션) */
    @ReactMethod
    public void ping() {
        WritableMap map = Arguments.createMap();
        map.putString("status", "ok");
        sendNotificationEvent("NotificationBridge::Ping", map);
    }
}
