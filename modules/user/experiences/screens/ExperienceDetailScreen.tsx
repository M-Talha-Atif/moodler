// src/modules/user/experiences/screens/ExperienceDetailScreen.tsx
import React from "react";
import { View, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/button";
import IconCard from "@/components/ui/iconCard";
import Separator from "@/components/ui/separator";
import ChipSelector from "@/components/ui/chipSelector";
import { useExperienceDetail } from "../hooks/useExperienceDetail";
import { Ionicons } from "@expo/vector-icons";

export default function ExperienceDetailScreen() {
  const { experience, loading, bookingLoading, error, handleBooking, spotsLeft } =
    useExperienceDetail();
  
  console.log("here at detail screen")

  // Show loading indicator
  if (loading) {
    console.log("here at detail screen")
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#030303" />
        <Text style={styles.loadingText}>Loading experience...</Text>
      </View>
    );
  }

  // Show error message
  if (error) {
    console.log("here at error")
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={42} color="#030303" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Show error if no experience
  if (!experience) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="search-outline" size={42} color="#030303" />
        <Text style={styles.errorText}>Experience not found</Text>
      </View>
    );
  }



  const emotionTags = experience.emotions || [];
  const outcomeTags = experience.outcomes || [];
  const cultureTags = experience.culturalTags || [];


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <Image source={{ uri: experience.image }} style={styles.headerImage} resizeMode="cover" />

        <View style={styles.emotionIntro}>
          <Text variant="body" style={styles.feelText}>
            Feel {emotionTags.join(", ")} through this experience.
          </Text>
        </View>


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
          selectedColor="#E8E8E6"
          unselectedColor="#E8E8E6"
          selectedTextColor="#030303"
          textColor="#030303"
          borderRadius={12}
          spacing={6}
          containerStyle={{ marginHorizontal: 24 }}
        />

        {/* Separator */}
        <Separator color="#E8E8E6" thickness={1} margin={16} />


        {/* Key Info Section - Clean Two Rows */}
        <View style={styles.infoSection}>
          {/* Top Row: Spots & Date */}
          <View style={styles.topRow}>
            <Text style={styles.infoTextBold}>{spotsLeft} spots left</Text>
            <Separator orientation="vertical" color="#DADADA" thickness={1} style={styles.verticalSep} />
            <Text style={styles.infoText}>
              {new Date(experience.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Bottom Row: Location */}
          <View style={styles.bottomRow}>
            <Ionicons name="location-outline" size={16} color="#030303" style={{ marginRight: 4 }} />
            <Text style={styles.locationText} numberOfLines={1} ellipsizeMode="tail">
              {experience.location}
            </Text>
          </View>
        </View>




        {/* Emotions */}
        <View style={styles.section}>
          <Text variant="header">Emotions You’ll Feel</Text>
          <ChipSelector
            options={emotionTags}
            selectedColor="#E8E8E6"
            unselectedColor="#E8E8E6"
            selectedTextColor="#030303"
            textColor="#030303"
            borderRadius={12}
            spacing={6}
          />
        </View>

        {/* Outcomes */}
        <View style={styles.section}>
          <Text variant="header">Outcomes You’ll Gain</Text>
          <ChipSelector
            options={outcomeTags}
            selectedColor="#E8E8E6"
            unselectedColor="#E8E8E6"
            selectedTextColor="#030303"
            textColor="#030303"
            borderRadius={12}
            spacing={6}
          />
        </View>


        {/* Description */}
        <View style={styles.section}>
          <Text variant="header">About this experience</Text>
          <Text variant="body" style={styles.descriptionText}>
            {experience.description}
          </Text>
        </View>

        {cultureTags.length > 0 && (
          <View style={styles.section}>
            <Text variant="header">Cultural Vibes</Text>
            <ChipSelector
              options={cultureTags}
              selectedColor="#E8E8E6"
              unselectedColor="#E8E8E6"
              selectedTextColor="#030303"
              textColor="#030303"
              borderRadius={12}
              spacing={4}
            />
          </View>
        )}


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
  emotionIntro: {
    marginHorizontal: 24,
    marginTop: 16,
  },
  feelText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#1F2937",
    fontFamily: "Nunito",
  },

  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 24, marginTop: 16 },
  pricePill: { backgroundColor: "#E5E5E5", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  priceText: { color: "#030303", fontWeight: "700" },
  iconRow: { flexDirection: "row", marginHorizontal: 24, marginVertical: 16, alignItems: "center" },
  iconCard: { flexDirection: "column", alignItems: "center", padding: 12, borderRadius: 16 },
  infoSection: {
    backgroundColor: "#FAFAF8",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 24,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  verticalSep: {
    marginHorizontal: 10,
    height: 12,
  },

  infoText: {
    fontSize: 13,
    color: "#4B5563",
    fontFamily: "Nunito",
  },

  infoTextBold: {
    fontSize: 13,
    color: "#111827",
    fontFamily: "Nunito-Bold",
  },

  locationText: {
    fontSize: 13,
    color: "#111827",
    flexShrink: 1,
    fontFamily: "Nunito",
  },
  section: { marginHorizontal: 24, marginVertical: 16 },

  descriptionText: { marginTop: 6, color: "#555" },
  hostRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 12 },
  hostAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#E8E8E6" },
  bookingWrapper: { position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 24, paddingBottom: 12, backgroundColor: "transparent" },

    centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Nunito',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Nunito',
  },
});
