// IntakeModal.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

interface IntakeModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (caffeine: number, alcohol: number) => void;
}

const IntakeModal: React.FC<IntakeModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [caffeine, setCaffeine] = useState(0); // 커피 섭취량
  const [alcohol, setAlcohol] = useState(0); // 알코올 섭취량

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            카페인과 알코올 섭취량을 설정하세요
          </Text>

          {/* 커피 섭취량 조절 */}
          <Text style={styles.modalSubtitle}>커피</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCaffeine(Math.max(0, caffeine - 1))}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{caffeine}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setCaffeine(caffeine + 1)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* 알코올 섭취량 조절 */}
          <Text style={styles.modalSubtitle}>알코올</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setAlcohol(Math.max(0, alcohol - 1))}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{alcohol}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setAlcohol(alcohol + 1)}
            >
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* 확인 버튼 */}
          <TouchableOpacity
            style={styles.modalConfirmButton}
            onPress={() => {
              onConfirm(caffeine, alcohol);
              onClose();
            }}
          >
            <Text style={styles.modalButtonText}>알람 설정 완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#211C52",
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#211C52",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  counterButton: {
    backgroundColor: "#211C52",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  counterText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  modalConfirmButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default IntakeModal;
