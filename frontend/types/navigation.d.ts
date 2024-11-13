// import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// export type StackParamList = {
//   Main: undefined;
//   Mypage: undefined; // Mypage
//   MainSleep: undefined; // 수면측정시작하는 메인페이지
//   Luck: undefined;
//   SleepLab: undefined;
//   Info: undefined;
//   MonthlyChart: undefined;
//   DailyChart: { totalInformationId: string };
// };

// export type MainNavigationProp = NativeStackNavigationProp<
//   StackParamList,
//   "Main"
// >;
// export type MypageNavigationProp = NativeStackNavigationProp<
//   StackParamList,
//   "Mypage"
// >;
// export type StackParamList = {
//   MonthlyChart: undefined;
//   DailyChart: { totalInformationId: string };
// };

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
  DailyChart: { totalInformationId: string }; // DailyChart 화면에 전달할 매개변수 포함
};

// 각 화면에서 사용할 네비게이션 Prop 타입 정의
export type MainNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Main"
>;
export type MypageNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Mypage"
>;
