import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { FONTS } from "../../../constants/fonts";

import useAxios from "../../../hooks/useAxios";
import { CONSTELLATION } from "../../../constants/apis";
import LuckImage from "../../../components/LuckImage";
import LuckDate from "../../../components/LuckDate";

interface ConstellationDataType {
  id: number;
  constellation: string;
  fortune: string;
}

const Luck: React.FC = () => {
  const [constellationData, setConstellationData] =
    useState<ConstellationDataType | null>(null);
  const { dataFetch, data, loading, error } = useAxios();

  // 별자리 조회
  const fetchConstellationData = async () => {
    await dataFetch("GET", CONSTELLATION, {
      headers: {
        Authorization: "{accessToken}",
        RefreshToken: "{refreshToken}",
      },
    });
  };

  useEffect(() => {
    if (data) {
      console.log("Constellation Data:", data);
      setConstellationData(data as ConstellationDataType);
    }
  }, [data]);

  useEffect(() => {
    fetchConstellationData();
  }, []);

  return (
    <ImageBackground
      source={require("../../../assets/blackmain.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {constellationData && (
          <>
            <LuckImage constellation={constellationData.constellation} />
            <Text style={styles.starname}>
              {constellationData.constellation}
            </Text>
            <LuckDate constellation={constellationData.constellation} />
            <Text style={styles.content}>{constellationData.fortune}</Text>
          </>
        )}
        {!constellationData && !loading && (
          <Text style={styles.content}>별자리 정보를 불러오는 중입니다...</Text>
        )}
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
    color: "#cb9c48",
    marginTop: 50,
    textAlign: "center",
    fontFamily: FONTS.NotoSerifKRRegular, // 폰트 적용
  },
  stardate: {
    fontSize: 24,
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

export default Luck;
