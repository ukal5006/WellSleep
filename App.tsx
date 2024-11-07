import {
  getKeyHashAndroid,
  initializeKakaoSDK,
} from "@react-native-kakao/core";
import { login } from "@react-native-kakao/user";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import styled from "styled-components";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Exampage from "./screens/Exampage";

import Login from "./screens/Login";
import Main from "./screens/Main/Main";
import Tip from "./screens/Main/Tip";

const StyledText = styled(Text)`
  background-color: tomato;
`;

const Stack = createNativeStackNavigator();

export default function App() {
  const loginInfo = null;
  useEffect(() => {
    initializeKakaoSDK("c9f9a5b0717e5e19f774465dcb85522b");
    if (loginInfo === null) {
    }
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Example"
          component={Exampage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Main Screen" }}
        />
        <Stack.Screen
          name="Tip"
          component={Tip}
          options={{ title: "수면 지원 센터" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
