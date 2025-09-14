package com.pear27.WiseCard_front;

import java.util.Arrays;
import java.util.List;

import android.os.Build;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;

public class NotificationListener extends NotificationListenerService {

    private static final List<String> whitelist = Arrays.asList(
            /* 은행 */
            "com.kbstar.kbbank",
            "com.shinhan.sbanking",
            "com.wooribank.smart.npib",
            "com.hanabank.ebk.channel.android.hananbank",
            "nh.smartbank",
            "com.ibk.neobanking",
            "com.scfirstbank.pib.smart",
            "com.kakaobank.channel",
            "viva.republica.tossbank",
            /* 카드 */
            "com.shinhancard.smartshinhan",
            "kr.co.samsungcard.mpocket",
            "com.kbcard.cxh.appcard",
            "com.hyundaicard.appcard",
            "com.wooricard.smartapp",
            "com.lotte.lottecard.o2",
            "com.hanacard.paycla",
            "com.bccard.smartapp",
            "nh.card.smart",
            /* 페이 */
            "com.kakaopay.app",
            "com.samsung.android.spay",
            "viva.republica.toss",
            "com.nhnent.payapp",
            "com.koces.android.zeroPay"
    );

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        // 수집 대상 패키지 필터(예: 카드/결제 앱) - 필요 시 조건 추가
        String pkg = sbn.getPackageName();

        if (!whitelist.contains(pkg)) return;

        CharSequence titleCs = sbn.getNotification().extras.getCharSequence("android.title");
        CharSequence textCs  = sbn.getNotification().extras.getCharSequence("android.text");
        CharSequence bigTextCs = sbn.getNotification().extras.getCharSequence("android.bigText");

        String title = titleCs != null ? titleCs.toString() : "";
        String text  = textCs  != null ? textCs.toString()  : "";

        if (TextUtils.isEmpty(text) && bigTextCs != null) {
            text = bigTextCs.toString();
        }

        // title, text 모두 비어 있는 경우 return
        if (TextUtils.isEmpty(title) && TextUtils.isEmpty(text)) return;

        WritableMap payload = Arguments.createMap();
        payload.putString("package", pkg);
        payload.putString("title", title);
        payload.putString("text", text);
        payload.putDouble("postedAt", sbn.getPostTime()); // epoch ms

        // 백엔드 서버 전송
        sendToServer(pkg, title, text, sbn.getPostTime());

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

    private void sendToServer(String pkg, String title, String text, long postedAt){
        OkHttpClient client = new OkHttpClient();

        RequestBody body = new FormBody.Builder()
                .add("package", pkg)
                .add("title", title != null ? title : "")
                .add("text", text != null ? text : "")
                .add("postedAt", String.valueOf(postedAt))
                .build();
        /*
        Request request = new Request.Builder()
                .url("https://your-backend.com/api/notifications")
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override public void onFailure(Call call, IOException e) { e.printStackTrace(); }
            @Override public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
            }
        });
         */

        // ✅ 콘솔 출력용 문자열로 변환
        if (body instanceof FormBody) {
            FormBody formBody = (FormBody) body;
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < formBody.size(); i++) {
                sb.append(formBody.name(i))
                        .append("=")
                        .append(formBody.value(i));
                if (i < formBody.size() - 1) sb.append(", ");
            }
            Log.d("NotificationListener", "📌 알림 Body: {" + sb.toString() + "}");
        }
    }
}