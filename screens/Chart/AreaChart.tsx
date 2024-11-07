import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";

// TODO: 이후 API 연결
const generateDummyData = (type: string) => {
  return Array.from({ length: 30 }, (_, i) => ({
    x: `${23 + Math.floor(i / 6)}:${(i % 6) * 10 === 0 ? "00" : (i % 6) * 10}`,
    y: Math.floor(Math.random() * (80 - 20 + 1)) + 20,
  }));
};

const AreaChart = ({ tabs = [] }: { tabs: string[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0] || "");
  const [data, setData] = useState<{ x: string; y: number }[]>([]);

  useEffect(() => {
    if (activeTab) {
      setData(generateDummyData(activeTab));
    }
  }, [activeTab]);

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
          data={data}
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
