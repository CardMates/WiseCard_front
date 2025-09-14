import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler, NativeEventEmitter, NativeModules, Platform } from "react-native";
import { AuthProvider } from "../src/contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

export default function RootLayout() {
  useEffect(() => {
    const { NotificationBridge } = NativeModules;
    const emitter = new NativeEventEmitter(NotificationBridge);

    // 알림 이벤트 리스너 등록
    const subscription = emitter.addListener("OnNotificationReceived", (event) => {
      console.log("📌 새 알림 수신:", event);
    })

    let backHandler: any;

    // Android에서만 동작
    if (Platform.OS === 'android') {
      const backAction = () => {
        if (!router.canGoBack()) {
          Alert.alert(
            "앱 종료",
            "정말로 앱을 종료하시겠습니까?",
            [
              {
                text: "취소",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "종료",
                onPress: () => BackHandler.exitApp()
              }
            ]
          );
          return true; // 기본 뒤로가기 동작을 막음
        }
      };

      backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        subscription.remove();
        if (backHandler) backHandler.remove();
      };
    }
  }, []);
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack>
          <Stack.Screen
            name="OnboardingScreen"
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="MyCardsScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SettingsScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OnlineShopScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PromotionScreen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="StoreDetailScreen"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}
