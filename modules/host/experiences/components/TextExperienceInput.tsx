import React from "react";
import { View, StyleSheet } from "react-native";
import Input from "@/components/ui/input";

export default function TextExperienceInput({ text, onChange }: { text: string; onChange: (val: string) => void }) {
  return (
    <View style={styles.container}>
      <Input
        label="Your Experience"
        placeholder="Type your experience here..."
        multiline
        numberOfLines={6}
        value={text}
        onChangeText={onChange}
        backgroundColor="#EFEFE7"
        height={120}
        fontSize={14}
        borderRadius={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
