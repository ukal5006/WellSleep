import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";
import useAxios from "../../hooks/useAxios";
import { DAILY } from "../../constants/apis";
import AreaChart from "./AreaChart";
import DonutChart from "./DonutChart";
import { StackParamList } from "../../types/navigation";

interface DailyDataType {
  date: string;
  avg: number;
  sleepTime: number;
  realSleepTime: number;
  sleepRecord: {
    measureTime: string;
    illumination: number;
    humidity: number;
    temperature: number;
    noise: number;
    emg: number;
    o2: number;
    pulse: number;
    score: number;
  }[];
}

const DailyChart = () => {
  const route = useRoute<RouteProp<StackParamList, "DailyChart">>();
  const totalInformationId = route.params?.totalInformationId;
  const [dailyData, setDailyData] = useState<DailyDataType | null>(null);
  const { dataFetch, data, loading, error } = useAxios();

  const fetchDailyData = async (id: string) => {
    const url = DAILY(id);
    await dataFetch("GET", url);
  };

  useEffect(() => {
    if (data) {
      console.log("API DATA:", data);
      setDailyData(data as DailyDataType);
    }
  }, [data]);

  useEffect(() => {
    if (totalInformationId) {
      fetchDailyData(totalInformationId);
    }
  }, [totalInformationId]);

  return (
    <ScrollView style={{ backgroundColor: "black", paddingHorizontal: 20 }}>
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
          일별 수면 데이터
        </Text>

        {dailyData && (
          <AreaChart
            tabs={["수면 깊이", "조도", "습도", "온도", "소음"]}
            data={dailyData.sleepRecord.flatMap((record) => [
              { label: "수면 깊이", x: record.measureTime, y: record.score },
              { label: "조도", x: record.measureTime, y: record.illumination },
              { label: "습도", x: record.measureTime, y: record.humidity },
              { label: "온도", x: record.measureTime, y: record.temperature },
              { label: "소음", x: record.measureTime, y: record.noise },
            ])}
          />
        )}

        {dailyData && (
          <AreaChart
            tabs={["혈중 산소 포화", "심박수", "근전도"]}
            data={dailyData.sleepRecord.flatMap((record) => [
              { label: "혈중 산소 포화", x: record.measureTime, y: record.o2 },
              { label: "심박수", x: record.measureTime, y: record.pulse },
              { label: "근전도", x: record.measureTime, y: record.emg },
            ])}
          />
        )}

        {dailyData && (
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            {/* <DonutChart value={dailyData.avg} /> */}
            <Text style={{ color: "white" }}>평균 수면 점수</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default DailyChart;
