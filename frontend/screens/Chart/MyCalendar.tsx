import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../types/navigation";
import moment from "moment";
import { NAVY, PURPLE, YELLOW, PINK } from "../../constants/colors";

import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "../../constants/fonts";

interface CalendarDate {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

type MarkedDatesType = {
  [key: string]: {
    dots: { key: string; color: string }[];
    avg?: number;
  };
};

interface DataRecord {
  avg: number;
  date: string;
  isAlcohol: number;
  isCaffeine: number;
  realSleepTime: number;
  sleepTime: number;
  totalInformationId: number;
}

interface MyCalendarProps {
  data: DataRecord[];
  onMonthChange: (newMonth: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ data, onMonthChange }) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const [markedDates, setMarkedDates] = useState<MarkedDatesType>({});
  const today = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (data) {
      const transformedData: MarkedDatesType = data.reduce(
        (acc: MarkedDatesType, record: DataRecord) => {
          acc[record.date] = {
            dots: [
              record.isAlcohol === 1 ? { key: "alcohol", color: YELLOW } : null,
              record.isCaffeine === 1 ? { key: "caffeine", color: PINK } : null,
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
        totalInformationId: totalInformationId.toString(),
      });
    }
  };

  const handleMonthChange = (month: { year: number; month: number }) => {
    const newMonth = `${month.year}-${String(month.month).padStart(2, "0")}`;
    onMonthChange(newMonth);
  };

  return (
    <View>
      <Calendar
        style={{ backgroundColor: "transparent" }}
        theme={{
          calendarBackground: "transparent",
          monthTextColor: "white",
          textMonthFontSize: 20,
          textMonthFontFamily: FONTS.NotoSerifKRBold,
        }}
        monthFormat={"yyyy년 M월"}
        hideArrows={true}
        enableSwipeMonths={true}
        markingType="multi-dot"
        markedDates={markedDates}
        onMonthChange={handleMonthChange}
        dayComponent={({ date }: { date: CalendarDate }) => (
          <TouchableOpacity onPress={() => onDatePress(date.dateString)}>
            <View
              style={{
                alignItems: "center",
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor:
                  date.dateString === today
                    ? "white"
                    : markedDates[date.dateString]?.avg
                    ? PURPLE
                    : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: date.dateString === today ? NAVY : "white",
                }}
              >
                {date.day}
              </Text>

              {markedDates[date.dateString]?.avg !== undefined && (
                <Text style={{ color: "white", fontSize: 12 }}>
                  {markedDates[date.dateString].avg}
                </Text>
              )}
              <View style={{ flexDirection: "row", marginTop: 2 }}>
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
            </View>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: YELLOW,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontFamily: FONTS.NotoSansKRLight,
            }}
          >
            알콜 섭취
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: PINK,
              borderRadius: 5,
              marginRight: 5,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontFamily: FONTS.NotoSansKRLight,
            }}
          >
            카페인 섭취
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MyCalendar;
