// src/modules/dailyCheckIn/components/MoodWheel.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from "react-native";
import { MotiView } from "moti";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Separator from "@/components/ui/separator";

const moods = [
  { 
    id: "3", 
    emotion: "Happy", 
    icon: (color: string, size: number) => (
      <FontAwesome5 name="laugh-beam" size={size} color={color} />
    )
  },
  { 
    id: "1", 
    emotion: "Disgusted", 
    icon: (color: string, size: number) => (
      <MaterialCommunityIcons name="emoticon-dead-outline" size={size} color={color} />
    )
  },
  { 
    id: "4", 
    emotion: "Neutral", 
    icon: (color: string, size: number) => (
      <Ionicons name="remove-outline" size={size} color={color} />
    )
  },
  { 
    id: "5", 
    emotion: "Sad", 
    icon: (color: string, size: number) => (
      <FontAwesome5 name="sad-tear" size={size} color={color} />
    )
  },
  { 
    id: "0", 
    emotion: "Angry", 
    icon: (color: string, size: number) => (
      <FontAwesome5 name="angry" size={size} color={color} />
    )
  },
  { 
    id: "2", 
    emotion: "Fearful", 
    icon: (color: string, size: number) => (
      <FontAwesome5 name="surprise" size={size} color={color} />
    )
  },
  { 
    id: "6", 
    emotion: "Surprised", 
    icon: (color: string, size: number) => (
      <FontAwesome5 name="surprise" size={size} color={color} />
    )
  },
];

export default function MoodWheel({ selected, onSelect }) {
  const width = Dimensions.get("window").width;
  const buttonSize = width > 480 ? 78 : 70;

  const topRow = moods.slice(0, 4);
  const bottomRow = moods.slice(4);

  const renderMoodButton = (mood, index) => {
    const active = selected?.id === mood.id;
    const iconColor = active ? "#EFEFE7" : "#030303";

    return (
      <MotiView
        key={mood.id}
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 60 }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelect(mood)}
          style={[
            styles.moodButton,
            {
              width: buttonSize,
              height: buttonSize,
              backgroundColor: active ? "#030303" : "#FFFFFF",
              borderColor: active ? "#030303" : "#E5E7EB",
              transform: [{ scale: active ? 1.05 : 1 }]
            },
          ]}
        >
          {mood.icon(iconColor, 28)}
          <Text
            style={[
              styles.label,
              { color: active ? "#EFEFE7" : "#030303" },
            ]}
          >
            {mood.emotion}
          </Text>
        </TouchableOpacity>
      </MotiView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select your current mood</Text>

      <View style={styles.row}>
        {topRow.map((mood, i) => renderMoodButton(mood, i))}
      </View>

      <Separator
        orientation="horizontal"
        thickness={1}
        color="#E5E7EB"
        length="90%"
        margin={20}
      />

      <View style={[styles.row, styles.bottomRow]}>
        {bottomRow.map((mood, i) => renderMoodButton(mood, i + 4))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    marginTop: 8,
  },
  heading: {
    fontFamily: "Nunito",
    fontWeight: "700",
    fontSize: 16,
    color: "#030303",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomRow: {
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  moodButton: {
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  label: {
    fontFamily: "Nunito",
    fontWeight: "600",
    fontSize: 12,
    marginTop: 6,
  },
});