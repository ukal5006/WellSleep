import React, { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CloudAnimation = () => {
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

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/main.png")}
        style={styles.background}
      />
      <Animated.Image
        source={require("../../assets/cloudwhite.png")}
        style={[styles.cloud, { transform: [{ translateX: cloudPosition }] }]}
      />

      {/* 필요하면 추가 구름을 복제하여 다른 위치에 배치할 수 있습니다. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default CloudAnimation;
