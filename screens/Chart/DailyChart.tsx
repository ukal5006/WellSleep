import React from "react";
import { ScrollView, Text, View } from "react-native";
import AreaChart from "./AreaChart";
import DonutChart from "./DonutChart";
import Solution from "./Solution";

const DailyChart = () => {
  return (
    <ScrollView style={{ backgroundColor: "black", paddingHorizontal: 20 }}>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          11/13 수면 기록
        </Text>
        <AreaChart tabs={["수면깊이", "조도", "습도", "온도", "소음"]} />
        <AreaChart tabs={["혈중산소포화", "심박수", "근전도"]} />

        <DonutChart />

        <Solution />
      </View>
    </ScrollView>
  );
};

export default DailyChart;
