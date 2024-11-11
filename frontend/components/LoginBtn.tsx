import { login } from '@react-native-kakao/user';
import { Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { LOGIN, USER } from '../constants/apis';
import { KAKAOYELLOW } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store/userSlice';

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
    const dispatch = useDispatch(); // Redux dispatch 사용
    const { dataFetch, data, userDataFetch } = useAxios();

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
        const fetchUserData = async () => {
            if (data !== null) {
                console.log('헤더 토큰 설정');
                console.log(data);
                await storeTokens(data.accessToken, data.refreshToken);

                // 사용자 정보 가져오기
                const userInfo = await userDataFetch('GET', USER); // USER URL로 요청
                console.log(userInfo); // 사용자 데이터 확인
                if (userInfo) {
                    dispatch(setUserInfo(userInfo)); // 사용자 정보를 Redux에 저장
                }

                console.log('WellSleep 로그인 성공');
            }
        };

        fetchUserData();
    }, [data, dispatch]);

    return (
        <KakaoBtn onPress={handleLogin}>
            <KakaoImage source={require('../assets/kakao.png')} />
            <KakaoText>카카오로 시작하기</KakaoText>
        </KakaoBtn>
    );
}

export default LoginBtn;
