import React from "react";
import { View, Text, StyleSheet } from "react-native";

type TipBoxProps = {
  title: string;
};

const TipBox: React.FC<TipBoxProps> = ({ title }) => {
  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipBoxText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tipBox: {
    width: "100%",
    padding: 20,
    backgroundColor: "#444",
    borderRadius: 10,
    // marginVertical: 10,
    marginTop: 23,
  },
  tipBoxText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TipBox;
