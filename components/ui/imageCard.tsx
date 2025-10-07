import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";

interface Tag {
  label: string;
  bgColor?: string;
  textColor?: string;
}

interface ImageCardProps {
  image: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  leftTag?: Tag;
  rightTag?: Tag;
  footerLeft?: string;
  footerRight?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  subtitle,
  leftTag,
  rightTag,
  footerLeft,
  footerRight,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={[styles.card, style]}>
        {/* Image with tags */}
        <View>
          <Image source={image} style={styles.image} resizeMode="cover" />
          {leftTag && (
            <View
              style={[
                styles.tag,
                { left: 10, backgroundColor: leftTag.bgColor || "#0066FF" },
              ]}
            >
              <Text
                style={{
                  color: leftTag.textColor || "#FAFAF8",
                  fontFamily: "Nunito",
                  fontSize: 12,
                }}
              >
                {leftTag.label}
              </Text>
            </View>
          )}
          {rightTag && (
            <View
              style={[
                styles.tag,
                { right: 10, backgroundColor: rightTag.bgColor || "#FF4D4D" },
              ]}
            >
              <Text
                style={{
                  color: rightTag.textColor || "#FAFAF8",
                  fontFamily: "Nunito",
                  fontSize: 12,
                }}
              >
                {rightTag.label}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {(footerLeft || footerRight) && (
            <View style={styles.footer}>
              {footerLeft && <Text style={styles.footerText}>{footerLeft}</Text>}
              {footerRight && (
                <Text style={styles.footerText}>• {footerRight}</Text>
              )}
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    backgroundColor: "#E8E8E6",
    overflow: "hidden",
    marginHorizontal: 24,
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 160,
  },
  tag: {
    position: "absolute",
    top: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 16,
    color: "#030303",
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    marginTop: 6,
  },
  footerText: {
    fontFamily: "Nunito",
    color: "#030303",
    fontSize: 13,
    marginRight: 6,
  },
});

export default ImageCard;
