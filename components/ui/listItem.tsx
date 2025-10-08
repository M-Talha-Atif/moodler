import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ListItemProps {
  title: string;
  subtitle?: string;
  icon?: any;
  image?: string;
  rightText?: string;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  icon,
  image,
  rightText,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Left Section */}
      <View style={styles.left}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : icon ? (
          <Ionicons name={icon} size={24} color="#030303" />
        ) : null}
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.right}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 16,
    color: "#030303",
    fontWeight: "600",
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#6b7280",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightText: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#6b7280",
    marginRight: 6,
  },
});

export default ListItem;
