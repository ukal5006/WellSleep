import React from "react";
import { View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { FONTS } from "../../constants/fonts";

interface SolutionDataType {
  totalInformationId: number;
  illumination: number;
  humidity: number;
  temperature: number;
  noise: number;
  solution: string | null;
}

interface SolutionProps {
  solutionData: SolutionDataType | null;
}

const SolutionChart: React.FC<SolutionProps> = ({ solutionData }) => {
  if (!solutionData) {
    return null;
  }

  const chartData = [
    { category: "조도", value: solutionData.illumination },
    { category: "소음", value: solutionData.noise },
    { category: "습도", value: solutionData.humidity },
    { category: "온도", value: solutionData.temperature },
  ];

  const solutionText = solutionData.solution
    ? solutionData.solution
    : "솔루션 데이터가 없습니다.";

  return (
    <View>
      <VictoryChart
        padding={{ left: 70, right: 80, top: 50, bottom: 40 }}
        height={200}
        horizontal
      >
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            tickLabels: {
              fill: "#ffffff",
              fontSize: 14,
              fontFamily: FONTS.NotoSansKRBold,
            },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" }, // X축의 점선 추가
          }}
        />
        <VictoryAxis
          dependentAxis
          domain={[0, 100]}
          tickFormat={(tick) => `${tick}`}
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" }, // Y축의 점선 추가
          }}
        />
        <VictoryBar
          data={chartData}
          x="category"
          y="value"
          style={{ data: { fill: "#FFE770", width: 14 } }}
          animate={{ duration: 500, easing: "cubicInOut" }}
        />
      </VictoryChart>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: -10,
          marginEnd: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 15,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontFamily: FONTS.NotoSansKRLight,
            }}
          >
            단위: 0-100점
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontFamily: FONTS.NotoSansKRRegular,
          color: "white",
          textAlign: "left",
          marginTop: 10,
          marginBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          lineHeight: 24,
        }}
      >
        {solutionText}
      </Text>
    </View>
  );
};

export default SolutionChart;
