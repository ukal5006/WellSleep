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
