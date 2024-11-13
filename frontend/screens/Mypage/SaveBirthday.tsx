import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { CONSTELLATION_SAVE, USER } from "../../constants/apis";
import { getConstellation } from "../../constants/getConstellation";
import useAxios from "../../hooks/useAxios";
import * as SecureStore from "expo-secure-store";

const SaveBirthday: React.FC = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedConstellation, setSelectedConstellation] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [birthday, setBirthday] = useState<string | null>(null); // 생일 상태 추가

  const { userDataFetch } = useAxios();

  useEffect(() => {
    // 로그인된 유저의 user_id와 생일 가져오기
    const fetchUserData = async () => {
      try {
        const userData = await userDataFetch("GET", USER);
        setUserId(userData.id);
        setBirthday(userData.birthday); // 사용자 생일 설정
        setSelectedConstellation(userData.constellation || ""); // 저장된 별자리 설정
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserData();
  }, []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = async (date: Date) => {
    hideDatePicker();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedBirthday = `${month}월 ${day}일`;

    // 별자리 계산
    const constellation = getConstellation(month, day);
    setSelectedConstellation(constellation);
    setBirthday(formattedBirthday);

    if (!userId) {
      Alert.alert("오류", "사용자 ID를 가져오지 못했습니다.");
      return;
    }

    try {
      // 서버에 생일과 별자리 저장 요청
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      await axios.put(
        CONSTELLATION_SAVE,
        {
          user_id: userId,
          constellation,
          birthday: formattedBirthday,
        },
        {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        }
      );

      Alert.alert("성공", `별자리 ${constellation}와 생일이 저장되었습니다.`);
    } catch (error) {
      console.error("별자리 저장 실패:", error);
      Alert.alert("실패", "별자리와 생일 저장에 실패했습니다.");
    }
  };

  return (
    <View style={{ marginLeft: 19 }}>
      {/* 생일 입력 버튼 */}
      <TouchableOpacity
        onPress={showDatePicker}
        style={{ flexDirection: "row" }}
      >
        <Image
          source={require("../../assets/cake.png")}
          style={{ width: 37, height: 37, marginRight: 10 }}
        />

        <View style={{ color: "white", fontSize: 16, marginTop: 7 }}>
          {birthday ? (
            <Text style={{ color: "white", fontSize: 16 }}>{birthday}</Text>
          ) : (
            <Text style={{ color: "white", fontSize: 16 }}>생일 입력</Text>
          )}
        </View>
        <Image
          source={require("../../assets/shooting.png")}
          style={{ width: 37, height: 37, marginRight: 10, marginLeft: 33 }}
        />
        {selectedConstellation && (
          <Text style={{ color: "white", fontSize: 16, marginTop: 7 }}>
            {selectedConstellation}
          </Text>
        )}
        {/* <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
          생일 입력
        </Text> */}
        {/* {selectedConstellation && (
          <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
            {selectedConstellation}
          </Text>
        )} */}
      </TouchableOpacity>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* 저장된 생일 및 별자리 출력 */}
      {/* <View style={{ marginTop: 10 }}>
        {birthday ? (
          <Text style={{ color: "white", fontSize: 16 }}>생일: {birthday}</Text>
        ) : (
          <Text style={{ color: "white", fontSize: 16 }}>
            생일을 입력학세요
          </Text>
        )}
      </View> */}
    </View>
  );
};

export default SaveBirthday;
