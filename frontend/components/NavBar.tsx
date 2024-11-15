import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mypage from '../screens/Mypage';
import MonthlyChart from '../screens/Chart/MonthlyChart';
import MorningAlarm from '../screens/Alarm/MorningAlarm';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { USER } from '../constants/apis';
import useAxios from '../hooks/useAxios';
import { setUserInfo } from '../store/userSlice';

import MainSleep from '../screens/Main/MainSleep';
import { Image } from 'react-native';
const Tab = createBottomTabNavigator();

function NavBar() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userDataFetch } = useAxios();
    useEffect(() => {
        const fetchUserData = async () => {
            // 사용자 정보 가져오기
            const userInfo = await userDataFetch('GET', USER); // USER URL로 요청
            console.log(userInfo); // 사용자 데이터 확인
            if (userInfo) {
                dispatch(setUserInfo(userInfo)); // 사용자 정보를 Redux에 저장
            } else {
                navigation.navigate('Login');
            }
        };
        console.log('사용자 데이터 확인');
        fetchUserData();
    }, []);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#8B728F',
                    borderTopWidth: 0,
                    height: 70, // 탭 바의 높이 설정
                },
                tabBarLabelStyle: {
                    color: '#ffffff', // 글씨 색상
                    fontSize: 12, // 원하는 글씨 크기로 변경
                    fontWeight: 'bold', // 글씨 두께
                },
                tabBarItemStyle: {
                    paddingVertical: 10, // 각 탭의 수직 패딩
                },
                tabBarActiveTintColor: '#FFFFFF', // 선택된 탭의 색상
                tabBarInactiveTintColor: '#C6BAC8', // 비활성 탭의 색상
                headerShown: false, // 모든 스크린에서 헤더를 숨기려면 추가
            }}
        >
            <Tab.Screen
                name="홈"
                component={MainSleep}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/Navicon/mainicon.png')}
                            style={{ tintColor: color, width: size, height: size }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="수면일지"
                component={MonthlyChart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/Navicon/timeicon.png')}
                            style={{ tintColor: color, width: size, height: size }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="알람"
                component={MorningAlarm}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/Navicon/bellicon.png')}
                            style={{ tintColor: color, width: size, height: size }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="마이페이지"
                component={Mypage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/Navicon/usericon.png')}
                            style={{ tintColor: color, width: size, height: size }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default NavBar;
