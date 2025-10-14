import { categories } from "@/src/constants/categories";
import { Store } from "@/src/constants/storeExamples";
import useLocaiton from "@/src/hooks/useLocation";
import { filterOfflineStores, StoreFilters } from "@/src/hooks/useOfflineStore";
import { CategoryButtonStyles } from "@/src/styles/buttons/CategoryBtn";
import { MenuButtonStyles } from "@/src/styles/buttons/MenuBtn";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView as RNScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { WebView } from "react-native-webview";
import { CategoryButton, MenuButton } from "./Button";
import Loading from "./Loading";
import SearchBar from "./SearchBar";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const FILTER_CONTAINER_HEIGHT = 140; // filterContainer의 높이
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + FILTER_CONTAINER_HEIGHT + 100;

const AnimatedScrollView = Animated.createAnimatedComponent(RNScrollView);

interface DraggableBottomSheetProps {
  stores: Store[];
  isVisible: boolean;
  onClose: () => void;
}

const DraggableBottomSheet: React.FC<DraggableBottomSheetProps> = ({
  stores,
  isVisible,
  onClose,
}) => {
  const translateY = useSharedValue(-60);
  const context = useSharedValue({ y: 0 });

  const scrollRef = useAnimatedRef();

  useEffect(() => {
    translateY.value = withSpring(isVisible ? -300 : -60, {
      damping: 50,
      stiffness: 400,
    });
  }, [isVisible]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      const newTranslateY = context.value.y + event.translationY;
      translateY.value = Math.max(
        MAX_TRANSLATE_Y,
        Math.min(-60, newTranslateY)
      );
    })
    .onEnd((event) => {
      // 아래로 빠르게 드래그 시 닫기
      if (translateY.value > -100 && event.velocityY > 300) {
        runOnJS(onClose)();
        return;
      }

      // 위치 복원 로직
      if (translateY.value > -200) {
        translateY.value = withSpring(-60, { damping: 50, stiffness: 400 });
      } else if (translateY.value > -400) {
        translateY.value = withSpring(-300, { damping: 50, stiffness: 400 });
      }
    });

  /*
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (_, ctx) => {
      ctx.y = translateY.value;
    },
    onActive: (event, ctx) => {
      const newTranslateY = ctx.y + event.translationY;
      // 위로는 MAX_TRANSLATE_Y까지, 아래로는 -60까지
      translateY.value = Math.max(
        MAX_TRANSLATE_Y,
        Math.min(-60, newTranslateY)
      );
    },
    onEnd: (event) => {
      // 손잡이 위치(-60)에서 더 내리려고 하면 onClose만 호출 (위치는 -60 유지)
      if (translateY.value > -100 && event.velocityY > 300) {
        runOnJS(onClose)();
        return;
      }
      // 중간보다 아래면 손잡이만 보이는 위치로
      if (translateY.value > -200) {
        translateY.value = withSpring(-60, {
          damping: 50,
          stiffness: 400,
        });
      }
      // 중간보다 위면 기본 높이로
      else if (translateY.value > -400) {
        translateY.value = withSpring(-300, {
          damping: 50,
          stiffness: 400,
        });
      }
    },
  });
  */

  const rBottomSheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!isVisible) return null;

  return (
    /*
    <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
      </GestureDetector>*/

    // {/* 스크롤 가능한 콘텐츠 */}
    <AnimatedScrollView
      ref={scrollRef}
      style={styles.scrollView}
      showsVerticalScrollIndicator={true}
    >
      {stores.map((store) => (
        <View key={store.id} style={styles.storeItem}>
          <Text style={styles.storeName}>{store.name}</Text>
          <View>
            <Text>{store.lat}</Text>
            <Text>{store.lng}</Text>
          </View>
        </View>
      ))}
    </AnimatedScrollView>
    //</Animated.View>
  );
};

export default function KakaoMapView() {
  const kakaoMapWeb = process.env.EXPO_PUBLIC_KAKAO_MAP_WEB;
  const location = useLocaiton();
  const webViewRef = useRef<WebView>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stores, setStores] = useState<Store[]>([]);

  const [pageReady, setPageReady] = useState(false);

  const initialUrlRef = useRef(
    `${kakaoMapWeb}?lat=${location?.lat}&lng=${location?.lng}&v=${Date.now()}`
  );

  // 검색어 입력 핸들러
  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  // 카테고리 선택 핸들러
  const handleCategorySelect = (category: string) => {
    // 토글 선택: 같은 카테고리 클릭 시 선택 해제
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setStores([]); // 선택 해제 시 stores 초기화
    } else {
      setSelectedCategory(category);
    }
  };

  // 백엔드 요청 함수
  const fetchResults = async () => {
    if (!location || !selectedCategory) return;
    const storeFilter: StoreFilters = {
      lat: location.lat,
      lng: location.lng,
      cat: selectedCategory,
    };

    console.log("검색 실행:", storeFilter);

    try {
      const data = await filterOfflineStores(storeFilter);

      console.log(data);

      // stores example
      const newStores = [
        { id: 1, name: "카페 A", lat: 37.4979, lng: 127.0276 },
        { id: 2, name: "카페 B", lat: 37.4989, lng: 127.0286 },
        { id: 3, name: "카페 C", lat: 37.4969, lng: 127.0266 },
        { id: 4, name: "카페 D", lat: 37.4959, lng: 127.0276 },
        { id: 5, name: "카페 E", lat: 37.4949, lng: 127.0286 },
        { id: 6, name: "카페 F", lat: 37.4999, lng: 127.0266 },
        { id: 7, name: "카페 G", lat: 37.4959, lng: 127.0276 },
        { id: 8, name: "카페 H", lat: 37.4949, lng: 127.0286 },
        { id: 9, name: "카페 I", lat: 37.4999, lng: 127.0266 },
      ];
      setStores(newStores);
    } catch (error) {
      console.error("검색 요청 실패:", error);
    }
  };

  // 현재 위치 가져오기 로직 (stores 초기화 추가)
  const handleRefreshLocation = async () => {
    if (isRefreshing || !pageReady) return;
    setIsRefreshing(true);

    // stores 초기화 - 현재 위치만 보여주는 상태로 복구
    setStores([]);
    setSearchQuery(""); // 검색어도 초기화
    setSelectedCategory(null); // 카테고리 선택도 해제

    try {
      // 1) 즉시: 마지막으로 알고 있는 위치가 있으면 먼저 반영해 체감 속도 향상
      const lastKnown = await Location.getLastKnownPositionAsync();
      if (lastKnown) {
        const { latitude, longitude } = lastKnown.coords;
        webViewRef.current?.injectJavaScript(
          `moveToCurrentLocation(${latitude}, ${longitude}); true;`
        );
      }

      // 2) 병렬로 최신 위치 요청 (균형 정확도 + 짧은 타임아웃)
      const getFreshPosition = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });

      const withTimeout = new Promise<Location.LocationObject>(
        (resolve, reject) => {
          const timer = setTimeout(
            () => reject(new Error("Location timeout")),
            6000
          );
          getFreshPosition
            .then((r) => {
              clearTimeout(timer);
              resolve(r);
            })
            .catch((e) => {
              clearTimeout(timer);
              reject(e);
            });
        }
      );

      const fresh = await withTimeout;
      const { latitude, longitude } = fresh.coords;
      webViewRef.current?.injectJavaScript(
        `moveToCurrentLocation(${latitude}, ${longitude}); true;`
      );
    } catch (error) {
      console.warn(
        "Failed to refresh precise location, kept last known if any.",
        error
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const onMessage = (event: any) => {
    const data = String(event.nativeEvent.data);
    if (data === "READY") setPageReady(true);

    console.log("WebView에서 받은 메시지:", data);
  };

  useEffect(() => {
    if (pageReady) {
      if (stores.length > 0) {
        webViewRef.current?.injectJavaScript(
          `window.setPins(${JSON.stringify(stores)}); true;`
        );
      } else {
        // stores가 비어있으면 pins 제거
        webViewRef.current?.injectJavaScript(`window.setPins([]); true;`);
      }
    }
  }, [stores, pageReady]);

  useEffect(() => {
    if (selectedCategory) {
      fetchResults();
    }
  }, [selectedCategory]);

  // Early return after all hooks are called
  if (!location) return <Loading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrlRef.current }}
          style={styles.webview}
          javaScriptEnabled={true}
          originWhitelist={["*"]}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          onMessage={onMessage}
          onLoadStart={() =>
            console.log("WebView: 로딩 시작", initialUrlRef.current)
          }
          onLoadEnd={() => console.log("WebView: 로딩 끝")}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView 에러:", nativeEvent);
          }}
        />

        {/* 오버레이 */}
        <View style={styles.filterContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={fetchResults} // 엔터/완료 누르면 실행
          />
          <RNScrollView
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
          </RNScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <MenuButton
            icon={require("../../assets/images/icons/crosshairs.png")}
            onPress={handleRefreshLocation}
            disabled={isRefreshing}
            stylesSet={MenuButtonStyles}
          />
        </View>
        {/* Bottom Sheet Modal */}
        <DraggableBottomSheet
          stores={stores}
          isVisible={selectedCategory !== null}
          onClose={() => console.log("modal closed")}
        />
      </View>
    </GestureHandlerRootView>
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
    position: "absolute",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
  categoryContainer: {
    flexDirection: "row",
    padding: 3,
    gap: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bottomSheet: {
    position: "absolute",
    top: SCREEN_HEIGHT - 100,
    left: 0,
    right: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 8,
  },
  handleContainer: {
    backgroundColor: "yellow",
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D1D5DB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  storeItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
});
