import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
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

  const { userDataFetch } = useAxios();

  useEffect(() => {
    // 로그인된 유저의 user_id 가져오기
    const fetchUserId = async () => {
      try {
        const userData = await userDataFetch("GET", USER);
        setUserId(userData.id);
        console.log(userData);
        console.log("Fetched user_id:", userData.id); // 콘솔에 user_id 출력
      } catch (error) {
        console.error("Error fetching user_id:", error);
        Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchUserId();
  }, []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = async (date: Date) => {
    hideDatePicker();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 별자리 계산
    const constellation = getConstellation(month, day);
    setSelectedConstellation(constellation);
    console.log(constellation); //별자리 이름 콘솔 출력

    if (!userId) {
      Alert.alert("오류", "사용자 ID를 가져오지 못했습니다.");
      return;
    }

    try {
      // 서버에 별자리 저장 요청
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      const response = await axios.put(
        CONSTELLATION_SAVE,
        {
          user_id: userId,
          constellation,
        },
        {
          headers: {
            Authorization: accessToken,
            RefreshToken: refreshToken,
          },
        }
      );

      Alert.alert("성공", `별자리 ${constellation}가 저장되었습니다.`);
    } catch (error) {
      console.error("별자리 저장 실패:", error);
      Alert.alert("실패", "별자리 저장에 실패했습니다.");
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      {/* 생일 입력 버튼 */}
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={{ color: "white", fontSize: 16, marginTop: 20 }}>
          생일 입력
        </Text>
      </TouchableOpacity>

      {/* DateTimePickerModal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* 저장된 별자리 출력 */}
      {selectedConstellation && (
        <Text style={{ color: "white", fontSize: 16, marginTop: 10 }}>
          저장된 별자리: {selectedConstellation}
        </Text>
      )}
    </View>
  );
};

export default SaveBirthday;
