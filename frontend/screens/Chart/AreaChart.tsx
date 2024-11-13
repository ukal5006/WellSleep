import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { VictoryChart, VictoryArea, VictoryAxis } from "victory-native";
import { Defs, LinearGradient, Stop } from "react-native-svg";
import { YELLOW } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

interface AreaChartProps {
  tabs: string[];
  data: { label: string; x: Date; y: number }[];
}

const AreaChart: React.FC<AreaChartProps> = ({ tabs = [], data }) => {
  const [activeTab, setActiveTab] = useState(tabs[0] || "");
  const [chartData, setChartData] = useState<{ x: Date; y: number }[]>([]);
  const [yDomain, setYDomain] = useState<[number, number]>([0, 100]);
  const [yTickValues, setYTickValues] = useState<number[]>([
    0, 25, 50, 75, 100,
  ]);

  useEffect(() => {
    if (activeTab) {
      const filteredData = data
        .filter((item) => item.label === activeTab && !isNaN(item.y))
        .map((item) => ({
          x: item.x,
          y: item.y,
        }));
      setChartData(filteredData);

      switch (activeTab) {
        case "조도":
          setYDomain([0, 20]);
          setYTickValues([0, 5, 10, 15, 20]);
          break;
        case "습도":
          setYDomain([0, 100]);
          setYTickValues([0, 25, 50, 75, 100]);
          break;
        case "온도":
          setYDomain([-10, 50]);
          setYTickValues([-10, 5, 20, 35, 50]);
          break;
        case "소음":
          setYDomain([0, 100]);
          setYTickValues([0, 25, 50, 75, 100]);
          break;
        case "근전도":
          setYDomain([0, 2000]);
          setYTickValues([0, 500, 1000, 1500, 2000]);
          break;
        case "혈중 산소 포화":
          setYDomain([60, 100]);
          setYTickValues([60, 70, 80, 90, 100]);
          break;
        case "심박수":
          setYDomain([30, 150]);
          setYTickValues([30, 60, 90, 120, 150]);
          break;
        case "수면 깊이":
          setYDomain([0, 100]);
          setYTickValues([0, 25, 50, 75, 100]);
          break;
        default:
          setYDomain([0, 100]);
          setYTickValues([0, 25, 50, 75, 100]);
      }
    }
  }, [activeTab, data]);

  const unitText = (() => {
    switch (activeTab) {
      case "조도":
        return "Lux";
      case "습도":
        return "%";
      case "소음":
        return "dB";
      case "근전도":
        return "EMG";
      case "혈중 산소 포화":
        return "%";
      case "심박수":
        return "BPM";
      case "온도":
        return "°C";
      default:
        return "점수";
    }
  })();

  const transformedData = chartData.map((point) => ({
    ...point,
    y0: yDomain[0],
    y: point.y,
  }));

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 20,
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 1,
            width: "100%",
            height: 1,
            backgroundColor: "white",
          }}
        />

        {tabs.map((tab) => (
          <View key={tab} style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => setActiveTab(tab)}
              activeOpacity={1}
            >
              <Text
                style={{
                  color:
                    activeTab === tab ? YELLOW : "rgba(255, 255, 255, 0.7)",
                  fontFamily:
                    activeTab === tab
                      ? FONTS.NotoSansKRBold
                      : FONTS.NotoSansKRLight,
                }}
              >
                {tab}
              </Text>
            </TouchableOpacity>

            {activeTab === tab && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: 3,
                  backgroundColor: YELLOW,
                  borderRadius: 1,
                }}
              />
            )}
          </View>
        ))}
      </View>

      <VictoryChart
        height={260}
        scale={{ x: "time" }}
        domain={{ y: yDomain }}
        padding={{ left: 50, right: 60, top: 20, bottom: 50 }}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop
              offset="0%"
              stopColor="#FFE770"
              stopOpacity="0.5
            "
            />
            <Stop offset="100%" stopColor="#FFE770" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        <VictoryAxis
          dependentAxis
          tickValues={yTickValues}
          style={{
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: {
              stroke: "rgba(255, 255, 255, 0.2)",
              strokeDasharray: "3, 3",
            },
            axis: { stroke: "rgba(255, 255, 255, 0.2)" },
          }}
        />

        <VictoryAxis
          axisValue={yDomain[0]}
          tickFormat={(t) => {
            const date = new Date(t);
            const hours = date.getHours().toString().padStart(2, "0");
            return `${hours}시`;
          }}
          style={{
            tickLabels: { fill: "#ffffff", fontSize: 12 },
            grid: {
              stroke: "rgba(255, 255, 255, 0.2)",
              strokeDasharray: "3, 3",
            },
            axis: { stroke: "rgba(255, 255, 255, 0.2)" },
          }}
        />

        <VictoryArea
          data={transformedData}
          style={{
            data: {
              fill: "url(#grad)",
              stroke: "#FFE770",
              strokeWidth: 2,
            },
          }}
          interpolation="monotoneX"
          animate={{ duration: 500, easing: "cubicInOut" }}
        />
      </VictoryChart>

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
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontFamily: FONTS.NotoSansKRLight,
            }}
          >
            세로축 단위: {unitText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AreaChart;
