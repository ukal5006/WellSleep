import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    Switch,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Modal,
    FlatList,
} from 'react-native';
import styled from 'styled-components/native';
import { MypageNavigationProp } from '../../types/navigation';
import useAxios from '../../hooks/useAxios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import * as SecureStore from 'expo-secure-store';
import { IMAGELIST, LOGOUT, UPDATEIMAGE, USER } from '../../constants/apis';
import SaveBirthday from '../Mypage/SaveBirthday';
import { updateUserInfo } from '../../store/userSlice';
import { Ionicons } from '@expo/vector-icons';

const MypageContainer = styled(ImageBackground)`
    flex: 1;
`;

const ContentContainer = styled(View)`
    align-items: center;
    padding: 20px 0;
    margin-top: 30px; /* 페이지 상단 여백 */
`;

const ProfileContainer = styled(View)`
    flex-direction: row;
    width: 90%;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
`;

const UserNameWrapper = styled(View)``;

const UserName = styled(Text)`
    font-size: 21px;
    color: white;
    margin-bottom: 10px;
`;

const UserEmail = styled(Text)`
    font-size: 17px;
    color: white;
`;

const ProfileImg = styled(Image)`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const NavigatorContainer = styled(View)`
    width: 88%;
    margin-bottom: 20px;
`;

const NavigatorBtn = styled(TouchableOpacity)`
    width: 100%;
    padding: 20px;
    height: 65px;
    background-color: rgba(219, 176, 189, 0.6);

    border-radius: 15px;
    margin-bottom: 14px;
    flex-direction: row;
    gap: 1px;
`;

const NavigatorText = styled(Text)`
    font-size: 15px;
    color: white;

    margin-top: 2px;
`;

const ReminderContainer = styled(View)`
    width: 90%;
    margin-bottom: 20px;
`;

const BlurContainer = styled(View)`
    background-color: rgba(2, 18, 40, 0.3);
    width: 100%;
    border-radius: 20px;
    padding: 20px;
`;

const NotificationWrapper = styled(View)`
    width: 100%;
    align-items: center;
    flex-direction: row;
    padding: 13px 12px;
    justify-content: space-between;
`;

const ReminderText = styled(Text)`
    color: white;
    font-size: 15px;
`;

const Toggle = styled(Switch)`
    transform: scaleX(1.4) scaleY(1.4);
`;

const MemberContainer = styled(View)`
    width: 90%;
    margin-top: 10px;
`;

const MemberBtn = styled(TouchableOpacity)`
    width: 100%;
    padding: 10px 0;
`;

const MemberText = styled(Text)`
    color: white;
    font-size: 15px;
    text-align: center;
`;

const MemberWrapper = styled(View)`
    width: 90%;
    margin-top: 10px;
    margin-bottom: 30px;
`;

const ModalContainer = styled(View)`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled(View)`
    background-color: white;
    width: 80%;
    border-radius: 10px;
    padding: 20px;
    align-items: center;
`;

const ImageOptionWrapper = styled(View)`
    margin: 10px;
    position: relative;
`;

const ImageOption = styled(Image)`
    width: 80px;
    height: 80px;
    border-radius: 40px;
`;

const CheckIcon = styled(View)`
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 5px;
`;

const SaveButton = styled(TouchableOpacity)`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #dbb0bd;
    border-radius: 10px;
`;

const SaveButtonText = styled(Text)`
    color: white;
    font-size: 16px;
    font-weight: bold;
`;

function Mypage() {
    const { dataFetch, userDataFetch } = useAxios();
    const navigation = useNavigation<MypageNavigationProp>();
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    const [sleepNoti, setSleepNoti] = useState(false);
    const [wakeAlarm, setWakeAlarm] = useState(false);
    const [limitNoti, setLimitNoti] = useState(false);
    const [luckNoti, setLuckNoti] = useState(false);

    const [imageList, setImageList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    async function storeTokens(accessToken: string, refreshToken: string) {
        await SecureStore.setItemAsync('accessToken', accessToken);
        await SecureStore.setItemAsync('refreshToken', refreshToken);
    }

    const handleMember = (type: string) => {
        Alert.alert(type, `정말 ${type} 하시겠습니까?`, [
            { text: '확인', onPress: () => handleMemberState(type) },
            { text: '취소', style: 'cancel' },
        ]);
    };

    const handleMemberState = async (type: string) => {
        if (type === '로그아웃') {
            try {
                await dataFetch('POST', LOGOUT);
            } catch (error) {
                Alert.alert('로그아웃 실패', '로그아웃에 실패했습니다. 다시 시도하세요.');
            }
        } else {
            try {
                await dataFetch('DELETE', USER);
            } catch (error) {
                Alert.alert('회원탈퇴 실패', '회원탈퇴에 실패했습니다. 다시 시도하세요.');
            }
        }
        storeTokens('', '');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    useEffect(() => {
        userDataFetch('GET', IMAGELIST).then((e) => setImageList(e));
    }, []);

    const handleSaveImage = () => {
        if (selectedImage) {
            dispatch(updateUserInfo({ profileImage: selectedImage }));
            userDataFetch('PUT', `${UPDATEIMAGE}?imageUrl=${selectedImage}`);
            setIsModalVisible(false);
        }
    };

    return (
        <MypageContainer source={require('@assets/backgroundImg.png')}>
            <ScrollView>
                <ContentContainer>
                    <ProfileContainer>
                        <UserNameWrapper>
                            <UserName>{userInfo ? userInfo.name : '이름 없음'}</UserName>
                            <UserEmail>{userInfo ? userInfo.email : '이메일 없음'}</UserEmail>
                        </UserNameWrapper>
                        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                            <ProfileImg
                                source={
                                    userInfo?.profileImage
                                        ? { uri: userInfo.profileImage }
                                        : require('@assets/profileimg.png')
                                }
                            />
                        </TouchableOpacity>
                    </ProfileContainer>

                    <MemberWrapper>
                        <SaveBirthday />
                    </MemberWrapper>

                    <NavigatorContainer>
                        <NavigatorBtn
                            onPress={() => {
                                if (userInfo?.constellation === null) {
                                    Alert.alert('등록된 별자리가 없습니다.');
                                } else {
                                    navigation.navigate('Luck');
                                }
                            }}
                        >
                            <Image
                                source={require('../../assets/luckwhite.png')}
                                style={{ width: 25, height: 25, marginRight: 11 }}
                            />
                            <NavigatorText>오늘의 운세</NavigatorText>
                        </NavigatorBtn>

                        <NavigatorBtn onPress={() => navigation.navigate('SleepLab')}>
                            <Image
                                source={require('../../assets/bookwhite.png')}
                                style={{ width: 27, height: 27, marginRight: 11 }}
                            />
                            <NavigatorText>수면 연구소</NavigatorText>
                        </NavigatorBtn>
                    </NavigatorContainer>

                    <ReminderContainer>
                        <BlurContainer>
                            <NotificationWrapper>
                                <ReminderText>취침시간 알림</ReminderText>
                                <Toggle
                                    onValueChange={() => setSleepNoti(!sleepNoti)}
                                    value={sleepNoti}
                                    trackColor={{ false: '#767577', true: '#FFD7E3' }}
                                    thumbColor={'#ffffff'}
                                />
                            </NotificationWrapper>
                            <NotificationWrapper>
                                <ReminderText>기상 알람</ReminderText>
                                <Toggle
                                    onValueChange={() => setWakeAlarm(!wakeAlarm)}
                                    value={wakeAlarm}
                                    trackColor={{ false: '#767577', true: '#FFD7E3' }}
                                    thumbColor={'#ffffff'}
                                />
                            </NotificationWrapper>
                            <NotificationWrapper>
                                <ReminderText>섭취 제한 알림</ReminderText>
                                <Toggle
                                    onValueChange={() => setLimitNoti(!limitNoti)}
                                    value={limitNoti}
                                    trackColor={{ false: '#767577', true: '#FFD7E3' }}
                                    thumbColor={'#ffffff'}
                                />
                            </NotificationWrapper>
                            <NotificationWrapper>
                                <ReminderText>운세 알림</ReminderText>
                                <Toggle
                                    onValueChange={() => setLuckNoti(!luckNoti)}
                                    value={luckNoti}
                                    trackColor={{ false: '#767577', true: '#FFD7E3' }}
                                    thumbColor={'#ffffff'}
                                />
                            </NotificationWrapper>
                        </BlurContainer>
                    </ReminderContainer>

                    <MemberContainer>
                        <MemberBtn onPress={() => handleMember('로그아웃')}>
                            <MemberText>로그아웃</MemberText>
                        </MemberBtn>
                        <MemberBtn onPress={() => handleMember('회원탈퇴')}>
                            <MemberText>회원탈퇴</MemberText>
                        </MemberBtn>
                    </MemberContainer>
                </ContentContainer>
                {isModalVisible && (
                    <Modal transparent={true} animationType="slide" visible={isModalVisible}>
                        <ModalContainer>
                            <ModalContent>
                                <FlatList
                                    data={imageList}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={3}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => setSelectedImage(item)}>
                                            <ImageOptionWrapper>
                                                <ImageOption source={{ uri: item }} />
                                                {selectedImage === item && (
                                                    <CheckIcon>
                                                        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                                                    </CheckIcon>
                                                )}
                                            </ImageOptionWrapper>
                                        </TouchableOpacity>
                                    )}
                                />
                                <SaveButton onPress={handleSaveImage}>
                                    <SaveButtonText>저장</SaveButtonText>
                                </SaveButton>
                            </ModalContent>
                        </ModalContainer>
                    </Modal>
                )}
            </ScrollView>
        </MypageContainer>
    );
}

export default Mypage;
