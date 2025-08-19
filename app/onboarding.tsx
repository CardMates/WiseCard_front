import { gsiButtonStyles } from '@/src/styles/buttons/GoogleLoginBtn';
import { ksiButtonStyles } from '@/src/styles/buttons/KakaoLoginBtn';
import React from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Colors from '../src/styles/colors';

export default function OnboardingScreen() {
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);

  const SocialLoginButton = ({
    title,
    icon,
    onPress,
    disabled,
    stylesSet
  }: {
    title: string;
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any; // gsiButtonStyles | ksiButtonStyles
  }) => {
    return (
      <Pressable
        style={[
          styles.button,
          stylesSet.materialButton,
          disabled && stylesSet.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {icon && (
          <Image
            source={icon}
            style={[stylesSet.buttonIcon, disabled && stylesSet.disabledIcon]}
          />
        )}
        <View style={stylesSet.buttonContentWrapper}>
          <Text style={[stylesSet.buttonContents, disabled && stylesSet.disabledContents]}>
            {title}
          </Text>
        </View>
      </Pressable>
    );
  }

  const handleKakaoLogin = async () => {
    setIsLoginLoading(true);
    try {
      // TODO: Implement Kakao login
      console.log('Kakao login pressed');
      // await yourGoogleLogin();
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoginLoading(true);
    try {
      // TODO: Implement Google login
      console.log('Google login pressed');
      // await yourGoogleLogin();
      await new Promise(resolve => setTimeout(resolve, 3000));
    } finally {
      setIsLoginLoading(false);
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
    fontWeight: 'bold',
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
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

