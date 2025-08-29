import { BackButtonStyles } from '@/src/styles/buttons/BackBtn';
import Colors from '@/src/styles/colors';
import { router } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuButton } from './components/Button';
import StoreBlock from './components/StoreBlock';

export default function PromotionScreen() {
  const promotionList = [
    { name: '이벤트1', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트2', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트3', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트4', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트5', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트6', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트7', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트8', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트9', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트10', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트11', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트12', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트13', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트14', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
    { name: '이벤트15', info: 'XX카드 사용 시 30% 할인', url: 'https://www.samsungcard.com/personal/event/ing/UHPPBE1403M0.jsp?cms_id=3714798' },
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
          <Text style={styles.title}>기간 한정 프로모션</Text>
          <Text style={styles.subtitle}>내 카드로 누릴 수 있는 기간 한정 프로모션은?</Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventContainer}
      >
        {promotionList.map((event, i) => (
          <StoreBlock
            key={i}
            store={event}
            onPress={() => {
              const url = event.url;
              if (url) {
                Linking.openURL(url).catch(err =>
                  console.error("외부 브라우저 열기 실패:", err)
                );
              }
            }}
          // 추후 이벤트 블록 레이아웃 변경 시 별도 컴포넌트 생성
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 30,
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
  eventContainer: {
    gap: 5,
    paddingBottom: 60,
  }
});
