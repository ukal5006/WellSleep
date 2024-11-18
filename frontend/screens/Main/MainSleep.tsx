import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import useAxios from "../../hooks/useAxios";
import IntakeModal from "./IntakeModal";
import { INTAKE_SAVE, START_SLEEP } from "../../constants/apis";
import { FONTS } from "../../constants/fonts";

const MainSleep: React.FC = () => {
  const { dataFetch, data } = useAxios();
  const [sleepId, setSleepId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [caffeine, setCaffeine] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로딩 상태

  // 수면 측정 시작 요청
  const startSleepMeasurement = async () => {
    await dataFetch("POST", START_SLEEP);
  };

  // 수면 측정 시작 alert 이후에 카페인 섭취 모달 표시
  const showAlert = (title: string, message: string): Promise<void> => {
    return new Promise((resolve) => {
      Alert.alert(title, message, [{ text: "확인", onPress: () => resolve() }]);
    });
  };

  // 요청 후 응답 데이터 확인
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false); // 초기 로딩 상태를 false로 변경
      return;
    }

    const handleDataResponse = async () => {
      if (data) {
        setSleepId(data);
        await showAlert(`수면 측정 시작`, "수면 측정이 시작되었습니다!");
        setIsModalVisible(true);
      } else {
        console.log("데이터를 받지 못했습니다."); // 알람 대신 로그로 처리
      }
    };

    handleDataResponse();
  }, [data, isInitialLoad]);

  // 현재 시각 업데이트
  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // 카페인 및 알코올 섭취 기록 저장 요청
  const saveIntakeRecord = async () => {
    if (sleepId === null) return;
    try {
      await dataFetch("POST", INTAKE_SAVE, {
        data: {
          id: sleepId,
          alcoholIntake: alcohol,
          caffeineIntake: caffeine,
        },
      });
      setIsModalVisible(false);
      Alert.alert(
        "기록 저장",
        `수면 측정 시작 카페인 : ${caffeine} 알코올: ${alcohol} `
      );
      setCaffeine(0); // 상태 초기화
      setAlcohol(0); // 상태 초기화
    } catch (error) {
      console.error("기록 저장 오류:", error);
      Alert.alert("오류", "기록 저장에 실패했습니다.");
    }
  };

  const handleStartSleep = () => {
    startSleepMeasurement(); // startSleepMeasurement 호출
  };

  return (
    <ImageBackground
      source={require("../../assets/main.png")}
      style={styles.background}
    >
      <Text style={styles.title}> 수면 시작하기? </Text>
      <View style={styles.overlay}>
        <Text style={styles.timeText}>
          {currentTime.slice(0, 5)}
          <Text style={styles.secondsText}>{currentTime.slice(5)}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.sleepButton} onPress={handleStartSleep}>
        <Image source={require("../../assets/moon.png")} style={styles.icon} />
        <Text style={styles.buttonText}>측정 시작</Text>
      </TouchableOpacity>

      <IntakeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={saveIntakeRecord} // confirmAlarm 대신 saveIntakeRecord 사용
        sleepId={sleepId} // 전달할 sleepId
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
    padding: 20,
    borderRadius: 10,
    marginTop: 90,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#fff",
    marginTop: 90,
    fontFamily: FONTS.NotoSerifKRRegular,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 40,
  },
  timeText: {
    fontSize: 50,
    color: "#fff",
    // fontWeight: "bold",
    fontFamily: FONTS.NotoSerifKRRegular,
  },
  secondsText: {
    fontSize: 14,
    color: "#fff",
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
