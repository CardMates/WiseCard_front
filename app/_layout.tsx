import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { Alert, BackHandler, Platform } from "react-native";
import { AuthProvider } from "../src/contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

export default function RootLayout() {
  useEffect(() => {
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

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
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
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}
