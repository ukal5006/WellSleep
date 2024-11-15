import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ScrollView, Text, View, ImageBackground } from "react-native";
import useAxios from "../../hooks/useAxios";
import { DAILY, SOLUTION } from "../../constants/apis";
import AreaChart from "./AreaChart";
import DonutChart from "./DonutChart";
import Solution from "./Solution";
import Loading from "../../components/Loading";
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

interface SolutionDataType {
  totalInformationId: number;
  illumination: number;
  humidity: number;
  temperature: number;
  noise: number;
  solution: string;
}

const DailyChart = () => {
  const route = useRoute<RouteProp<StackParamList, "DailyChart">>();
  const totalInformationId = route.params?.totalInformationId;
  const [dailyData, setDailyData] = useState<DailyDataType | null>(null);
  const [solutionData, setSolutionData] = useState<SolutionDataType | null>(
    null
  );

  const {
    dataFetch: dataFetchDaily,
    data: dataDaily,
    loading: loadingDaily,
    error: errorDaily,
  } = useAxios();

  const {
    dataFetch: dataFetchSolution,
    data: dataSolution,
    loading: loadingSolution,
    error: errorSolution,
  } = useAxios();

  const fetchDailyData = async (id: string) => {
    const url = DAILY(id);
    await dataFetchDaily("GET", url);
  };

  const fetchSolutionData = async (id: string) => {
    const url = SOLUTION(id);
    await dataFetchSolution("GET", url);
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
    if (dataDaily) {
      const processedData = processData(dataDaily as DailyDataType);
      setDailyData(processedData);
    }
  }, [dataDaily]);

  useEffect(() => {
    if (dataSolution) {
      setSolutionData(dataSolution as SolutionDataType);
    }
  }, [dataSolution]);

  useEffect(() => {
    if (totalInformationId) {
      fetchDailyData(totalInformationId);
      fetchSolutionData(totalInformationId);
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

  if (loadingDaily || loadingSolution) {
    return (
      <ImageBackground
        source={require("../../assets/backgroundImg.png")}
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Loading />
      </ImageBackground>
    );
  }

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
            {dailyData
              ? `${parseInt(dailyData.date.slice(5, 7))}월 ${parseInt(
                  dailyData.date.slice(8)
                )}일 수면 데이터`
              : "수면 데이터"}
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

              <View
                style={{
                  marginTop: 50,
                  marginBottom: 40,
                  paddingTop: 20,
                  paddingBottom: 30,
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    fontFamily: FONTS.NotoSansKRBold,
                    marginTop: 10,
                    marginBottom: -30,
                  }}
                >
                  수면 솔루션
                </Text>
                <Solution solutionData={solutionData} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DailyChart;
