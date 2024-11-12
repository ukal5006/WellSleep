import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { MypageNavigationProp } from "../../types/navigation";
import useAxios from "../../hooks/useAxios";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import * as SecureStore from "expo-secure-store";
import { LOGOUT, USER } from "../../constants/apis";
import SaveBirthday from "../Mypage/SaveBirthday";

const ProfileContainer = styled(View)`
  flex-direction: row;
  width: 90%;
  height: 20%;
  padding: 10px 20px;
  justify-content: space-between;
  align-items: center;
`;

const UserNameWrapper = styled(View)``;

const UserName = styled(Text)`
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
`;

const UserEmail = styled(Text)`
  font-size: 15px;
  color: white;
`;

const ProfileImg = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const NavigatorContainer = styled(View)`
  width: 90%;
  height: 30%;
  flex-direction: column;
  justify-content: space-between;
`;

const NavigatorBtn = styled(TouchableOpacity)`
  width: 100%;
  height: 30%;
  padding: 20px;
  background-color: rgba(219, 176, 189, 0.5);
  justify-content: center;
  border-radius: 15px;
`;

const NavigatorText = styled(Text)`
  font-size: 15px;
  color: white;
`;

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
  font-size: 15px;
`;

const Toggle = styled(Switch)`
  flex: 1;
  transform: scaleY(1.3);
`;

const MemberContainer = styled(View)`
  width: 90%;
  height: 10%;
  padding-left: 10px;
`;

const MemberBtn = styled(TouchableOpacity)`
  width: 100%;
  height: 50%;
`;

const MemberText = styled(Text)`
  color: white;
  font-size: 15px;
`;

function Mypage() {
  const { dataFetch, loading, error, data } = useAxios();
  const navigation = useNavigation<MypageNavigationProp>();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  const [sleepNoti, setSleepNoti] = useState(false);
  const [wakeAlarm, setWakeAlarm] = useState(false);
  const [limitNoti, setLimitNoti] = useState(false);
  const [luckNoti, setLuckNoti] = useState(false);

  async function storeTokens(accessToken: string, refreshToken: string) {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  }

  const handleMember = (type: string) => {
    Alert.alert(type, `정말 ${type} 하시겠습니까?`, [
      { text: "확인", onPress: () => handleMemberState(type) },
      { text: "취소", style: "cancel" },
    ]);
  };

  const handleMemberState = async (type: string) => {
    if (type === "로그아웃") {
      console.log("type");
      try {
        await dataFetch("POST", LOGOUT).then(console.log);
      } catch (error) {
        console.error("로그아웃 실패:", error);
        Alert.alert(
          "로그아웃 실패",
          "로그아웃에 실패했습니다. 다시 시도하세요."
        );
      }
    } else {
      console.log("type");
      try {
        await dataFetch("DELETE", USER).then(console.log);
      } catch (error) {
        console.error("회원탈퇴 실패:", error);
        Alert.alert(
          "회원탈퇴 실패",
          "회원탈퇴에 실패했습니다. 다시 시도하세요."
        );
      }
    }
    storeTokens("", "");
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ImageBackground
        source={require("@assets/backgroundImg.png")}
        style={{
          flex: 1,
          width: "100%",
          minHeight: "100%",
          alignItems: "center",
        }}
      >
        <ProfileContainer>
          <UserNameWrapper>
            <UserName>{userInfo ? userInfo.name : "이름 없음"}</UserName>
            <UserEmail>{userInfo ? userInfo.email : "이메일 없음"}</UserEmail>
          </UserNameWrapper>
          <ProfileImg
            source={{
              uri: "https://cdn.vox-cdn.com/thumbor/2WTDJY_7GkEMyO-AHG0oejL_ERE=/0x0:1440x900/1400x1400/filters:focal(722x512:723x513)/cdn.vox-cdn.com/uploads/chorus_asset/file/22310830/NmJgg.jpg",
            }}
          />
        </ProfileContainer>
        <NavigatorContainer>
          <NavigatorBtn onPress={() => navigation.navigate("Luck")}>
            <NavigatorText>오늘의 운세</NavigatorText>
          </NavigatorBtn>
          <NavigatorBtn onPress={() => navigation.navigate("SleepLab")}>
            <NavigatorText>수면 연구소</NavigatorText>
          </NavigatorBtn>
          <NavigatorBtn onPress={() => navigation.navigate("Info")}>
            <NavigatorText>이용 안내</NavigatorText>
          </NavigatorBtn>
        </NavigatorContainer>
        <ReminderContainer>
          <BlurContainer>
            <NotificationWrapper>
              <ReminderText>취침시간 알림</ReminderText>
              <Toggle
                onValueChange={() => setSleepNoti(!sleepNoti)}
                value={sleepNoti}
                trackColor={{ false: "#767577", true: "#FFD7E3" }}
                thumbColor={"#45475C"}
              />
            </NotificationWrapper>
            <AlarmWrapper>
              <ReminderText>기상 알람</ReminderText>
              <Toggle
                onValueChange={() => setWakeAlarm(!wakeAlarm)}
                value={wakeAlarm}
                trackColor={{ false: "#767577", true: "#FFD7E3" }}
                thumbColor={"#45475C"}
              />
            </AlarmWrapper>
            <NotificationWrapper>
              <ReminderText>섭취 제한 알림</ReminderText>
              <Toggle
                onValueChange={() => setLimitNoti(!limitNoti)}
                value={limitNoti}
                trackColor={{ false: "#767577", true: "#FFD7E3" }}
                thumbColor={"#45475C"}
              />
            </NotificationWrapper>
            <NotificationWrapper>
              <ReminderText>운세 알림</ReminderText>
              <Toggle
                onValueChange={() => setLuckNoti(!luckNoti)}
                value={luckNoti}
                trackColor={{ false: "#767577", true: "#FFD7E3" }}
                thumbColor={"#45475C"}
              />
            </NotificationWrapper>
          </BlurContainer>
        </ReminderContainer>
        <MemberContainer>
          <SaveBirthday />
          <MemberBtn onPress={() => handleMember("로그아웃")}>
            <MemberText>로그아웃</MemberText>
          </MemberBtn>
          <MemberBtn onPress={() => handleMember("회원탈퇴")}>
            <MemberText>회원탈퇴</MemberText>
          </MemberBtn>
        </MemberContainer>
      </ImageBackground>
    </ScrollView>
  );
}

export default Mypage;
