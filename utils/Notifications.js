import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native'
import { NOTIFICATION_KEY } from './utils/api'
import { Notifications, Permission } from 'expo'


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {
    return {
        title: `Don't forget to study!`,
        body: 'Study FlashCards to imporove your score!',
        ios: {
            sound: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permission.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(), {
                                    time : tomorrow,
                                    repeat: 'day'
                                }
                            )
                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}