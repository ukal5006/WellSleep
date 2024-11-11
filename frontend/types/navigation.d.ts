import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Main: undefined;
  Mypage: undefined; // Mypage
  Luck: undefined;
  SleepLab: undefined;
  Info: undefined;
  MonthlyChart: undefined;
  DailyChart: { totalInformationId: string };
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
};
