import React, { useEffect } from 'react';
import { View, ImageBackground, Text, StyleSheet } from 'react-native';
import LoginBtn from '../../components/LoginBtn';
import LogoutBtn from '../../components/LogoutBtn';
import mainBackground from '../../assets/loginback.png';
import { useFonts } from 'expo-font';
import { FONTS, FONT_IMPORTS } from '../../constants/fonts';
import { useSelector } from 'react-redux'; // Redux에서 사용자 정보 선택
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 임포트
import { RootState } from '../../store/store';

function Login() {
    const [fontsLoaded] = useFonts(FONT_IMPORTS);
    const navigation = useNavigation();
    const userInfo = useSelector((state: RootState) => state.user.userInfo); // 사용자 정보 가져오기

    useEffect(() => {
        if (userInfo) {
            // 사용자 정보가 있을 경우 이동
            navigation.navigate('Nav'); // 이동할 화면 이름
        }
    }, [userInfo, navigation]); // userInfo가 변경될 때마다 실행

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
