package com.pear27.WiseCard_front;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.provider.Settings;

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
import java.util.HashSet;
import java.util.Set;

public class NotificationBridgeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "NotificationBridge";
    private static ReactApplicationContext reactContext;

    private Set<String> selectedApps = new HashSet<>();

    public NotificationBridgeModule(ReactApplicationContext context) {
        super(context);
        reactContext = context; // 정적 보관: 서비스에서 꺼내 쓰기 위함
    }

    @NonNull @Override
    public String getName() {
        return NAME;
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
                map.putString("name",appName);
                map.putString("package",packageName);

                result.pushMap(map);
            }

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject("ERR_GET_APPS", e);
        }
    }

    /** 서비스에서 호출하는 정적 이벤트 전송 헬퍼 */
    public static void sendNotificationEvent(String eventName, @Nullable WritableMap payload) {
        if (reactContext == null) return;
        try {
            reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, payload);
        } catch (Exception ignored) {
            // 앱이 아직 초기화 전일 수 있음
        }
    }

    /** 설정 화면 열기: 사용자에게 알림 접근 권한 켜도록 유도 */
    @ReactMethod
    public void openNotificationAccessSettings() {
        Activity activity = getCurrentActivity();
        Intent intent = new Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS);
        if (activity != null) {
            activity.startActivity(intent);
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
