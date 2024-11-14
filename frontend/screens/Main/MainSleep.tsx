import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useAxios from "../../hooks/useAxios";
import IntakeModal from "./IntakeModal";
import * as SecureStore from "expo-secure-store";
import { INTAKE_SAVE, START_SLEEP } from "../../constants/apis";
import Sleeping from "./Sleeping";

const MainSleep: React.FC = () => {
  const { dataFetch, data } = useAxios();
  const [sleepId, setSleepId] = useState<number | null>(null);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [caffeine, setCaffeine] = useState(0);
  const [alcohol, setAlcohol] = useState(0);

  // 수면 측정 시작 요청
  const startSleepMeasurement = async () => {
    await dataFetch("POST", START_SLEEP, {
      headers: {
        Authorization: "{accessToken}",
        RefreshToken: "{refreshToken}",
      },
    });
  };

  // 요청 후 응답 데이터 확인
  useEffect(() => {
    if (data) {
      setSleepId(data);
      Alert.alert("수면 측정 시작", `수면 측정이 시작되었습니다. ID: ${data}`);
      setIsModalVisible(true); // 모달 열기
    } else if (data) {
      Alert.alert("수면 측정 시작", "데이터를 받지 못했습니다.");
    }
  }, [data]);

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
        headers: {
          Authorization: "{accessToken}",
          RefreshToken: "{refreshToken}",
        },
        data: {
          id: sleepId,
          alcoholIntake: alcohol,
          caffeineIntake: caffeine,
        },
      });
      Alert.alert("기록 저장", "카페인 및 알코올 섭취 기록이 저장되었습니다.");
      setIsModalVisible(false);
    } catch (error) {
      console.error("기록 저장 오류:", error);
      Alert.alert("오류", "기록 저장에 실패했습니다.");
    }
  };

  const confirmAlarm = (caffeineIntake: number, alcoholIntake: number) => {
    setCaffeine(caffeineIntake);
    setAlcohol(alcoholIntake);
    saveIntakeRecord();
  };

  const handleStartSleep = () => {
    startSleepMeasurement();
  };

  return (
    <ImageBackground
      source={require("../../assets/main.png")}
      style={styles.background}
    >
      <Text style={styles.title}>수면을 시작합니다</Text>
      <Text style={styles.subtitle}>현재 시각</Text>
      <View style={styles.overlay}>
        <Text style={styles.timeText}>
          {currentTime.slice(0, 5)}
          <Text style={styles.secondsText}>{currentTime.slice(5)}</Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.sleepButton} onPress={handleStartSleep}>
        <Image source={require("../../assets/moon.png")} style={styles.icon} />
        <Text style={styles.buttonText}>수면 시작</Text>
      </TouchableOpacity>

      <IntakeModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
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
  timeText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
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
