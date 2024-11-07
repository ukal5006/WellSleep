import { login } from '@react-native-kakao/user';
import { Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native'; // styled-components/native로 변경
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { LOGIN } from '../constants/apis';
import { KAKAOYELLOW } from '../constants/colors';

const KakaoBtn = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;

    padding: 10px 20px;
    border-radius: 18px;
    width: 371px;
    height: 63px;
    background-color: ${KAKAOYELLOW};
`;

const KakaoText = styled(Text)`
    font-size: 17px;
`;

const KakaoImage = styled(Image)`
    width: 28px;
    height: 28px;
    margin-right: 70px;
    margin-left: 20px;
`;

async function storeTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
}

function LoginBtn() {
    const { dataFetch, loading, error, data } = useAxios();
    const handleLogin = async () => {
        try {
            const result = await login();
            const kakaoToken: string = result.accessToken;
            console.log('카카오 로그인 성공');
            await dataFetch('POST', LOGIN, { kakaoToken: kakaoToken });
        } catch (error) {
            console.error('로그인 실패:', error);
            Alert.alert('로그인 실패', '로그인에 실패했습니다. 다시 시도하세요.');
        }
    };

    useEffect(() => {
        if (data !== null) {
            storeTokens(data.accessToken, data.refreshToken);
            console.log(data);
            console.log('WellSleep 로그인 성공');
        }
    }, [data]);

    return (
        <KakaoBtn onPress={handleLogin}>
            <KakaoImage source={require('../assets/kakao.png')} />
            <KakaoText>카카오로 시작하기</KakaoText>
        </KakaoBtn>
    );
}

export default LoginBtn;
