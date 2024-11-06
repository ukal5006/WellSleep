import React from "react";
import { View, Text } from "react-native";
import { VictoryPie } from "victory-native";

function DonutChart() {
  // TODO: 이후 API 연결
  const score = 60;

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        paddingVertical: 20,
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        수면 점수
      </Text>

      <View
        style={{
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <VictoryPie
          data={[
            { x: " ", y: score },
            { x: " ", y: 100 - score },
          ]}
          colorScale={["#FFE770", "rgba(255, 255, 255, 0.3)"]}
          radius={90}
          innerRadius={70}
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
            fontWeight: "bold",
          }}
        >
          {score} 점
        </Text>
      </View>
    </View>
  );
}

export default DonutChart;
