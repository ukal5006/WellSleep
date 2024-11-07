import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackParamList = {
    Main: undefined;
    Mypage: undefined; // Mypage
    Luck: undefined;
    SleepLab: undefined;
    Info: undefined;
};

export type MainNavigationProp = NativeStackNavigationProp<StackParamList, 'Main'>;
export type MypageNavigationProp = NativeStackNavigationProp<StackParamList, 'Mypage'>;
