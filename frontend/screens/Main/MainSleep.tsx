import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import IntakeModal from "./IntakeModal";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { INTAKE_SAVE, START_SLEEP } from "../../constants/apis";

const MainSleep = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [totalInformationId, setTotalInformationId] = useState<number | null>(
    null
  );

  const [caffeine, setCaffeine] = useState(0);
  const [alcohol, setAlcohol] = useState(0);

  const onChange = (event: any, selectedTime: any) => {
    setShowPicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const showTimePicker = () => {
    setShowPicker(true);
  };

  // 수면 측정 시작 API 호출 후 섭취량 저장
  const startSleepTracking = async () => {
    try {
      // 액세스 토큰과 리프레시 토큰을 가져와 확인
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      // 수면 측정 시작 API 호출
      const response = await axios.post(
        START_SLEEP,
        {},
        {
          headers: {
            Authorization: accessToken || "",
            RefreshToken: refreshToken || "",
          },
        }
      );

      console.log("수면 측정 시작 API 응답:", response.data);

      // 서버에서 필요한 ID가 포함되어 응답이 온 경우
      if (response.data && response.data.id) {
        setTotalInformationId(response.data.id); // totalInformationId 설정
        console.log("Total Information ID:", response.data.id);

        // ID 설정 후 섭취량 저장 API 호출
        saveIntakeData(caffeine, alcohol);
      } else {
        console.warn("ID가 응답에 포함되어 있지 않습니다.");
      }
    } catch (error) {
      console.error("수면 측정 시작 오류:", error);
      Alert.alert("오류", "수면 측정을 시작하는 데 실패했습니다.");
    }
  };

  // 알코올 및 카페인 섭취량 저장 요청
  const saveIntakeData = async (
    caffeineIntake: number,
    alcoholIntake: number
  ) => {
    if (totalInformationId === null) {
      Alert.alert("오류", "수면 측정 ID가 없습니다.");
      return;
    }

    try {
      const accessToken = await SecureStore.getItemAsync("accessToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");

      const response = await axios.post(
        INTAKE_SAVE,
        {
          id: totalInformationId,
          alcoholIntake: alcoholIntake,
          caffeineIntake: caffeineIntake,
        },
        {
          headers: {
            Authorization: accessToken || "",
            RefreshToken: refreshToken || "",
          },
        }
      );

      console.log(
        `섭취량 저장 완료 - 커피: ${caffeineIntake}, 알코올: ${alcoholIntake}`
      );
      console.log("섭취량 저장 API 응답:", response.data);
      Alert.alert("알림", "섭취량 데이터가 저장되었습니다.");
    } catch (error) {
      console.error("섭취량 저장 오류:", error);
      Alert.alert("오류", "섭취량 데이터를 저장하는 데 실패했습니다.");
    }
  };

  const setAlarm = () => {
    startSleepTracking(); // 수면 측정 시작 API 호출 후 섭취량 저장 진행
    setShowModal(true);
  };

  const confirmAlarm = (caffeineIntake: number, alcoholIntake: number) => {
    setCaffeine(caffeineIntake);
    setAlcohol(alcoholIntake);

    // 알람 설정 주석 처리
    // const hours = time.getHours();
    // const minutes = time.getMinutes();
    // const now = new Date();
    // const alarmTime = new Date(now);
    // alarmTime.setHours(hours);
    // alarmTime.setMinutes(minutes);
    // alarmTime.setSeconds(0);

    // if (alarmTime <= now) {
    //   alarmTime.setDate(alarmTime.getDate() + 1);
    // }

    // PushNotification.localNotificationSchedule({
    //   channelId: "alarm-channel",
    //   title: "기상 알람",
    //   message:
    //     caffeineIntake > 0 || alcoholIntake > 0
    //       ? `커피 섭취량: ${caffeineIntake}, 알코올: ${alcoholIntake}. 기상 시간이 다가옵니다!`
    //       : "기상 시간이 다가옵니다!",
    //   date: alarmTime,
    //   allowWhileIdle: true,
    // });

    // console.log(
    //   `알람 설정 시간: ${hours}:${minutes}, 커피: ${caffeineIntake}, 알코올: ${alcoholIntake}`
    // );
  };

  return (
    <ImageBackground
      source={require("../../assets/main.png")}
      style={styles.background}
    >
      <Text style={styles.title}>수면을 시작합니다</Text>
      <Text style={styles.subtitle}>기상 시간을 설정해주세요</Text>
      <View style={styles.overlay}>
        <Text style={styles.title1}>알람 시간 설정</Text>
        <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
          <Text style={styles.timeText}>
            {time.getHours().toString().padStart(2, "0")}:
            {time.getMinutes().toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.sleepButton} onPress={setAlarm}>
        <Image source={require("../../assets/moon.png")} style={styles.icon} />
        <Text style={styles.buttonText}>수면 시작</Text>
      </TouchableOpacity>

      <IntakeModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmAlarm}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    marginTop: 150,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 90,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 40,
  },
  title1: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  timeButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  timeText: {
    fontSize: 20,
    color: "#211C52",
    fontWeight: "bold",
  },
  sleepButton: {
    backgroundColor: "#211C52",
    borderRadius: 18,
    marginTop: 160,
    alignItems: "center",
    height: 69,
    width: 349,
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default MainSleep;
