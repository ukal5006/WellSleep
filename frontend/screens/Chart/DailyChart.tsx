import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import useAxios from "../../hooks/useAxios";
import { DAILY } from "../../constants/apis";
import AreaChart from "./AreaChart";
import DonutChart from "./DonutChart";
import { StackParamList } from "../../types/navigation";
import { FONTS } from "../../constants/fonts";

interface SleepRecord {
  measureTime: string;
  illumination: number;
  humidity: number;
  temperature: number;
  noise: number;
  emg: number;
  o2: number;
  pulse: number;
  score: number;
}

interface DailyDataType {
  date: string;
  avg: number;
  sleepTime: number;
  realSleepTime: number;
  startTime: string;
  sleepRecord: SleepRecord[];
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

  const avgRounded = dailyData ? Math.floor(dailyData.avg) : 0;

  const formatTime = (timeStr: string, minutesToAdd: number): string => {
    const date = new Date(timeStr);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date.toISOString();
  };

  const processData = (rawData: DailyDataType): DailyDataType => {
    const processedSleepRecord = rawData.sleepRecord.map((record, index) => ({
      ...record,

      illumination: Math.floor(record.illumination),
      humidity: Math.floor(record.humidity),
      temperature: Math.floor(record.temperature),
      noise: Math.floor(record.noise),
      emg: Math.floor(record.emg),
      o2: Math.floor(record.o2),
      pulse: Math.floor(record.pulse),
      score: Math.floor(record.score),
      measureTime: formatTime(rawData.startTime, index * 10),
    }));

    return {
      ...rawData,
      avg: Math.floor(rawData.avg),
      sleepRecord: processedSleepRecord,
    };
  };

  useEffect(() => {
    if (data) {
      const processedData = processData(data as DailyDataType);
      setDailyData(processedData);
    }
  }, [data]);

  useEffect(() => {
    if (totalInformationId) {
      fetchDailyData(totalInformationId);
    }
  }, [totalInformationId]);

  const getEnvironmentData = (sleepRecord: SleepRecord[]) => {
    return sleepRecord.flatMap((record) => [
      {
        label: "수면 깊이",
        x: new Date(record.measureTime),
        y: record.score,
      },
      {
        label: "조도",
        x: new Date(record.measureTime),
        y: record.illumination,
      },
      {
        label: "습도",
        x: new Date(record.measureTime),
        y: record.humidity,
      },
      {
        label: "온도",
        x: new Date(record.measureTime),
        y: record.temperature,
      },
      {
        label: "소음",
        x: new Date(record.measureTime),
        y: record.noise,
      },
    ]);
  };

  const getBioData = (sleepRecord: SleepRecord[]) => {
    return sleepRecord.flatMap((record) => [
      {
        label: "수면 깊이",
        x: new Date(record.measureTime),
        y: record.score,
      },
      {
        label: "혈중 산소 포화",
        x: new Date(record.measureTime),
        y: record.o2,
      },
      {
        label: "심박수",
        x: new Date(record.measureTime),
        y: record.pulse,
      },
      {
        label: "근전도",
        x: new Date(record.measureTime),
        y: record.emg,
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../assets/backgroundImg.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View style={{ marginTop: 30, marginBottom: 30 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              textAlign: "center",
              fontFamily: FONTS.NotoSansKRBold,
              marginBottom: -20,
            }}
          >
            일별 수면 데이터
          </Text>

          {dailyData && (
            <>
              <AreaChart
                tabs={["수면 깊이", "조도", "습도", "온도", "소음"]}
                data={getEnvironmentData(dailyData.sleepRecord)}
              />
              <AreaChart
                tabs={["수면 깊이", "혈중 산소 포화", "심박수", "근전도"]}
                data={getBioData(dailyData.sleepRecord)}
              />

              <View
                style={{
                  alignItems: "center",
                  marginTop: 40,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: FONTS.NotoSansKRBold,
                    marginBottom: 0,
                  }}
                >
                  수면 점수
                </Text>

                <DonutChart value={avgRounded} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DailyChart;
