import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import useAxios from "../../hooks/useAxios";
import { MONTHLY } from "../../constants/apis";
import MyCalendar from "./MyCalendar";
import BarChart from "./BarChart";

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const { dataFetch, data, loading, error } = useAxios();

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

  return (
    <ScrollView style={{ backgroundColor: "black", paddingHorizontal: 20 }}>
      <MyCalendar data={monthlyData} onMonthChange={handleMonthChange} />

      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          평균 점수
        </Text>
        <BarChart data={monthlyData} dataType="avg" />
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          실수면 시간
        </Text>
        <BarChart data={monthlyData} dataType="realSleepTime" />
      </View>
    </ScrollView>
  );
};

export default MonthlyChart;
