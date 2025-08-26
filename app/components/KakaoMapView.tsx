import useLocaiton from '@/src/hooks/useLocation';
import { MenuButtonStyles } from '@/src/styles/buttons/MenuBtn';
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { MenuButton } from './Button';
import Loading from './Loading';
import SearchBar from './SearchBar';

export default function KakaoMapView() {
  const kakaoApiKey = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY
  const location = useLocaiton();
  const webViewRef = useRef<WebView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (!location) return <Loading />;

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // 백엔드 요청 함수
  const fetchResults = async () => {
    const data = {
      query: searchQuery,
      category: selectedCategory,
    }
    try {
      /*
      const response = await axios.post('https://your-backend.com/api/search', data);
      */
      console.log(data);
    } catch (error) {
      console.error('검색 요청 실패:', error);
    }
  };

  // 현재 위치 가져오기 로직
  const handleRefreshLocation = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      // 1) 즉시: 마지막으로 알고 있는 위치가 있으면 먼저 반영해 체감 속도 향상
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        const { latitude, longitude } = lastKnown.coords;
        webViewRef.current?.injectJavaScript(`moveToCurrentLocation(${latitude}, ${longitude}); true;`);
      }

      // 2) 병렬로 최신 위치 요청 (균형 정확도 + 짧은 타임아웃)
      const getFreshPosition = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });

      const withTimeout = new Promise<Location.LocationObject>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Location timeout')), 6000);
        getFreshPosition
          .then((r) => {
            clearTimeout(timer);
            resolve(r);
          })
          .catch((e) => {
            clearTimeout(timer);
            reject(e);
          });
      });

      const fresh = await withTimeout;
      const { latitude, longitude } = fresh.coords;
      webViewRef.current?.injectJavaScript(`moveToCurrentLocation(${latitude}, ${longitude}); true;`);
    } catch (error) {
      console.warn('Failed to refresh precise location, kept last known if any.', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const onMessage = (event: any) => {
    const data = event.nativeEvent.data;
    console.log('WebView에서 받은 메시지:', data)
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false"></script>
      </head>
      <body style="margin:0; padding:0;">
        <div id="map" style="width:100%; height:100vh;"></div>
        <script>
        // SDK 로드 후 지도 초기화
          kakao.maps.load(function() {
            var map;
            var marker;

            function initMap(lat, lng) {
              map = new kakao.maps.Map(document.getElementById('map'), {
                center: new kakao.maps.LatLng(lat, lng),
                level: 3
              });
              marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(lat, lng)
              });
              marker.setMap(map);
            } 
            initMap(${location.lat}, ${location.lng})
          
            // 지도 센터만 현재 위치로 이동시키는 함수
            window.moveToCurrentLocation = function(lat, lng) {
              if (!map) return;
              map.setCenter(new kakao.maps.LatLng(lat, lng));
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ html }}
        style={styles.webview}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        startInLoadingState={true}
        renderLoading={() => <Loading />}
        onMessage={onMessage}
      />

      {/* 오버레이 */}
      <View style={styles.filterContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearchChange}
          onSubmitEditing={fetchResults} // 엔터/완료 누르면 실행
        />
      </View>
      <View style={styles.buttonContainer}>
        <MenuButton
          icon={require('../../assets/images/icons/crosshairs.png')}
          onPress={handleRefreshLocation}
          disabled={isRefreshing}
          stylesSet={MenuButtonStyles}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  filterContainer: {
    position: 'absolute',
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});