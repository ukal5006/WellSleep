import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import useAxios from "../../hooks/useAxios";
import { MONTHLY } from "../../constants/apis";
import MyCalendar from "./MyCalendar";
import BarChart from "./BarChart";

import { YELLOW } from "../../constants/colors";
import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "../../constants/fonts";

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const { dataFetch, data, loading, error } = useAxios();
  const [fontsLoaded] = useFonts(FONT_IMPORTS);

  const fetchMonthlyData = async (month: string) => {
    const url = MONTHLY(month);
    try {
      await dataFetch("GET", url);
      console.log("API OK");
    } catch (err) {
      console.error("API ERR", err);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data);
      setMonthlyData(data);
    } else {
      console.log(data);
      setMonthlyData([]);
    }
  }, [data]);

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    fetchMonthlyData(currentMonth);
  }, []);

  const handleMonthChange = (newMonth: string) => {
    console.log("월 변경:", newMonth);
    fetchMonthlyData(newMonth);
  };

  if (!fontsLoaded) {
    return null;
  }

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
              fontFamily: FONTS.NotoSerifKRBold,
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
              fontFamily: FONTS.NotoSerifKRBold,
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
