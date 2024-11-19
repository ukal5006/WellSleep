import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// StackParamList 타입을 한 번만 정의
export type StackParamList = {
  Main: undefined;
  Mypage: undefined; // Mypage 화면
  MainSleep: undefined; // 수면 측정 시작 페이지
  Luck: undefined;
  SleepLab: undefined;
  Info: undefined;
  MonthlyChart: undefined;
  DailyChart: { totalInformationId: string };
  Solution: { totalInformationId: string };
};

export type MainNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Main"
>;
export type MypageNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Mypage"
>;
export type StackParamList = {
  MonthlyChart: undefined;
  DailyChart: { totalInformationId: string };
  Solution: { totalInformationId: string };
};
