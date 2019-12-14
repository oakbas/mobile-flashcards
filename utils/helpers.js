import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export const createNotification = () => ({
  title: 'Practice Notification',
  body: 'It is time to pratice. Do not forget to practice!',
  ios: {
    sound: false
  },
  android: {
    sound: false,
    vibrate: false,
    priority: 'high',
    sticky: false
  }
});

export const clearLocalNotification = () => {
    AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync()
    );
};
export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
            if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync();
                let tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(2);
                tomorrow.setMinutes(15);
  
                Notifications.scheduleLocalNotificationAsync(createNotification(), {
                time: tomorrow,
                repeat: "day"
                });
  
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
            });
        }
    });
};