// hooks/useAxios.ts
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const useAxios = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);

    const dataFetch = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body: any = null) => {
        setLoading(true);
        setError(null);

        try {
            // SecureStore에서 토큰 가져오기
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');

            // 고정 헤더 설정
            const headers = {
                Authorization: accessToken,
                RefreshToken: refreshToken,
            };

            const config: AxiosRequestConfig = {
                method,
                url,
                headers,
                data: body,
            };
            const response = await axios(config);
            setData(response.data); // 요청 성공 시 데이터 저장
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const userDataFetch = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body: any = null) => {
        setLoading(true);
        setError(null);

        try {
            const accessToken = await SecureStore.getItemAsync('accessToken');
            const refreshToken = await SecureStore.getItemAsync('refreshToken');

            const headers = {
                Authorization: accessToken,
                RefreshToken: refreshToken,
            };

            const config: AxiosRequestConfig = {
                method,
                url,
                headers,
                data: body,
            };
            console.log(config);
            const response = await axios(config);
            return response.data; // 응답 데이터 반환
        } catch (err) {
            setError(err);
            return null; // 응답 데이터 반환
        } finally {
            setLoading(false);
        }
    };

    return { dataFetch, loading, error, data, userDataFetch };
};

export default useAxios;
