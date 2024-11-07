import { initializeKakaoSDK } from '@react-native-kakao/core';
import { useEffect } from 'react';
import { ImageBackground, StatusBar, Text } from 'react-native';
import styled from 'styled-components/native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavBar from './components/NavBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/Main';
import Login from './screens/Login';

const BackgroundImage = styled(ImageBackground)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Stack = createNativeStackNavigator();

export default function App() {
    const loginInfo = null;

    useEffect(() => {
        initializeKakaoSDK('c9f9a5b0717e5e19f774465dcb85522b');
        if (loginInfo === null) {
            // 로그인 정보가 없을 때의 처리
        }
    }, []); // 의존성 배열 추가

    return (
        <>
            <StatusBar backgroundColor="#001234" barStyle="light-content" animated={true} />
            <NavBar />
        </>
    );
}
