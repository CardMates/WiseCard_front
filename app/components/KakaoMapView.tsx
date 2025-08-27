import useLocaiton from '@/src/hooks/useLocation';
import { CategoryButtonStyles } from '@/src/styles/buttons/CategoryBtn';
import { MenuButtonStyles } from '@/src/styles/buttons/MenuBtn';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { CategoryButton, MenuButton } from './Button';
import Loading from './Loading';
import SearchBar from './SearchBar';

export default function KakaoMapView() {
  const kakaoMapWeb = process.env.EXPO_PUBLIC_KAKAO_MAP_WEB
  const location = useLocaiton();
  const webViewRef = useRef<WebView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [pageReady, setPageReady] = useState(false);
  const initialUrl = `${kakaoMapWeb}?lat=${location?.lat}&lng=${location?.lng}&v=${Date.now()}`;

  // 카테고리 배열
  const categories = [
    { label: '카페', value: 'cafe', icon: require('../../assets/images/icons/coffee.png') },
    { label: '식당', value: 'restaurant', icon: require('../../assets/images/icons/pizza-slice.png') },
    { label: '극장', value: 'theater', icon: require('../../assets/images/icons/clapper-board.png') },
    { label: '마트', value: 'mart', icon: require('../../assets/images/icons/shopping-cart.png') },
    { label: '마트', value: 'mart2', icon: require('../../assets/images/icons/shopping-cart.png') },
  ];

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    // 토글 선택: 같은 카테고리 클릭 시 선택 해제
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
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
    if (isRefreshing || !pageReady) return;
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
    const data = String(event.nativeEvent.data);
    if (data === 'READY') setPageReady(true);

    console.log('WebView에서 받은 메시지:', data)
  };

  useEffect(() => {
    fetchResults();
  }, [selectedCategory]);

  // Early return after all hooks are called
  if (!location) return <Loading />;

  return (
    <View style={styles.container}>
      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: initialUrl }}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <CategoryButton
              icon={category.icon}
              key={category.value} // 예: cafe
              title={category.label} // 예: 카페
              onPress={() => handleCategorySelect(category.value)}
              selected={selectedCategory === category.value}
              stylesSet={CategoryButtonStyles}
            />
          ))}
        </ScrollView>
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
    width: '100%',
    gap: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 3,
    gap: 5,
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