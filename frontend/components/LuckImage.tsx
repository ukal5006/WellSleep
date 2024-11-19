// components/LuckImage.tsx
import React from "react";
import { Image, StyleSheet } from "react-native";

// 각 별자리 이름에 맞는 이미지 경로를 정의 (한글 별자리 이름 사용)
const constellationImages: { [key: string]: any } = {
  물고기자리: require("../assets/constellation/Pisces.png"),
  양자리: require("../assets/constellation/Aries.png"),
  황소자리: require("../assets/constellation/Taurus.png"),
  쌍둥이자리: require("../assets/constellation/Gemini.png"),
  게자리: require("../assets/constellation/Cancer.png"),
  사자자리: require("../assets/constellation/Leo.png"),
  처녀자리: require("../assets/constellation/Virgo.png"),
  천칭자리: require("../assets/constellation/Libra.png"),
  전갈자리: require("../assets/constellation/Scorpio.png"),
  사수자리: require("../assets/constellation/Sagittarius.png"),
  염소자리: require("../assets/constellation/Capricorn.png"),
  물병자리: require("../assets/constellation/Aquarius.png"),
};

interface LuckImageProps {
  constellation: string;
}

const LuckImage: React.FC<LuckImageProps> = ({ constellation }) => {
  // 별자리 이름에 해당하는 이미지 경로를 가져오기
  const imageSource = constellationImages[constellation] || null;

  if (!imageSource) return null; // 이미지가 없으면 null을 반환하여 렌더링하지 않음

  return (
    <Image source={imageSource} style={styles.image} resizeMode="contain" />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 362,
    alignSelf: "center",
    marginTop: 65,
  },
});

export default LuckImage;
