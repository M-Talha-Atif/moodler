// StatCard.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => {
  return (
    <View style={styles.card}>
      <Text variant="body" style={styles.title}>{title}</Text>
      <Text variant="header" style={styles.value}>{value}</Text>
      {subtitle && <Text variant="caption" style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    color: "#030303",
    marginBottom: 4,
  },
  value: {
    color: "#030303",
    marginBottom: 2,
  },
  subtitle: {
    color: "#555",
  },
});

export default StatCard;
