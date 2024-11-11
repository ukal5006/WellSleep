import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Main from "../screens/Main";
import Mypage from "../screens/Mypage";
import MonthlyChart from "../screens/Chart/MonthlyChart";
import Exampage from "../screens/Exampage";

const Tab = createBottomTabNavigator();

function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#8B728F",
          borderTopWidth: 0,
          height: 70, // 탭 바의 높이 설정
        },
        tabBarLabelStyle: {
          color: "#ffffff", // 글씨 색상
          fontSize: 12, // 원하는 글씨 크기로 변경
          fontWeight: "bold", // 글씨 두께
        },
        tabBarItemStyle: {
          paddingVertical: 10, // 각 탭의 수직 패딩
        },
        tabBarActiveTintColor: "#FFFFFF", // 선택된 탭의 색상
        tabBarInactiveTintColor: "#C6BAC8", // 비활성 탭의 색상
        headerShown: false, // 모든 스크린에서 헤더를 숨기려면 추가
      }}
    >
      <Tab.Screen name="홈" component={Login} />
      <Tab.Screen name="수면일지" component={MonthlyChart} />
      <Tab.Screen name="알람" component={Exampage} />
      <Tab.Screen name="마이페이지" component={Mypage} />
    </Tab.Navigator>
  );
}

export default NavBar;
