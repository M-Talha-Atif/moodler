// src/modules/user/experiences/screens/ExperienceDetailScreen.tsx
import React from "react";
import { View, ScrollView, Image, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";
import IconCard from "@/components/ui/iconCard";
import Separator from "@/components/ui/separator";
import ChipSelector from "@/components/ui/chipSelector";
import { useExperienceDetail } from "../hooks/useExperienceDetail";
import { Ionicons } from "@expo/vector-icons";

export default function ExperienceDetailScreen() {
  const { experience, loading, bookingLoading, error, handleBooking, spotsLeft } =
    useExperienceDetail();

  if (loading || error || !experience) return null;

  // Dummy emotion tags for now
  const emotionTags = ["Relaxing", "Exciting", "Mindful"];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Image source={{ uri: experience.image }} style={styles.headerImage} resizeMode="cover" />

        {/* Title + Price */}
        <View style={styles.titleRow}>
          <Text variant="display" style={{ flex: 1 }}>
            {experience.title}
          </Text>
          <View style={styles.pricePill}>
            <Text variant="body" style={styles.priceText}>
              {experience.price === 0 ? "Free" : `$${experience.price}`}
            </Text>
          </View>
        </View>

        {/* Virtual / In-person */}
        <ChipSelector
          options={experience.isVirtual ? ["Virtual"] : ["In-Person"]}
          selectedColor="#030303"
          unselectedColor="#E8E8E6"
          selectedTextColor="#EFEFE7"
          textColor="#030303"
          borderRadius={12}
          spacing={6}
          containerStyle ={ { marginHorizontal: 24}}
        />

        {/* Separator */}
        <Separator color="#E8E8E6" thickness={1} margin={16} />

        {/* Key Info Row - Simplified */}
        {/* Key Info Section - Two Rows */}
        <View style={styles.infoSection}>
          {/* Top Row: Spots & Date */}
          <View style={styles.topRow}>
            <Text variant="micro">{spotsLeft} spots left</Text>
            <Separator orientation="vertical" color="#E8E8E6" thickness={1} style={styles.verticalSep} />
            <Text variant="micro">
              {new Date(experience.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </Text>
          </View>

          {/* Bottom Row: Location */}
          <View style={styles.bottomRow}>
            <Ionicons name="location" size={16} color="#030303" style={{ marginRight: 6 }} />
            <Text variant="micro" numberOfLines={1} ellipsizeMode="tail">
              {experience.location}
            </Text>
          </View>
        </View>



        {/* Emotion Tags */}
        <View style={styles.section}>
          <Text variant="header">Why is this for me?</Text>
          <ChipSelector
            options={emotionTags}
            selectedColor="#030303"
            unselectedColor="#E8E8E6"
            selectedTextColor="#EFEFE7"
            textColor="#030303"
            borderRadius={12}
            spacing={2}
          />
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text variant="header">About this experience</Text>
          <Text variant="body" style={styles.descriptionText}>
            {experience.description}
          </Text>
        </View>

        {/* Host Info */}
        <View style={styles.section}>
          <Text variant="header">Hosted by</Text>
          <View style={styles.hostRow}>
            <Image source={{ uri: experience.host.avatarUrl || undefined }} style={styles.hostAvatar} />
            <Text variant="body">{experience.host.name}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Booking Button */}
      <SafeAreaView edges={["bottom"]} style={styles.bookingWrapper}>
        <Button
          title={experience.isBooked ? "View Booking" : "Book Now"}
          onPress={handleBooking}
          backgroundColor="#030303"
          textColor="#EFEFE7"
          width="100%"
          height={50}
          fontSize={16}
          fontWeight="700"
          borderRadius={12}
          disabled={bookingLoading}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAFAF8" },
  scrollContent: { paddingBottom: 120 },
  headerImage: { width: "100%", height: 220, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginTop: 16 },
  pricePill: { backgroundColor: "#E5E5E5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  priceText: { color: "#030303", fontWeight: "700" },
  iconRow: { flexDirection: "row", marginHorizontal: 24, marginVertical: 16, alignItems: "center" },
  iconCard: { flexDirection: "column", alignItems: "center", padding: 12, borderRadius: 16 },
  infoSection: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  topText:{
      fontWeight: "600",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 32,
    gap: 12,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  verticalSep: {
    marginHorizontal: 6,
    alignSelf: "stretch",
  },

  section: { marginHorizontal: 24, marginVertical: 12 },
  descriptionText: { marginTop: 6, color: "#555" },
  hostRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 },
  hostAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E8E8E6" },
  bookingWrapper: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingBottom: 12, backgroundColor: "transparent" },
});
