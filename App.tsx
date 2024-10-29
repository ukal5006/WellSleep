import { getKeyHashAndroid, initializeKakaoSDK } from '@react-native-kakao/core';
import { getAccessToken, isLogined, login, logout, unlink } from '@react-native-kakao/user';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
    useEffect(() => {
        initializeKakaoSDK('c9f9a5b0717e5e19f774465dcb85522b');
    });
    return (
        <View style={styles.container}>
            <Text>Open up App.tsx to start working on your app!</Text>
            <Button
                title={'Login'}
                onPress={() => {
                    login().then(console.log);
                }}
            />
            <Button
                title={'로그인 되어있나?'}
                onPress={() => {
                    isLogined().then(console.log);
                }}
            />
            <Button
                title={'토큰'}
                onPress={() => {
                    getAccessToken().then(console.log);
                }}
            />
            <Button
                title={'Logout'}
                onPress={() => {
                    logout().then(console.log).catch(console.log);
                }}
            />
            <Button
                title={'Unlink'}
                onPress={() => {
                    unlink().then(console.log).catch(console.log);
                }}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
