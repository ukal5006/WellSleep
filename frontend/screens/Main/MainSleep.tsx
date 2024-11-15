import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAxios from '../../hooks/useAxios';
import IntakeModal from './IntakeModal';
import { END_SLEEP, INTAKE_SAVE, LIVE_SLEEP, START_SLEEP } from '../../constants/apis';
import styled from 'styled-components';
import BLE from './BLE';

const Container = styled(View)`
    flex: 1;
    justify-content: space-around;
    align-items: center;
`;

const MainSleep: React.FC = () => {
    const { dataFetch, data, userDataFetch } = useAxios();
    const [sleepId, setSleepId] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [caffeine, setCaffeine] = useState(0);
    const [alcohol, setAlcohol] = useState(0);
    const [isSleep, setIsSleep] = useState(false);
    const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
    const [elapsedTime, setElapsedTime] = useState<string>('00:00:00');

    // 수면 측정 시작
    const startSleep = async () => {
        await dataFetch('POST', START_SLEEP);
        setSleepStartTime(new Date()); // 수면 시작 시간 저장
    };

    const endSleep = async () => {
        await userDataFetch('POST', END_SLEEP, { sleepId });
        setIsSleep(false);
        setSleepStartTime(null); // 수면 종료 시 초기화
    };

    useEffect(() => {
        if (data) {
            setSleepId(data);
            setIsModalVisible(true); // 모달 열기
        } else if (data) {
            Alert.alert('수면 측정 시작', '데이터를 받지 못했습니다.');
        }
    }, [data]);

    // 현재 시각 업데이트
    useEffect(() => {
        const updateCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };

        updateCurrentTime();
        const interval = setInterval(updateCurrentTime, 1000);

        return () => clearInterval(interval);
    }, []);

    // 수면 경과 시간 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if (sleepStartTime) {
                const now = new Date();
                const diff = Math.floor((now.getTime() - sleepStartTime.getTime()) / 1000);

                const hours = Math.floor(diff / 3600)
                    .toString()
                    .padStart(2, '0');
                const minutes = Math.floor((diff % 3600) / 60)
                    .toString()
                    .padStart(2, '0');
                const seconds = (diff % 60).toString().padStart(2, '0');

                setElapsedTime(`${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [sleepStartTime]);

    // 카페인 및 알코올 섭취 기록 저장 요청
    const saveIntakeRecord = async () => {
        if (sleepId === null) return;
        try {
            await dataFetch('POST', INTAKE_SAVE, {
                data: {
                    id: sleepId,
                    alcoholIntake: alcohol,
                    caffeineIntake: caffeine,
                },
            });
            Alert.alert('기록 저장', '카페인 및 알코올 섭취 기록이 저장되었습니다.');
            setIsModalVisible(false);
            setIsSleep(true);
        } catch (error) {
            console.error('기록 저장 오류:', error);
            Alert.alert('오류', '기록 저장에 실패했습니다.');
        }
    };

    const confirmAlarm = (caffeineIntake: number, alcoholIntake: number) => {
        setCaffeine(caffeineIntake);
        setAlcohol(alcoholIntake);
        saveIntakeRecord();
    };

    const handleStartSleep = () => {
        startSleep();
    };

    return (
        <ImageBackground source={require('../../assets/main.png')} style={styles.background}>
            {isSleep ? (
                <Container>
                    <BLE totalInformationId={sleepId} />
                    <Text style={styles.elapsedTimeText}>수면 시간 : {elapsedTime}</Text>
                    <TouchableOpacity style={styles.sleepButton} onPress={endSleep}>
                        <Image source={require('../../assets/moon.png')} style={styles.icon} />
                        <Text style={styles.buttonText}>수면 종료</Text>
                    </TouchableOpacity>
                </Container>
            ) : (
                <>
                    <Text style={styles.title}>수면을 시작합니다</Text>
                    <Text style={styles.subtitle}>현재 시각</Text>
                    <View style={styles.overlay}>
                        <Text style={styles.timeText}>
                            {currentTime.slice(0, 5)}
                            <Text style={styles.secondsText}>{currentTime.slice(5)}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.sleepButton} onPress={handleStartSleep}>
                        <Image source={require('../../assets/moon.png')} style={styles.icon} />
                        <Text style={styles.buttonText}>수면 시작</Text>
                    </TouchableOpacity>

                    <IntakeModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        onConfirm={confirmAlarm}
                    />
                </>
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        borderRadius: 10,
        marginTop: 150,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 90,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 40,
    },
    timeText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    secondsText: {
        fontSize: 14,
        color: '#fff',
    },
    elapsedTimeText: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    sleepButton: {
        backgroundColor: '#211C52',
        borderRadius: 18,
        marginTop: 160,
        alignItems: 'center',
        height: 69,
        width: 349,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
});

export default MainSleep;
