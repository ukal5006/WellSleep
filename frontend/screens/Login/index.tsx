import React, { useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import LoginBtn from '../../components/LoginBtn';
import LogoutBtn from '../../components/LogoutBtn';
import mainBackground from '../../assets/loginback.png';
import { useFonts } from 'expo-font';
import { FONTS, FONT_IMPORTS } from '../../constants/fonts';
import { useDispatch, useSelector } from 'react-redux'; // Redux에서 사용자 정보 선택
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 임포트
import { RootState } from '../../store/store';
import useAxios from '../../hooks/useAxios';
import { setUserInfo } from '../../store/userSlice';
import { USER } from '../../constants/apis';

function Login() {
    const [fontsLoaded] = useFonts(FONT_IMPORTS);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { userDataFetch } = useAxios();

    useEffect(() => {
        const fetchUserData = async () => {
            // 사용자 정보 가져오기
            const userInfo = await userDataFetch('GET', USER); // USER URL로 요청
            console.log(userInfo); // 사용자 데이터 확인
            if (userInfo) {
                dispatch(setUserInfo(userInfo)); // 사용자 정보를 Redux에 저장
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Nav' }], // 로그인 후 NavBar로 이동
                });
            }
        };
        fetchUserData();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground source={mainBackground} style={styles.background} resizeMode="cover">
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>Welcome to Nightly</Text>
                <Text style={styles.subtitleText}>Good for your sleep cycle</Text>
                <Text style={styles.descriptionText}>수면 검사를 통해 질 높은 수면 여정을 시작하세요.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <LoginBtn />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: 190,
        marginBottom: 38,
    },
    titleText: {
        fontSize: 30,
        color: '#ffffff',
        fontFamily: FONTS.QuicksandBold,
    },
    subtitleText: {
        fontSize: 20,
        color: '#ffffff',
        marginTop: 37,
        fontFamily: FONTS.QuicksandRegular,
    },
    descriptionText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        marginTop: 124,
        paddingHorizontal: 80,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
