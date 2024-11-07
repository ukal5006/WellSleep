import { useState } from 'react';
import { Image, ImageBackground, Switch, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

const MypageContainer = styled(ImageBackground)`
    align-items: center;
`;

const ProfileContainer = styled(View)`
    flex-direction: row;
    width: 90%;
    height: 20%;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
`;

const UserNameWrapper = styled(TouchableOpacity)`
    width: 100px;
`;

const UserName = styled(Text)`
    font-size: 20px;
    color: white;
`;

const ProfileImg = styled(Image)`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const NavigatorContainer = styled(View)`
    background-color: blanchedalmond;
    width: 90%;
    height: 40%;
`;

const NavigatorBtn = styled(TouchableOpacity)``;

const ReminderContainer = styled(View)`
    width: 90%;
    height: 40%;
    padding: 30px 0px;
`;

const BlurContainer = styled(View)`
    background-color: rgba(2, 18, 40, 0.23);
    width: 100%;
    height: 100%;
    border-radius: 20px;
`;

const NotificationWrapper = styled(View)`
    width: 100%;
    height: 25%;
    align-items: center;
    flex-direction: row;
    padding: 0px 30px;
`;

const AlarmWrapper = styled(View)`
    width: 100%;
    height: 25%;
    align-items: center;
    flex-direction: row;
    padding: 0px 30px;
`;

const ReminderText = styled(Text)`
    text-align: center;
    color: white;
`;

const Toggle = styled(Switch)`
    flex: 1;
    transform: scaleY(1.3);
`;

function Mypage() {
    const [sleepNoti, setSleepNoti] = useState(false);
    const [wakeAlarm, setWakeAlarm] = useState(false);
    const [limitNoti, setLimitNoti] = useState(false);
    const [luckNoti, setLuckNoti] = useState(false);
    return (
        <MypageContainer source={require('@assets/backgroundImg.png')}>
            <ProfileContainer>
                <UserNameWrapper>
                    <UserName>정경원</UserName>
                </UserNameWrapper>
                <ProfileImg
                    source={{
                        uri: 'https://cdn.vox-cdn.com/thumbor/2WTDJY_7GkEMyO-AHG0oejL_ERE=/0x0:1440x900/1400x1400/filters:focal(722x512:723x513)/cdn.vox-cdn.com/uploads/chorus_asset/file/22310830/NmJgg.jpg',
                    }}
                />
            </ProfileContainer>
            <NavigatorContainer></NavigatorContainer>
            <ReminderContainer>
                <BlurContainer>
                    <NotificationWrapper>
                        <ReminderText>취침시간 알림</ReminderText>
                        <Toggle
                            onValueChange={() => setSleepNoti(!sleepNoti)}
                            value={sleepNoti}
                            trackColor={{ false: '#767577', true: '#FFD7E3' }}
                            thumbColor={'#45475C'}
                        />
                    </NotificationWrapper>
                    <AlarmWrapper>
                        <ReminderText>기상 알람</ReminderText>
                        <Toggle
                            onValueChange={() => setWakeAlarm(!wakeAlarm)}
                            value={wakeAlarm}
                            trackColor={{ false: '#767577', true: '#FFD7E3' }}
                            thumbColor={'#45475C'}
                        />
                    </AlarmWrapper>
                    <NotificationWrapper>
                        <ReminderText>섭취 제한 알림</ReminderText>
                        <Toggle
                            onValueChange={() => setLimitNoti(!limitNoti)}
                            value={limitNoti}
                            trackColor={{ false: '#767577', true: '#FFD7E3' }}
                            thumbColor={'#45475C'}
                        />
                    </NotificationWrapper>
                    <NotificationWrapper>
                        <ReminderText>운세 알림</ReminderText>
                        <Toggle
                            onValueChange={() => setLuckNoti(!luckNoti)}
                            value={luckNoti}
                            trackColor={{ false: '#767577', true: '#FFD7E3' }}
                            thumbColor={'#45475C'}
                        />
                    </NotificationWrapper>
                </BlurContainer>
            </ReminderContainer>
        </MypageContainer>
    );
}

export default Mypage;
