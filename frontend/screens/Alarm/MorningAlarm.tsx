import React, { useState } from "react";
import { View, Text, Button, Switch, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function MorningAlarm() {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(false);

  // 알람 시간 변경
  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || alarmTime;
    setIsPickerVisible(false);
    setAlarmTime(currentDate);
  };

  // 알람 설정 활성화/비활성화
  const toggleAlarm = () => {
    setIsAlarmEnabled((previousState) => !previousState);
    if (!isAlarmEnabled) {
      Alert.alert(
        "알람이 설정되었습니다",
        `알람 시간: ${alarmTime.toLocaleTimeString()}`
      );
    } else {
      Alert.alert("알람이 해제되었습니다");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        모닝콜 페이지
      </Text>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        알람 시간: {alarmTime.toLocaleTimeString()}
      </Text>

      <Button title="알람 시간 설정" onPress={() => setIsPickerVisible(true)} />

      {isPickerVisible && (
        <DateTimePicker
          value={alarmTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <Text style={{ fontSize: 18, marginRight: 10 }}>알람 활성화</Text>
        <Switch value={isAlarmEnabled} onValueChange={toggleAlarm} />
      </View>
    </View>
  );
}

export default MorningAlarm;

// import React, { useEffect, useRef } from "react";
// import { View, Image, Animated, StyleSheet, Dimensions } from "react-native";

// const { width } = Dimensions.get("window");

// const CloudAnimation = () => {
//   const cloudPosition = useRef(new Animated.Value(-width - 100)).current; // 초기 위치를 화면 왼쪽 바깥으로 설정

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(cloudPosition, {
//           toValue: width, // 화면 오른쪽 바깥쪽으로 이동
//           duration: 4500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(cloudPosition, {
//           toValue: -width - 100,
//           duration: 0,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, [cloudPosition]);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../../assets/main.png")}
//         style={styles.background}
//       />
//       <Animated.Image
//         source={require("../../assets/cloudwhite.png")}
//         style={[styles.cloud, { transform: [{ translateX: cloudPosition }] }]}
//       />

//       {/* 필요하면 추가 구름을 복제하여 다른 위치에 배치할 수 있습니다. */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   background: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//   },
//   cloud: {
//     position: "absolute",
//     width: 110,
//     height: 70,
//     top: "30%", // 구름 위치 조정
//   },
// });

// export default CloudAnimation;
