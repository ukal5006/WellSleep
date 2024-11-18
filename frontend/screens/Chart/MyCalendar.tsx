import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParamList } from "../../types/navigation";
import moment from "moment";
import { NAVY, PURPLE, YELLOW, PINK } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

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

  const [currentMonth, setCurrentMonth] = useState<number>(
    moment().month() + 1
  );

  useEffect(() => {
    if (data) {
      const transformedData: MarkedDatesType = data.reduce(
        (acc: MarkedDatesType, record: DataRecord) => {
          acc[record.date] = {
            dots: [
              record.isAlcohol > 0 ? { key: "alcohol", color: YELLOW } : null,
              record.isCaffeine > 0 ? { key: "caffeine", color: PINK } : null,
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

  const hasDataForDate = (dateString: string): boolean => {
    return data.some((record) => record.date === dateString);
  };

  const onDatePress = (dateString: string) => {
    const selectedRecord = data.find((record) => record.date === dateString);
    if (selectedRecord) {
      navigation.navigate("DailyChart", {
        totalInformationId: selectedRecord.totalInformationId.toString(),
      });
    }
  };

  const handleMonthChange = (month: { year: number; month: number }) => {
    const newMonth = `${month.year}-${String(month.month).padStart(2, "0")}`;
    onMonthChange(newMonth);
    setCurrentMonth(month.month);
  };

  const renderDayComponent = ({ date }: { date: CalendarDate }) => {
    const isToday = date.dateString === today;
    const hasRecord = !isToday && hasDataForDate(date.dateString);
    const dateData = markedDates[date.dateString];

    const isCurrentMonth = date.month === currentMonth;

    const backgroundColor =
      date.dateString === today
        ? "white"
        : hasRecord && dateData?.avg !== undefined
        ? PURPLE
        : "transparent";

    return (
      <TouchableOpacity
        onPress={() => (hasRecord ? onDatePress(date.dateString) : null)}
        disabled={!hasRecord}
      >
        <View
          style={{
            alignItems: "center",
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color:
                date.dateString === today
                  ? NAVY
                  : isCurrentMonth
                  ? "white"
                  : PURPLE,
            }}
          >
            {date.day}
          </Text>

          {/* 데이터가 있는 경우에만 평균 점수 표시 */}
          {hasRecord && dateData?.avg !== undefined && (
            <Text style={{ color: "white", fontSize: 12 }}>{dateData.avg}</Text>
          )}

          {/* 알콜/카페인 도트 표시 */}
          <View style={{ flexDirection: "row", marginTop: 2 }}>
            {dateData?.dots.map((dot, index) => (
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
    );
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
        dayComponent={renderDayComponent}
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
