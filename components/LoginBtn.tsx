import { login } from '@react-native-kakao/user';
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'; // styled-components/native로 변경
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { LOGIN } from '../constants/apis';
import { KAKAOYELLOW } from '../constants/colors';

const KakaoBtn = styled(TouchableOpacity)`
    font-size: 24px;
    padding: 10px 20px;
    border-radius: 15px;
    width: 90%;
    background-color: ${KAKAOYELLOW};
    display: flex;
    justify-content: center;
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
            <Text>카카오로 시작하기</Text>
        </KakaoBtn>
    );
}

export default LoginBtn;
