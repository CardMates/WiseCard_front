export type NotificationPayload = any;

export function openNotificationAccessSettings(): void;

export function startNotificationListener(
  onEvent: (payload: NotificationPayload) => void
): void;

export function stopNotificationListener(): void;


