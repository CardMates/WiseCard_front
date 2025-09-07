import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const { NotificationBridge } = NativeModules;
const emitter = new NativeEventEmitter(NotificationBridge);

// 권한 설정 화면 열기 (사용자에게 토글하게 하기)
export const openNotificationAccessSettings = () => {
  if (Platform.OS === 'android') {
    NotificationBridge.openNotificationAccessSettings();
  }
};

// 리스너 등록/해제 헬퍼
let subscription = null;

export const startNotificationListener = (onEvent) => {
  stopNotificationListener();
  subscription = emitter.addListener('OnNotificationReceived', onEvent);
};

export const stopNotificationListener = () => {
  if (subscription) {
    subscription.remove();
    subscription = null;
  }
};
