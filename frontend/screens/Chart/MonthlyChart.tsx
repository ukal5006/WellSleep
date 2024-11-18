import React, { useEffect, useState } from "react";
import moment from "moment";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import useAxios from "../../hooks/useAxios";
import { MONTHLY } from "../../constants/apis";
import MyCalendar from "./MyCalendar";
import BarChart from "./BarChart";
import { YELLOW } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

type MonthlyDataType = {
  avg: number;
  date: string;
  isAlcohol: number;
  isCaffeine: number;
  realSleepTime: number;
  sleepTime: number;
  totalInformationId: number;
};

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyDataType[]>([]);
  const { dataFetch, data, loading, error } = useAxios();

  const fetchMonthlyData = async (month: string) => {
    const url = MONTHLY(month);
    try {
      await dataFetch("GET", url);
    } catch (err) {}
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const convertedData = (data as MonthlyDataType[]).map((record) => ({
        ...record,
        date: moment(record.date).subtract(1, "days").format("YYYY-MM-DD"),
        realSleepTime: record.realSleepTime / 60,
        sleepTime: record.sleepTime / 60,
      }));
      setMonthlyData(convertedData);
    } else {
      setMonthlyData([]);
    }
  }, [data]);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    fetchMonthlyData(currentMonth);
  }, []);

  const handleMonthChange = (newMonth: string) => {
    fetchMonthlyData(newMonth);
  };

  return (
    <ImageBackground
      source={require("../../assets/backgroundImg.png")}
      resizeMode="cover"
    >
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <MyCalendar data={monthlyData} onMonthChange={handleMonthChange} />

        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontFamily: FONTS.NotoSansKRBold,
              marginBottom: -20,
            }}
          >
            평균 점수
          </Text>
          <BarChart data={monthlyData} dataType="avg" />
        </View>

        <View style={{ marginTop: 40, marginBottom: 40 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontFamily: FONTS.NotoSansKRBold,
              marginBottom: -20,
            }}
          >
            실수면 시간
          </Text>
          <BarChart data={monthlyData} dataType="realSleepTime" />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: -20,
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
                  marginRight: 5,
                  opacity: 0.5,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 12,
                  fontFamily: FONTS.NotoSansKRLight,
                }}
              >
                총수면 시간
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: YELLOW,
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
                실수면 시간
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default MonthlyChart;
