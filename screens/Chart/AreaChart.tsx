import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

interface AreaChartProps {
  tabs: string[];
  data: { label: string; x: string; y: number }[];
}

const AreaChart: React.FC<AreaChartProps> = ({ tabs = [], data }) => {
  const [activeTab, setActiveTab] = useState(tabs[0] || "");
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    if (activeTab) {
      const filteredData = data
        .filter((item) => item.label === activeTab && !isNaN(item.y))
        .map((item) => ({
          x: item.x,
          y: item.y,
        }));
      setChartData(filteredData);
    }
  }, [activeTab, data]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 20,
        }}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            activeOpacity={1}
          >
            <Text
              style={{
                color:
                  activeTab === tab ? "#FFE770" : "rgba(255, 255, 255, 0.7)",
                fontWeight: activeTab === tab ? "bold" : "normal",
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <VictoryChart height={260} domain={{ y: [0, 100] }}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#FFE770" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#FFE770" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        <VictoryAxis
          tickFormat={(t, index) => (index % 6 === 0 ? t : "")}
          style={{
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: { stroke: "rgba(255, 255, 255, 0.2)", strokeDasharray: "3" },
          }}
        />
        <VictoryArea
          data={chartData}
          style={{
            data: { fill: "url(#grad)", stroke: "#FFE770", strokeWidth: 2 },
          }}
          interpolation="natural"
          animate={{ duration: 500, easing: "cubicInOut" }}
        />
      </VictoryChart>
    </View>
  );
};

export default AreaChart;
