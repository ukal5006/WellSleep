import React from "react";
import { View } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryGroup,
} from "victory-native";

type BarChartProps = {
  dataType: string;
};

// TODO: 추후 API로 연결해서 바꾸기
const generateDummyData = (dataType: string, isGrouped: boolean = false) => {
  const data = Array.from({ length: 0 }, (_, i) => {
    const day = i + 1;
    if (isGrouped) {
      const actual = Math.floor(Math.random() * (480 - 180) + 180);
      const observed = actual + Math.floor(Math.random() * 180);
      return {
        day,
        observed,
        actual,
      };
    } else {
      return {
        day,
        value: Math.floor(Math.random() * 100) + 1,
      };
    }
  });
  return data;
};

const BarChart: React.FC<BarChartProps> = ({ dataType }) => {
  const isGrouped = dataType === "sleepTime";
  const yDomain =
    dataType === "score" ? { min: 0, max: 100 } : { min: 0, max: 600 };
  const yTickValues =
    dataType === "score"
      ? [0, 25, 50, 75, 100]
      : [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600];
  const xTickValues = [1, 8, 15, 22, 29];

  const data = generateDummyData(dataType, isGrouped);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
      }}
    >
      <VictoryChart height={300} domain={{ y: [yDomain.min, yDomain.max] }}>
        <VictoryAxis
          tickValues={xTickValues}
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "white", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={yTickValues}
          tickFormat={dataType === "sleepTime" ? (t) => t / 60 : undefined}
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "white", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        {isGrouped ? (
          <VictoryGroup>
            <VictoryBar
              data={data}
              x="day"
              y={(item) => item.actual ?? 0}
              style={{ data: { fill: "#FFE770", opacity: 1, width: 6 } }}
              animate={{ duration: 500, easing: "cubicInOut" }}
            />
            <VictoryBar
              data={data}
              x="day"
              y={(item) => item.observed ?? 0}
              style={{ data: { fill: "#FFE770", opacity: 0.5, width: 6 } }}
              animate={{ duration: 300, easing: "cubicInOut" }}
            />
          </VictoryGroup>
        ) : (
          <VictoryBar
            data={data}
            x="day"
            y={(item) => item.value ?? 0}
            style={{
              data: {
                fill: "#FFE770",
                width: 6,
              },
            }}
            animate={{ duration: 500, easing: "cubicInOut" }}
          />
        )}
      </VictoryChart>
    </View>
  );
};

export default BarChart;
