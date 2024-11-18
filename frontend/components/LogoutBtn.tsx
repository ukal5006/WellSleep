import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'; // styled-components/native로 변경
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { LOGOUT } from '../constants/apis';
import { clearUserInfo } from '../store/userSlice';

const Btn = styled(TouchableOpacity)`
    font-size: 24px;
    padding: 10px 20px;
    border-radius: 15px;
    width: 200px;
    background-color: blueviolet;
    display: flex;
    justify-content: center;
`;

async function storeTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
}

function LogoutBtn() {
    const { dataFetch, loading, error, data } = useAxios();
    const handleLogout = async () => {
        try {
            await dataFetch('POST', LOGOUT).then(console.log);
        } catch (error) {
            console.error('로그아웃 실패:', error);
            Alert.alert('로그아웃 실패', '로그인에 실패했습니다. 다시 시도하세요.');
        }
    };

    useEffect(() => {
        if (data !== null) {
            console.log(data);
            storeTokens('', '');
            clearUserInfo();
        }
    }, [data]);

    return (
        <Btn onPress={handleLogout}>
            <Text>로그아웃</Text>
        </Btn>
    );
}

export default LogoutBtn;
