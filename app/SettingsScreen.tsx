import { openNotificationAccessSettings, startNotificationListener, stopNotificationListener } from '@/src/native/notificationBridge';
import { removeToken } from '@/src/utils/authStorage';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, NativeModules, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { NotificationBridge } = NativeModules;

export default function SettingsScreen() {

  type AppItem = { name: string; package: string };

  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedPackages, setSelectedPackages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const seenNotifs = new Set<string>(); // 이미 처리한 알림 ID 저장
    (async () => {
      try {
        const installedApps = await NotificationBridge.getInstalledApps();

        // 금융/결제 앱 필터링
        const whitelist = [
          /** 은행 */
          "com.kbstar.kbbank",
          "com.shinhan.sbanking",
          "com.wooribank.smart.npib",
          "com.hanabank.ebk.channel.android.hananbank",
          "nh.smartbank",
          "com.ibk.neobanking",
          "com.scfirstbank.pib.smart",
          "com.kakaobank.channel",
          "viva.republica.tossbank",
          /** 카드 */
          "com.shinhancard.smartshinhan",
          "kr.co.samsungcard.mpocket",
          "com.kbcard.cxh.appcard",
          "com.hyundaicard.appcard",
          "com.wooricard.smartapp",
          "com.lotte.lottecard.o2",
          "com.hanacard.paycla",
          "com.bccard.smartapp",
          "nh.card.smart",
          /** 페이 */
          "com.kakaopay.app",
          "com.samsung.android.spay",
          "viva.republica.toss",
          "com.nhnent.payapp",
          "com.koces.android.zeroPay"
        ]

        const financeApps = installedApps.filter(
          (app: { package: string }) => whitelist.includes(app.package)
        );

        // console.log(financeApps);
        setApps(financeApps);

        // 현재 상태바에 있는 알림 중 금융/결제 앱 필터링
        const activeNotifs = await NotificationBridge.getActiveNotifications();
        activeNotifs.forEach((notif: any) => {
          if (whitelist.includes(notif.package)) {
            console.log("📌 상태바 금융/결제 알림:", notif);
          }
        });
      } catch (e) {
        console.error("Failed to fetch apps", e)
      }
    })();

    const subscription = startNotificationListener((payload) => {
      if (payload?.package && apps.find((a) => a.package === payload.package)) {
        console.log("📩 금융/결제 앱 알림 수신:", payload);
        // TODO: 결제 내역 파싱 -> 백엔드 전송
      } else {
        console.log("🚫 무시된 알림:", payload.package);
      }
    })

    return () => {
      stopNotificationListener();
      // subscription && subscription.remove?.();
    };
  }, []);

  const toggleSelect = (pkg: string) => {
    const newSet = new Set(selectedPackages);
    if (newSet.has(pkg)) newSet.delete(pkg);
    else newSet.add(pkg);
    setSelectedPackages(newSet);

    NotificationBridge.setSelectedApps(Array.from(newSet));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Configure your preferences</Text>
      <Button title="알림 접근 권한 열기" onPress={openNotificationAccessSettings} />
      {/** 
      <Text>알림을 가져올 앱 선택</Text>
      <View style={{ flex: 1 }}>
        <FlatList
          data={apps}
          keyExtractor={(item) => item.package}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => toggleSelect(item.package)}
            >
              <Text>{item.name}</Text>
              <Text>{item.package}</Text>
            </TouchableOpacity>
          )}
        />
        {apps.map((app, index) => (
          <View key={index}>
            <Text>{app.name}</Text>
          </View>
        ))}
      </View>
      */}
      <Text style={styles.subtitle} onPress={() => { removeToken(); router.replace('/OnboardingScreen') }}>log out</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
