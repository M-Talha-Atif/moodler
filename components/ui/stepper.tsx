import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface StepperProps {
  min?: number;
  max?: number;
  initial?: number;
  onChange?: (value: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ min = 0, max = 10, initial = 0, onChange }) => {
  const [count, setCount] = useState(initial);

  const increment = () => {
    if (count < max) {
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.btn, count === min && styles.disabled]} onPress={decrement}>
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>

      <Text style={styles.value}>{count}</Text>

      <TouchableOpacity style={[styles.btn, count === max && styles.disabled]} onPress={increment}>
        <Text style={styles.btnText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  btn: {
    backgroundColor: "#030303",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Nunito",
    fontSize: 20,
    fontWeight: "600",
  },
  value: {
    marginHorizontal: 12,
    fontFamily: "Nunito",
    fontSize: 18,
    color: "#030303",
    fontWeight: "600",
  },
  disabled: {
    backgroundColor: "#9ca3af",
  },
});

export default Stepper;
