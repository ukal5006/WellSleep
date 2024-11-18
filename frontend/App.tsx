import { initializeKakaoSDK } from '@react-native-kakao/core';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './components/NavBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainSleep from './screens/Main/MainSleep';
import Sleeping from './screens/Main/Sleeping';
import Luck from './screens/Mypage/Luck';
import SleepLab from './screens/Mypage/SleepLab';
import Info from './screens/Mypage/Info';
import MonthlyChart from './screens/Chart/MonthlyChart';
import DailyChart from './screens/Chart/DailyChart';
import { StackParamList } from './types/navigation';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import { useFonts } from 'expo-font';
import { FONTS, FONT_IMPORTS } from './constants/fonts';
import useAxios from './hooks/useAxios';
import { USER } from './constants/apis';
import { setUserInfo } from './store/userSlice';
import Login from './screens/Login';
import PushNotification from 'react-native-push-notification';

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
    const [fontsLoaded] = useFonts(FONT_IMPORTS);
    useEffect(() => {
        initializeKakaoSDK('c9f9a5b0717e5e19f774465dcb85522b');

        if (Platform.OS === 'android') {
            // // 기존의 모든 채널 삭제 (앱 초기화 시)
            // PushNotification.deleteChannel("alarm-channel-new-one");
            // 새로운 알림 채널 생성
            // PushNotification.createChannel(
            //     {
            //         channelId: 'alarm-channel-new-onee',
            //         channelName: 'Alarm Channel New Onee',
            //         importance: PushNotification.Importance.HIGH,
            //         soundName: 'alarm.mp3',
            //         vibrate: true,
            //     },
            //     (created) => {
            //         console.log(created ? '알림 채널 생성 성공: Alarm Channel New One' : '알림 채널 생성 실패');
            //     }
            // );
        }
    }, []);
    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar backgroundColor="#001234" barStyle="light-content" animated={true} />
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Nav" component={NavBar} />
                    <Stack.Screen name="MainSleep" component={MainSleep} />
                    <Stack.Screen name="Sleeping" component={Sleeping} />
                    <Stack.Screen name="Luck" component={Luck} />
                    <Stack.Screen name="SleepLab" component={SleepLab} />
                    <Stack.Screen name="Info" component={Info} />
                    <Stack.Screen name="MonthlyChart" component={MonthlyChart} />
                    <Stack.Screen name="DailyChart" component={DailyChart} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
