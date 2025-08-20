import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

export default function RootLayout() {
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
