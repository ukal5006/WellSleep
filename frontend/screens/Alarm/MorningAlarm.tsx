import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Switch,
    Alert,
    PermissionsAndroid,
    Linking,
    Platform,
    ImageBackground,
    Image,
    Animated,
    StyleSheet,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import styled from 'styled-components/native';
import { FONTS } from '../../constants/fonts';
import CustomTimePicker from '../../components/CustomTimePicker';

function MorningAlarm() {
    const [alarmTime, setAlarmTime] = useState('07:25 AM');
    const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

    // 별 이미지 반짝이는 효과를 위한 애니메이션 설정
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // 애니메이션 설정
        const blinkAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.01,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );
        blinkAnimation.start();

        if (Platform.OS === 'android') {
            // Android 13 이상에서 알림 권한 요청
            if (Platform.Version >= 33) {
                // requestNotificationPermission();
            }

            // 정확한 알람 권한 요청 (Android 12 이상)
            if (Platform.Version >= 31) {
                // checkExactAlarmPermission();
            }
        }

        return () => {
            blinkAnimation.stop(); // 컴포넌트가 언마운트될 때 애니메이션 중지
        };
    }, []);

    // 알림 권한 요청 (Android 13 이상)
    const requestNotificationPermission = async () => {
        try {
            if (Platform.OS === 'android' && Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('알림 권한 필요', '알람을 사용하려면 알림 권한을 허용해주세요.', [
                        {
                            text: '설정 열기',
                            onPress: () => Linking.openSettings(),
                        },
                        {
                            text: '취소',
                            style: 'cancel',
                        },
                    ]);
                }
            }
        } catch (err) {
            console.warn('Notification permission request failed:', err);
        }
    };

    // 정확한 알람 권한 요청 (Android 12 이상)
    const checkExactAlarmPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 31) {
            try {
                Alert.alert('알람 권한이 필요해요 !', '알람을 설정하려면 설정에서 해당 권한을 허용해주세요.', [
                    {
                        text: '설정 열기',
                        onPress: () => Linking.openSettings(),
                    },
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                ]);
            } catch (err) {
                console.warn('정확한 알람 권한 요청 중 오류 발생:', err);
            }
        }
    };

    // 알람 설정 함수
    const setAlarm = () => {
        const now = new Date();
        let [hour, minutePeriod] = alarmTime.split(':');
        let [minute, period] = minutePeriod.split(' ');
        let hour24 = parseInt(hour);
        if (period === 'PM' && hour24 !== 12) {
            hour24 += 12;
        } else if (period === 'AM' && hour24 === 12) {
            hour24 = 0;
        }

        const scheduledTime = new Date();
        scheduledTime.setHours(hour24);
        scheduledTime.setMinutes(parseInt(minute));
        scheduledTime.setSeconds(0);

        if (scheduledTime < now) {
            scheduledTime.setDate(scheduledTime.getDate() + 1);
        }

        console.log(`알람 설정됨: ${scheduledTime.toLocaleString()}`);

        PushNotification.localNotificationSchedule({
            channelId: 'alarm-channel-new-onee',
            message: '일어날 시간이예요 ! ',
            date: scheduledTime,
            allowWhileIdle: true,
            repeatType: 'day',
            playSound: true,
            soundName: 'alarm.mp3',
            importance: PushNotification.Importance.HIGH,
            priority: 'high',
            vibrate: true,
            vibration: 2000,
            ongoing: true,
        });

        Alert.alert('알람이 설정되었습니다 🌞', `알람 시간: ${alarmTime}`);
    };

    // 알람 설정 활성화/비활성화
    const toggleAlarm = () => {
        if (!isAlarmEnabled) {
            setAlarm();
        } else {
            // 알람 해제 (모든 예약된 알림 취소)
            PushNotification.cancelAllLocalNotifications();
            Alert.alert('알람이 해제되었습니다', `알람이 꺼졌어요 ㅠㅠ`);
        }
        setIsAlarmEnabled((previousState) => !previousState);
    };

    // 시간 변경 핸들러
    const onTimeChange = (newTime: string) => {
        setAlarmTime(newTime);
    };

    return (
        <ImageBackground source={require('../../assets/alarmback.png')} style={{ flex: 1 }}>
            {/* 반짝이는 stars 이미지 추가 */}
            <Animated.Image
                source={require('../../assets/stars.png')}
                style={[styles.starsImage, { opacity: fadeAnim }]}
                resizeMode="cover"
            />

            <Container>
                <Title>Good Morning</Title>
                <RowContainer>
                    <AlarmImage source={require('../../assets/alarmicon.png')} />
                    <Subtitle>Alarm</Subtitle>
                </RowContainer>

                <CustomTimePicker onTimeChange={onTimeChange} />

                <RowContainer2>
                    <SunImage source={require('../../assets/sun.png')} />
                    <AlarmTimeText>Alarm time : {alarmTime}</AlarmTimeText>
                </RowContainer2>

                <AlarmSwitchContainer>
                    <AlarmSwitchText>I want Alarm !</AlarmSwitchText>
                    <Switch
                        value={isAlarmEnabled}
                        onValueChange={toggleAlarm}
                        thumbColor={isAlarmEnabled ? '#f5dd4b' : '#f4f3f4'}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                    />
                </AlarmSwitchContainer>
            </Container>
        </ImageBackground>
    );
}

export default MorningAlarm;

const styles = StyleSheet.create({
    starsImage: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1, // 배경 뒤에 표시되도록 설정
    },
});

const Container = styled(View)`
    flex: 1;
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

const Title = styled(Text)`
    font-size: 33px;
    margin-bottom: 50px;
    color: #ffffff;
    font-family: ${FONTS.QuicksandRegular};
    text-align: center;
`;

const RowContainer = styled(View)`
    flex-direction: row;
    margin-bottom: 100px;
`;
const RowContainer2 = styled(View)`
    flex-direction: row;
    margin-top: 60px;
    margin-bottom: 10px;
`;

const Subtitle = styled(Text)`
    font-size: 25px;
    color: #ffffff;
    font-family: ${FONTS.QuicksandRegular};
    text-align: center;
`;

const AlarmImage = styled(Image)`
    width: 28px;
    height: 28px;
    margin-top: 6px;
    margin-right: 4px;
`;

const SunImage = styled(Image)`
    width: 70px;
    height: 70px;
    margin-right: 1px;
`;

const AlarmTimeText = styled(Text)`
    font-size: 20px;
    color: #ffffff;
    font-family: ${FONTS.QuicksandRegular};
    text-align: center;
    margin-top: 16px;
`;

const AlarmSwitchContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-top: 30px;
`;

const AlarmSwitchText = styled(Text)`
    font-size: 22px;
    margin-right: 10px;
    color: #ffffff;
    font-family: ${FONTS.QuicksandRegular};
`;
