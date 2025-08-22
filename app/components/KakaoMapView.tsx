import React from 'react';
import { WebView } from 'react-native-webview';

export default function KakaoMapView() {
    const kakaoApiKey = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}"></script>
      </head>
      <body style="margin:0; padding:0;">
        <div id="map" style="width:100%; height:100vh;"></div>
        <script>
          var map = new kakao.maps.Map(document.getElementById('map'), {
            center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울시청 좌표
            level: 3
          });
        </script>
      </body>
    </html>
  `;

    return <WebView source={{ html }} style={{ flex: 1 }} />;
}
