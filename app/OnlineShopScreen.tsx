import { BackButtonStyles } from '@/src/styles/buttons/BackBtn';
import Colors from '@/src/styles/colors';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuButton } from './components/Button';
import StoreBlock from './components/StoreBlock';

export default function OnlineShopScreen() {
  const onlineShopList = [
    { name: '올리브영1', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영2', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영3', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영4', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영5', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영6', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영7', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영8', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영9', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영10', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영11', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영12', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영13', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영14', info: 'XX카드 사용 시 30% 할인' },
    { name: '올리브영15', info: 'XX카드 사용 시 30% 할인' },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MenuButton
          icon={require('../assets/images/icons/angle-left-b.png')}
          onPress={() => router.back()}
          disabled={false}
          stylesSet={BackButtonStyles}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>온라인 쇼핑몰</Text>
          <Text style={styles.subtitle}>내 카드로 혜택을 누릴 수 있는 온라인 쇼핑몰은?</Text>
        </View>
      </View>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.shopContainer}
        >
          {onlineShopList.map((shop, i) => (
            <StoreBlock
              key={i}
              store={shop}
              onPress={() => router.push({
                pathname: '/StoreDetailScreen',
                params: { name: shop.name, info: shop.info }
                // 추후 파라미터 수정
              })}
            //stylesSet={undefined}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  header: {
    paddingVertical: 20,
    gap: 15,
  },
  titleContainer: {
    // paddingVertical: 10,
  },
  title: {
    color: Colors.PRIMARY_BLUE,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  shopContainer: {
    gap: 5,
  }
});