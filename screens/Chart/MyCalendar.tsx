// MyCalendar.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import moment from "moment";
import { StackParamList } from "../../types/navigation";

// 캘린더 날짜 타입 정의
interface CalendarDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

// 마킹된 날짜 타입 정의
type MarkedDatesType = {
  [key: string]: {
    dots: { key: string; color: string }[];
    avg?: number;
  };
};

// 데이터 타입 정의
interface DataRecord {
  avg: number;
  date: string;
  isAlcohol: number;
  isCaffeine: number;
  realSleepTime: number;
  sleepTime: number;
  totalInformationId: number;
}

// props 타입 정의
interface MyCalendarProps {
  data: DataRecord[];
  onMonthChange: (newMonth: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ data, onMonthChange }) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const today = moment().format("YYYY-MM-DD");
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});

  useEffect(() => {
    if (data) {
      const transformedData: MarkedDatesType = data.reduce(
        (acc: MarkedDatesType, record: DataRecord) => {
          acc[record.date] = {
            dots: [
              record.isAlcohol === 1 ? { key: "alcohol", color: "pink" } : null,
              record.isCaffeine === 1
                ? { key: "caffeine", color: "yellow" }
                : null,
            ].filter(Boolean) as { key: string; color: string }[],
            avg: Math.floor(record.avg),
          };
          return acc;
        },
        {}
      );
      setMarkedDates(transformedData);
    }
  }, [data]);

  const onDatePress = (dateString: string) => {
    const selectedRecord = data.find((record) => record.date === dateString);
    if (selectedRecord) {
      const { totalInformationId } = selectedRecord;
      navigation.navigate("DailyChart", {
        totalInformationId: totalInformationId.toString(), // `string`으로 변환하여 전달
      });
    }
  };

  const handleMonthChange = (month: { year: number; month: number }) => {
    const newMonth = `${month.year}-${String(month.month).padStart(2, "0")}`;
    console.log("handleMonthChange에서 전달되는 newMonth:", newMonth); // newMonth 값 확인
    onMonthChange(newMonth); // 부모 컴포넌트에 새로운 월 전달
  };

  return (
    <Calendar
      current={today}
      markingType="multi-dot"
      markedDates={markedDates}
      onMonthChange={handleMonthChange} // 월 변경 시 이벤트 핸들러
      dayComponent={({ date }: { date: CalendarDate }) => (
        <TouchableOpacity onPress={() => onDatePress(date.dateString)}>
          <View style={{ alignItems: "center" }}>
            {markedDates[date.dateString]?.avg !== undefined && (
              <Text style={{ color: "gray", fontSize: 12 }}>
                {markedDates[date.dateString].avg}
              </Text>
            )}
            <Text style={{ color: "white" }}>{date.day}</Text>
            {markedDates[date.dateString]?.dots.map((dot, index) => (
              <View
                key={index}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 10,
                  backgroundColor: dot.color,
                }}
              />
            ))}
          </View>
        </TouchableOpacity>
      )}
      theme={{
        calendarBackground: "black",
        monthTextColor: "white",
        textDayFontSize: 14,
        textSectionTitleColor: "gray",
      }}
    />
  );
};

export default MyCalendar;
