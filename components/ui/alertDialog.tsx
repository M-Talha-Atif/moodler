import React from "react";
import { Modal, View, StyleSheet, ViewStyle } from "react-native";
import Button from "./button";
import { Text } from "./text";
import Separator from "./separator";

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  style?: ViewStyle;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  style,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.container, style]}>
          <Text variant="header" color="#030303" style={{ marginBottom: 8 }}>
            {title}
          </Text>
          <Text variant="body" color="#444" style={{ marginBottom: 20 }}>
            {message}
          </Text>

          <Separator orientation="horizontal" color="#E8E8E6" margin={8} />

          <View style={styles.buttonRow}>
            <Button
              title={cancelText}
              backgroundColor="#E8E8E6"
              textColor="#030303"
              onPress={onCancel}
              width="45%"
            />
            <Button
              title={confirmText}
              backgroundColor = "#030303"
              textColor="#FAFAF8"
              onPress={onConfirm}
              width="45%"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#FAFAF8",
    borderRadius: 16,
    padding: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default AlertDialog;
