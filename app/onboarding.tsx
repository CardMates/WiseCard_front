import { gsiButtonStyles } from '@/src/styles/buttons/GoogleLoginBtn';
import React from 'react';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../src/styles/colors';

export default function OnboardingScreen() {

  const GsiMaterialButton = ({ title, icon, onPress }: any) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.button, gsiButtonStyles.gsiMaterialButton,
          pressed && gsiButtonStyles.activeState,
        ]}
        onPress={onPress}
      >
        {icon && <Image source={icon} style={gsiButtonStyles.buttonIcon} />}
        <View style={gsiButtonStyles.buttonContentWrapper}>
          <Text style={gsiButtonStyles.buttonContents}>{title}</Text>
        </View>
      </Pressable>
    );
  }

  const handleKakaoLogin = () => {
    // TODO: Implement Kakao login
    console.log('Kakao login pressed');
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log('Google login pressed');
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
          <TouchableOpacity
            style={[styles.button, styles.kakaoButton]}
            onPress={handleKakaoLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.kakaoButtonText}>Login with Kakao</Text>
          </TouchableOpacity>
          <GsiMaterialButton
            title="Google 계정으로 로그인"
            icon={require('../assets/images/g-logo.png')}
            onPress={handleGoogleLogin}
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
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  kakaoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3c1e1e',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
});

