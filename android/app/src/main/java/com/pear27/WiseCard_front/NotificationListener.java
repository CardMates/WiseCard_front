package com.pear27.WiseCard_front;

import android.os.Build;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

public class NotificationListener extends NotificationListenerService {

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        // 수집 대상 패키지 필터(예: 카드/결제 앱) - 필요 시 조건 추가
        String pkg = sbn.getPackageName();

        CharSequence titleCs = sbn.getNotification().extras.getCharSequence("android.title");
        CharSequence textCs  = sbn.getNotification().extras.getCharSequence("android.text");

        String title = titleCs != null ? titleCs.toString() : "";
        String text  = textCs  != null ? textCs.toString()  : "";

        // 확장 텍스트(있다면)
        if (TextUtils.isEmpty(text) && Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            CharSequence bigText = sbn.getNotification().extras.getCharSequence("android.bigText");
            if (bigText != null) text = bigText.toString();
        }

        WritableMap payload = Arguments.createMap();
        payload.putString("package", pkg);
        payload.putString("title", title);
        payload.putString("text", text);
        payload.putDouble("postedAt", sbn.getPostTime()); // epoch ms

        // === JS로 이벤트 발송 ===
        NotificationBridgeModule.sendNotificationEvent("OnNotificationReceived", payload);
    }

    @Override
    public void onListenerConnected() {
        super.onListenerConnected();
        // 서비스 인스턴스를 Bridge 모듈에 전달
        NotificationBridgeModule.setNotificationListenerInstance(this);
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        // 필요 시 구현
    }
}
