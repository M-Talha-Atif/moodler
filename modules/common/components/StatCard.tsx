import React from "react";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, colors }) => (
  <LinearGradient colors={colors} className="flex-1 rounded-2xl p-4 mx-1 shadow-sm">
    <Text className="text-white font-semibold text-sm mb-1">{title}</Text>
    <Text className="text-white text-lg font-bold">{value}</Text>
    {subtitle && <Text className="text-white/80 text-xs mt-1">{subtitle}</Text>}
  </LinearGradient>
);

export default StatCard;
