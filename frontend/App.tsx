import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainSleep from "./screens/Main/MainSleep";
import Luck from "./screens/Mypage/Luck";
import SleepLab from "./screens/Mypage/SleepLab";
import Info from "./screens/Mypage/Info";
import MonthlyChart from "./screens/Chart/MonthlyChart";
import DailyChart from "./screens/Chart/DailyChart";
import { StackParamList } from "./types/navigation";
import Tip from "./screens/Main/Tip";
import { Provider } from "react-redux";
import store from "./store/store";
import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "./constants/fonts";

// Stack 네비게이터 생성
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts(FONT_IMPORTS);

  // if (!fontsLoaded) {
  //     return null; // 폰트가 로드될 때까지 빈 화면을 표시
  // }

  const loginInfo = null;
  useEffect(() => {
    initializeKakaoSDK("c9f9a5b0717e5e19f774465dcb85522b");
    if (loginInfo === null) {
      // 로그인 정보가 없을 때의 처리
    }
  }, []); // 의존성 배열 추가

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          backgroundColor="#001234"
          barStyle="light-content"
          animated={true}
        />
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={NavBar} />
          {/* <Stack.Screen name="History" component={Exampage} options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="Alarm" component={Exampage} options={{ headerShown: false }} /> */}
          <Stack.Screen name="MainSleep" component={MainSleep} />
          {/* MainSleep 화면 */}
          <Stack.Screen name="Luck" component={Luck} />
          <Stack.Screen name="SleepLab" component={SleepLab} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="MonthlyChart" component={MonthlyChart} />
          <Stack.Screen name="DailyChart" component={DailyChart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
