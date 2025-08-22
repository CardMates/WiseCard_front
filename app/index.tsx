import { BannerButtonStyles } from "@/src/styles/buttons/BannerBtn";
import { MenuButtonStyles } from "@/src/styles/buttons/MenuBtn";
import Colors from "@/src/styles/colors";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import KakaoMapView from "./components/KakaoMapView";

export default function Index() {
  const username = '배윤아';

  const MenuButton = ({
    icon,
    onPress,
    disabled,
    stylesSet
  }: {
    icon: any;
    onPress: () => void;
    disabled?: boolean;
    stylesSet: any;
  }) => {
    return (
      <Pressable
        style={[
          stylesSet.materialButton,
          //disabled && stylesSet.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        {icon && (
          <Image
            source={icon}
            style={[stylesSet.buttonIcon, /*disabled && stylesSet.disabledIcon*/]}
          />
        )}
      </Pressable>
    );
  }

  const BannerButton = ({
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
    stylesSet: any;
  }) => {
    return (
      <Pressable
        style={[
          stylesSet.materialButton,
          // disabled && stylesSet.disabled,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={stylesSet.buttonContentWrapper}>
          <Text style={[stylesSet.buttonContents, disabled && stylesSet.disabledContents]}>
            {title}
          </Text>
        </View>
        {icon && (
          <Image
            source={icon}
            style={[stylesSet.buttonIcon, disabled && stylesSet.disabledIcon]}
          />
        )}
      </Pressable>
    );
  }

  const handleSmt = async () => {
    // TODO: Implement Kakao login
    console.log('credit card pressed');

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userHeader}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>안녕하세요,</Text>
            <Text style={styles.usernameText}>{username}님!</Text>
          </View>
          <View style={styles.menuContainer}>
            <MenuButton
              icon={require('../assets/images/icons/credit-card.png')}
              onPress={() => { router.push('/MyCardsScreen'); }}
              disabled={false}
              stylesSet={MenuButtonStyles}
            />
            <MenuButton
              icon={require('../assets/images/icons/setting.png')}
              onPress={() => { router.push('/SettingsScreen'); }}
              disabled={false}
              stylesSet={MenuButtonStyles}
            />
          </View>
        </View>
        <View style={styles.bannerContainer}>
          <BannerButton
            title={'온라인\n쇼핑몰'}
            icon={require('../assets/images/online-shopping.png')}
            onPress={() => { router.push('/OnlineShopScreen'); }}
            disabled={false}
            stylesSet={BannerButtonStyles}
          />
          <BannerButton
            title={'기간 한정\n프로모션'}
            icon={require('../assets/images/promotion.png')}
            onPress={() => { router.push('/PromotionScreen'); }}
            disabled={false}
            stylesSet={BannerButtonStyles}
          />
        </View>
      </View>
      <KakaoMapView />
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    //flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 30,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between', // 왼쪽: 텍스트, 오른쪽: 버튼 묶음
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greetingContainer: {
    flexDirection: 'column',     // 인사말은 세로 배치
  },
  greetingText: {
    fontSize: 16,
    color: Colors.TEXT_SECONDARY,               // "안녕하세요," 같은 보조 문구
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY_BLUE,
  },
  menuContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bannerContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 16,
    //flex: 1,
  }
})

/** return (
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
  button: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

 */