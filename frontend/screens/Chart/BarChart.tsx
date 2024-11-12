import React from "react";
import { View } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryGroup,
} from "victory-native";

type BarChartProps = {
  data: any[];
  dataType: string;
};

const BarChart: React.FC<BarChartProps> = ({ data, dataType }) => {
  const isGrouped = dataType === "realSleepTime";
  const yDomain =
    dataType === "avg" ? { min: 0, max: 100 } : { min: 0, max: 10 };
  const yTickValues =
    dataType === "avg"
      ? [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const xTickValues = [1, 8, 15, 22, 29];

  const chartData = data.map((record) => ({
    day: new Date(record.date).getDate(),
    sleepTime: Number(record.sleepTime) || 0,
    realSleepTime: Number(record.realSleepTime) || 0,
    avg: Math.round(Number(record.avg)) || 0,
  }));

  console.log("Chart Data:", chartData);

  return (
    <View>
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
          style={{
            axis: { stroke: "transparent" },
            tickLabels: { fill: "white", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        {isGrouped ? (
          <VictoryGroup>
            <VictoryBar
              data={chartData}
              x="day"
              y="sleepTime"
              style={{
                data: { fill: "#FFE770", opacity: 0.5, width: 6 },
              }}
            />
            <VictoryBar
              data={chartData}
              x="day"
              y="realSleepTime"
              style={{
                data: { fill: "#FFE770", opacity: 1, width: 6 },
              }}
            />
          </VictoryGroup>
        ) : (
          <VictoryBar
            data={chartData}
            x="day"
            y="avg"
            style={{
              data: { fill: "#FFE770", width: 6 },
            }}
          />
        )}
      </VictoryChart>
    </View>
  );
};

export default BarChart;
