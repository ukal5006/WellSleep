import { initializeKakaoSDK } from '@react-native-kakao/core';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NavBar from './components/NavBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Luck from './screens/Mypage/Luck';
import SleepLab from './screens/Mypage/SleepLab';
import Info from './screens/Mypage/Info';
import { StackParamList } from './types/navigation'; // 타입 import
import Tip from './screens/Main/Tip';
import { Provider } from 'react-redux';
import store from './store/store';

const Stack = createNativeStackNavigator<StackParamList>(); // 타입을 명시합니다.

export default function App() {
    const loginInfo = null;

    useEffect(() => {
        initializeKakaoSDK('c9f9a5b0717e5e19f774465dcb85522b');
        if (loginInfo === null) {
            // 로그인 정보가 없을 때의 처리
        }
    }, []); // 의존성 배열 추가

    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar backgroundColor="#001234" barStyle="light-content" animated={true} />
                <Stack.Navigator
                    initialRouteName="Main"
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Main" component={NavBar} />
                    {/* <Stack.Screen name="History" component={Exampage} options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen name="Alarm" component={Exampage} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="Luck" component={Luck} />
                    <Stack.Screen name="SleepLab" component={Tip} />
                    <Stack.Screen name="Info" component={Info} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}