import React from "react";
import { View, Image, StyleSheet, ImageSourcePropType, Text } from "react-native";

interface AvatarProps {
  size?: number;
  source?: ImageSourcePropType | null; // image source (can be null)
  name?: string; // used for initials if no image
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const Avatar: React.FC<AvatarProps> = ({
  size = 56,
  source,
  name,
  backgroundColor = "#E8E8E6",
  textColor = "#030303",
  borderColor = "#D1D5DB",
  borderWidth = 1,
}) => {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "";

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          borderWidth,
          backgroundColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          resizeMode="cover"
        />
      ) : (
        <Text
          style={{
            fontFamily: "Nunito",
            color: textColor,
            fontSize: size * 0.4,
            fontWeight: "600",
          }}
        >
          {initials}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default Avatar;
