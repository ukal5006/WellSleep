import React, { useEffect, useRef } from "react";
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const CloudAnimation = () => {
  const navigation = useNavigation();
  const cloudPosition = useRef(new Animated.Value(-width)).current; // 초기 위치를 화면 왼쪽 바깥으로 설정

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cloudPosition, {
          toValue: width, // 화면 오른쪽 바깥쪽으로 이동
          duration: 5500,
          useNativeDriver: true,
        }),
        Animated.timing(cloudPosition, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [cloudPosition]);

  // 수면 종료 버튼을 누르면 홈 화면("홈")으로 이동
  const handleEndSleep = () => {
    navigation.navigate("홈"); // 탭 네비게이터의 이름인 "홈"으로 이동
  };

  return (
    <View style={styles.container}>
      {/* 배경 이미지 */}
      <Image
        source={require("../../assets/main.png")}
        style={styles.background}
      />
      {/* 상단에 수면 측정 중 텍스트 */}
      <Text style={styles.sleepingText}>수면 측정 중...</Text>

      {/* 구름 애니메이션 */}
      <Animated.Image
        source={require("../../assets/cloudwhite.png")}
        style={[styles.cloud, { transform: [{ translateX: cloudPosition }] }]}
      />

      {/* 하단에 수면 종료 버튼 */}
      <TouchableOpacity style={styles.endSleepButton} onPress={handleEndSleep}>
        <Text style={styles.endSleepButtonText}>수면 종료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sleepingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cloud: {
    position: "absolute",
    width: 110,
    height: 70,
    top: "30%", // 구름 위치 조정
  },
  endSleepButton: {
    position: "absolute",
    bottom: 50, // 하단에 배치
    backgroundColor: "#211C52",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  endSleepButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CloudAnimation;
