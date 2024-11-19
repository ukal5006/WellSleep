// components/LuckDate.tsx
import React from "react";
import { Text, StyleSheet } from "react-native";
import { FONTS } from "../constants/fonts";

const constellationDates: { [key: string]: string } = {
  물고기자리: "2/19 ~ 3/20",
  양자리: "3/21 ~ 4/19",
  황소자리: "4/20 ~ 5/20",
  쌍둥이자리: "5/21 ~ 6/21",
  게자리: "6/22 ~ 7/22",
  사자자리: "7/23 ~ 8/22",
  처녀자리: "8/23 ~ 9/22",
  천칭자리: "9/23 ~ 10/23",
  전갈자리: "10/24 ~ 11/22",
  사수자리: "11/23 ~ 12/21",
  염소자리: "12/22 ~ 1/19",
  물병자리: "1/20 ~ 2/18",
};

interface LuckDateProps {
  constellation: string;
}

const LuckDate: React.FC<LuckDateProps> = ({ constellation }) => {
  // 별자리 이름에 해당하는 날짜를 찾고 없으면 기본값으로 표시
  const dateRange = constellationDates[constellation] || "날짜 정보 없음";

  return <Text style={styles.dateText}>{dateRange}</Text>;
};

const styles = StyleSheet.create({
  dateText: {
    fontSize: 24,
    color: "#cb9c48",
    textAlign: "center",
    fontFamily: FONTS.NotoSerifKRRegular,
  },
});

export default LuckDate;
