import React, { useState } from "react";
import { TouchableOpacity, Animated, View, Text, StyleSheet } from "react-native";

interface ToggleSwitchProps {
  label?: string;
  initial?: boolean;
  onToggle?: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, initial = false, onToggle }) => {
  const [isOn, setIsOn] = useState(initial);
  const offset = new Animated.Value(initial ? 20 : 0);

  const toggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    Animated.timing(offset, {
      toValue: newState ? 20 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    onToggle?.(newState);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity onPress={toggle} activeOpacity={0.8}>
        <View
          style={[
            styles.track,
            { backgroundColor: isOn ? "#030303" : "#d1d5db" },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: offset }] },
            ]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 10 },
  label: {
    fontFamily: "Nunito",
    color: "#030303",
    fontSize: 16,
    fontWeight: "600",
  },
  track: {
    width: 50,
    height: 28,
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
  },
});

export default ToggleSwitch;
