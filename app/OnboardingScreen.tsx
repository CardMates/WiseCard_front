import { gsiButtonStyles } from '@/src/styles/buttons/GoogleLoginBtn';
import { ksiButtonStyles } from '@/src/styles/buttons/KakaoLoginBtn';
import { saveToken } from '@/src/utils/authStorage';
import { router } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../src/styles/colors';
import { SocialLoginButton } from './components/Button';

export default function OnboardingScreen() {
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const isMountedRef = React.useRef(true);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    }
  }, [])

  const handleKakaoLogin = async () => {
    setIsLoginLoading(true);
    try {
      // TODO: Implement Kakao login
      console.log('👤 Kakao login pressed');
      // await yourGoogleLogin();
      await new Promise(resolve => setTimeout(resolve, 2000));
      await saveToken('kakao');
      router.replace('/'); // app/index.tsx로 이동
    } catch (error) {
      console.error('❌ Kakao login error', error);
      Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      if (isMountedRef.current) setIsLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoginLoading(true);
    try {
      // TODO: Implement Google login
      console.log('👤 Google login pressed');
      // await yourGoogleLogin();
      await new Promise(resolve => setTimeout(resolve, 2000));
      await saveToken('google');
      router.replace('/'); // app/index.tsx로 이동
    } catch (error) {
      console.error('❌ Google login error', error);
      Alert.alert('로그인 실패', '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      if (isMountedRef.current) setIsLoginLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>카드 혜택,{'\n'}제대로 누리고 계신가요?</Text>
          <Text style={styles.subtitle}>
            WiseCard에서 매장과 카드를 추천받고{'\n'}할인, 캐시백, 포인트 혜택을 남김 없이 누리세요.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <SocialLoginButton
            title="카카오 계정으로 로그인"
            icon={require('../assets/images/k-logo.png')}
            onPress={handleKakaoLogin}
            disabled={isLoginLoading}
            stylesSet={ksiButtonStyles} />
          <SocialLoginButton
            title="Google 계정으로 로그인"
            icon={require('../assets/images/g-logo.png')}
            onPress={handleGoogleLogin}
            disabled={isLoginLoading}
            stylesSet={gsiButtonStyles}
          />
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
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
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
});

