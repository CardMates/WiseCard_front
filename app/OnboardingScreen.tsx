import { useAuth } from "@/src/contexts/AuthContext";
import { kakaoLogin, kakaoSignup } from "@/src/hooks/useAuth";
import { ksiButtonStyles } from "@/src/styles/buttons/KakaoLoginBtn";
import { router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../src/styles/colors";
import { SocialLoginButton } from "./components/Button";

export default function OnboardingScreen() {
  const { login } = useAuth();

  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const isMountedRef = React.useRef(true);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleKakaoLogin = async () => {
    setIsLoginLoading(true);
    try {
      const result = await kakaoLogin();
      if (result.success && result.tokens) {
        await login(result.tokens.accessToken, result.tokens.refreshToken);
        router.replace("/");
      } else {
        Alert.alert("로그인 실패", result.error);
      }
    } catch (error) {
      // kakaoLogin 함수에서 예외가 발생한 경우
      console.error("❌ Unexpected error:", error);
      Alert.alert(
        "로그인 실패",
        "예기치 않은 오류가 발생했습니다. 다시 시도해 주세요."
      );
    } finally {
      if (isMountedRef.current) setIsLoginLoading(false);
    }
  };

  const handleKakaoSignup = async () => {
    setIsLoginLoading(true);
    try {
      const result = await kakaoSignup();
      if (result.success && result.tokens) {
        await login(result.tokens.accessToken, result.tokens.refreshToken);
        // 카드 등록 화면으로 이동
        router.replace("/AddCardsScreen");
      } else {
        Alert.alert("회원가입 실패", result.error);
      }
    } catch (error) {
      // kakaoSignup 함수에서 예외가 발생한 경우
      console.error("❌ Unexpected error:", error);
      Alert.alert(
        "로그인 실패",
        "예기치 않은 오류가 발생했습니다. 다시 시도해 주세요."
      );
    } finally {
      if (isMountedRef.current) setIsLoginLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>
            카드 혜택,{"\n"}제대로 누리고 계신가요?
          </Text>
          <Text style={styles.subtitle}>
            WiseCard에서 매장과 카드를 추천받고{"\n"}할인, 캐시백, 포인트 혜택을
            남김 없이 누리세요.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <SocialLoginButton
            title="카카오 계정으로 로그인"
            icon={require("../assets/images/k-logo.png")}
            onPress={handleKakaoLogin}
            disabled={isLoginLoading}
            stylesSet={ksiButtonStyles}
          />
          <Text style={styles.signupText} onPress={handleKakaoSignup}>
            카카오 계정으로 회원가입
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_LIGHT,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  header: {
    alignItems: "center",
    marginBottom: 250,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.PRIMARY_BLUE,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  signupText: {
    alignSelf: "center",
  },
});
