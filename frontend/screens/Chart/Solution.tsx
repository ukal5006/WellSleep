import React from "react";
import { View, Text } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";

const SolutionChart = () => {
  // TODO: 이후 API 연결
  const data = [
    { category: "조도", value: 20 },
    { category: "소음", value: 70 },
    { category: "습도", value: 100 },
    { category: "온도", value: 60 },
  ];

  const solution = "여기에 솔루션이 들어옵니다.";

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        수면 솔루션
      </Text>
      <VictoryChart domainPadding={{ y: 20 }} height={200} horizontal>
        <VictoryAxis
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#ffffff", fontSize: 12 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(tick) => `${tick}`}
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        <VictoryBar
          data={data}
          x="category"
          y="value"
          style={{ data: { fill: "#FFE770", width: 14 } }}
          animate={{ duration: 500, easing: "cubicInOut" }}
        />
      </VictoryChart>
      <Text style={{ color: "white", textAlign: "center" }}>{solution}</Text>
    </View>
  );
};

export default SolutionChart;
