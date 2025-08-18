import { Stack } from "expo-router";
import { AuthProvider } from "../src/contexts/AuthContext";
import AuthGuard from "./components/AuthGuard";

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Stack>
          <Stack.Screen
            name="onboarding"
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
        </Stack>
      </AuthGuard>
    </AuthProvider>
  );
}
