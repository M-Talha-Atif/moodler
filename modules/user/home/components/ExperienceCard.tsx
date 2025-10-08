import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MotiView } from "moti";
import Button from "@/modules/common/components/Button";
import { Experience } from "../services/homeService";

interface ExperienceCardProps {
  experience: Experience;
  onJoin: (experience: Experience) => void;
}

export default function ExperienceCard({ experience, onJoin }: ExperienceCardProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 6 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 250 }}
      style={styles.card}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: experience.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>{experience.title}</Text>

        {/* Subtext */}
        {experience.targetEmotions?.[0] && (
          <Text style={styles.subtitle}>
            Crafted to lift you when you feel{" "}
            {experience.targetEmotions[0].toLowerCase()}.
          </Text>
        )}

        {/* Price + CTA */}
        <View style={styles.bottomRow}>
          <View style={styles.pricePill}>
            <Text style={styles.priceText}>
              {experience.price === 0 ? "Free" : `$${experience.price}`}
            </Text>
          </View>
          <Button
            variant="primary"
            title="Join"
            onPress={() => onJoin(experience)}
            style={styles.joinButton}
          />
        </View>
      </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FAFAF8", // consistent with mood/streak
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
    overflow: "hidden",
    marginBottom: 16,
  },
  imageContainer: {
    height: 140,
    width: "100%",
    backgroundColor: "#E8E8E6",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontFamily: "Nunito",
    fontSize: 16,
    color: "#030303",
    marginBottom: 6,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: "Nunito",
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
    marginBottom: 18,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pricePill: {
    borderWidth: 1,
    borderColor: "#030303",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priceText: {
    fontFamily: "Nunito",
    fontSize: 13,
    fontWeight: "600",
    color: "#030303",
  },
  joinButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
});
