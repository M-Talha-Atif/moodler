// components/CustomTabBar.tsx
import React from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const TAB_BAR_HEIGHT = 70;
const { width } = Dimensions.get("window");

export default function CustomTabBar({ state, descriptors, navigation }: CustomTabBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        height: TAB_BAR_HEIGHT,
        backgroundColor: "#ffffff",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 8,
        paddingHorizontal: 20,
        alignItems: "center",
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Icon with your theme green
        const iconColor = isFocused ? "#10B981" : "#9CA3AF";
        const icon = options.tabBarIcon
          ? options.tabBarIcon({ color: iconColor, size: 24 })
          : null;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {icon}
            <Text style={{ color: iconColor, fontSize: 12, marginTop: 2, fontWeight: "600" }}>
              {options.title ?? route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
