import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS } from "../../../constants/fonts";
const Tip: React.FC = () => {
  return (
    <ImageBackground
      source={require("../../../assets/blackmain.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Image
          source={require("../../../assets/constellation/fish.png")}
          style={styles.starimage}
        />

        <Text style={styles.starname}>물고기 자리</Text>
        <Text style={styles.stardate}>2/19 ~ 3/20</Text>
        <Text style={styles.content}>
          한 번 뜻을 정했으면, 그 길로 쭉 밀고 나가야 합니다. 어렵게 잡은 기회가
          있다면, 놓치지 않기 위해서라도 이 시기의 변화의 흐름을 놓치지 마세요.
          잦은 기회가 아니니 지금 물러서면 후회할 수 있으니 유념하세요. 이동수가
          있어요. 결정한 곳이 있다면 빨리 움직이는 것이 득이에요.번 뜻을
          정했으면, 그 길로 쭉 밀고 나가야 합니다. 어렵게 잡은 기회가 있다면,
          놓치지 않기 위해서라도 이 시기의 변화의 흐름을 놓치지 마세요. 잦은
          기회가 아니니 지금 물러서면 후회할 수 있으니 유념하세요. 이동수가
          있어요. 결정한 곳이 있다면 빨리 움직이는 것이 득이에요.번 뜻을
          정했으면, 그 길로 쭉 밀고 나가야 합니다. 어렵게 잡은 기회가 있다면,
          놓치지
        </Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  starname: {
    fontSize: 34,
    // fontWeight: "bold",
    color: "#cb9c48",
    marginTop: 50,
    textAlign: "center",
    fontFamily: FONTS.NotoSerifKRRegular, // 폰트 적용
  },
  stardate: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#cb9c48",
    marginTop: 1,
    textAlign: "center",
    fontFamily: FONTS.NotoSerifKRRegular, // 폰트 적용
  },
  content: {
    fontSize: 18,
    color: "#DDC99E",
    marginHorizontal: 29,
    marginTop: 32,
    marginBottom: 45,
    fontFamily: FONTS.NotoSerifKRRegular, // 폰트 적용
  },
  starimage: {
    width: 600,
    height: 362,
    alignSelf: "center",
    marginTop: 65,
  },
});

export default Tip;
