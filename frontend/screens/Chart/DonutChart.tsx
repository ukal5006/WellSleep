import React from "react";
import { View, Text } from "react-native";
import { VictoryPie } from "victory-native";
import { PINK, YELLOW, PURPLE, NAVY } from "../../constants/colors";
import { useFonts } from "expo-font";
import { FONTS, FONT_IMPORTS } from "../../constants/fonts";

interface DonutChartProps {
  value: number;
}

function DonutChart({ value }: DonutChartProps) {
  const [fontsLoaded] = useFonts(FONT_IMPORTS);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{}}>
      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VictoryPie
          data={[
            { x: " ", y: value },
            { x: " ", y: 100 - value },
          ]}
          colorScale={[YELLOW, NAVY]}
          radius={90}
          innerRadius={60}
          startAngle={0}
          endAngle={360}
          animate={{
            duration: 500,
            easing: "cubicInOut",
          }}
          width={200}
          height={200}
        />
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 20,
            fontFamily: FONTS.NotoSansKRBold,
          }}
        >
          {value} 점
        </Text>
      </View>
    </View>
  );
}

export default DonutChart;
