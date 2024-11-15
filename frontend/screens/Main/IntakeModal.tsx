import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ImageBackground,
  Animated,
  Image,
} from "react-native";
import { FONTS } from "../../constants/fonts";
import useAxios from "../../hooks/useAxios"; // 필요에 따라 경로 조정
import { INTAKE_SAVE } from "../../constants/apis"; // 필요에 따라 경로 조정
import { useNavigation } from "@react-navigation/native";

interface IntakeModalProps {
  visible: boolean;
  onClose: () => void;
  sleepId: number | null;
}

const IntakeModal: React.FC<IntakeModalProps> = ({
  visible,
  onClose,
  sleepId,
}) => {
  const { dataFetch, data } = useAxios();
  const [caffeineIntake, setCaffeineIntake] = useState(0); // 커피
  const [alcoholIntake, setAlcoholIntake] = useState(0); // 알코올
  const navigation = useNavigation();

  const opacityValue = useRef(new Animated.Value(0)).current;

  // 모달이 열릴 때 섭취량 초기화 및 애니메이션 설정
  useEffect(() => {
    if (visible) {
      setCaffeineIntake(0);
      setAlcoholIntake(0);
      // 모달이 열릴 때 점점 진해지는 애니메이션
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // 모달이 닫힐 때 점점 투명해지는 애니메이션
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  // 카페인 및 알코올 섭취 기록 저장 요청
  const saveIntakeRecord = async () => {
    if (sleepId === null) return;
    try {
      await dataFetch("POST", INTAKE_SAVE, {
        data: {
          id: sleepId,
          alcoholIntake,
          caffeineIntake,
        },
      });
      Alert.alert(
        "기록 저장",
        `카페인 : ${caffeineIntake} 알코올: ${alcoholIntake} `,
        [{ text: "확인", onPress: () => navigation.navigate("Sleeping") }]
      );
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("기록 저장 오류:", error);
      Alert.alert("오류", "기록 저장에 실패했습니다.");
    }
  };

  const handleConfirm = () => {
    // API 요청을 수행하고 모달을 닫기
    saveIntakeRecord();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { opacity: opacityValue }]}>
          <ImageBackground
            source={require("../../assets/modalstar.png")} // 배경 이미지 경로
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 200 }} // 모서리 둥글게
          >
            <Text style={styles.modalTitle}>오늘 카페인을 섭취하셨나요?</Text>

            {/* 커피 섭취량 조절 */}

            <Text style={styles.modalSubtitle}>커피</Text>

            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() =>
                  setCaffeineIntake((prev) => Math.max(0, prev - 1))
                }
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>

              <View style={styles.counterHeader}>
                <Text style={styles.counterValue}>{caffeineIntake}</Text>
                <Image
                  source={require("../../assets/coffee.png")} // 커피 아이콘 경로
                  style={styles.icon}
                />
              </View>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setCaffeineIntake((prev) => prev + 1)}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* 알코올 섭취량 조절 */}

            <Text style={styles.modalSubtitle}>알코올</Text>

            <View style={styles.counterContainer}>
              <TouchableOpacity
                style={styles.counterButton}
                onPress={() =>
                  setAlcoholIntake((prev) => Math.max(0, prev - 1))
                }
              >
                <Text style={styles.counterText}>-</Text>
              </TouchableOpacity>

              <View style={styles.counterHeader}>
                <Text style={styles.counterValue}>{alcoholIntake}</Text>
                <Image
                  source={require("../../assets/alcohol.png")} // 커피 아이콘 경로
                  style={styles.icon}
                />
              </View>

              <TouchableOpacity
                style={styles.counterButton}
                onPress={() => setAlcoholIntake((prev) => prev + 1)}
              >
                <Text style={styles.counterText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* 확인 버튼 */}
            <TouchableOpacity
              style={styles.modalConfirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.modalButtonText}>저장</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  modalContent: {
    backgroundColor: "#021228",
    padding: 30,
    borderRadius: 200,
    width: 360,
    height: 360,
    alignItems: "center",
    top: 210,
    left: 29,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginTop: 16,
    color: "#fff",
    fontFamily: FONTS.NotoSerifKRBold,
  },
  modalSubtitle: {
    fontSize: 15,
    color: "#fff",
    fontFamily: FONTS.NotoSerifKRRegular,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    paddingHorizontal: 45,
  },
  counterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
  },
  counterValue: {
    fontSize: 18,
    color: "#fff",
    fontFamily: FONTS.NotoSerifKRBold,
  },
  modalConfirmButton: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    paddingHorizontal: 20,
    borderColor: "#817C7C",
    borderWidth: 1,
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: FONTS.NotoSerifKRBold,
  },
  icon: {
    width: 25,
    height: 22,
  },
  counterHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default IntakeModal;
