// src/modules/user/experiences/screens/ExperienceDetailScreen.tsx
import React from "react";
import { View, ScrollView, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/ui/button";
import Separator from "@/components/ui/separator";
import ChipSelector from "@/components/ui/chipSelector";
import { useExperienceDetail } from "../hooks/useExperienceDetail";
import { Ionicons } from "@expo/vector-icons";

/**
 * ExperienceDetailScreen Component
 * 
 * Displays comprehensive details about a specific experience including:
 * - Hero image and emotional preview
 * - Key information (spots, date, location)
 * - Emotions, outcomes, and cultural vibes
 * - Host information
 * - Booking functionality
 * 
 * Design emphasizes visual hierarchy and premium feel with generous spacing
 * and card-based layouts for information grouping.
 */
export default function ExperienceDetailScreen() {
  const { experience, loading, bookingLoading, error, handleBooking, spotsLeft } =
    useExperienceDetail();

  /**
   * Loading State
   * Shows centered spinner with descriptive text
   */
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#030303" />
          <Text variant="body" style={styles.loadingText}>
            Loading experience...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Error State
   * Displays error message with appropriate icon
   */
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={48} color="#DC2626" />
          <Text variant="body" style={styles.errorText}>
            {error}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /**
   * Not Found State
   * Shows when experience ID doesn't match any existing experience
   */
  if (!experience) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Ionicons name="search-outline" size={48} color="#6B7280" />
          <Text variant="body" style={styles.errorText}>
            Experience not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Extract tags for display
  const emotionTags = experience.emotions || [];
  const outcomeTags = experience.outcomes || [];
  const cultureTags = experience.culturalTags || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image with Rounded Bottom Corners */}
        <Image
          source={{ uri: experience.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Content Container - All content in a card-like wrapper */}
        <View style={styles.contentWrapper}>

          {/* Emotional Preview Section */}
          {emotionTags.length > 0 && (
            <View style={styles.emotionPreview}>
              <Text variant="body" style={styles.emotionText}>
                Feel <Text style={styles.emotionHighlight}>{emotionTags.join(", ")}</Text> through this experience
              </Text>
            </View>
          )}

          {/* Title + Price Row */}
          <View style={styles.titleSection}>
            <Text variant="display" style={styles.title}>
              {experience.title}
            </Text>
            <View style={styles.priceBadge}>
              <Text variant="body" style={styles.priceText}>
                {experience.price === 0 ? "Free" : `$${experience.price}`}
              </Text>
            </View>
          </View>

          {/* Experience Type Chip */}
          <View style={styles.typeChipContainer}>
            <ChipSelector
              options={experience.isVirtual ? ["Virtual"] : ["In-Person"]}
              selectedColor="#030303"
              unselectedColor="#E8E8E6"
              selectedTextColor="#EFEFE7"
              textColor="#030303"
              borderRadius={20}
              spacing={6}
            />
          </View>

          <Separator color="#E8E8E6" thickness={1} margin={24} />

          {/* Key Information Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="people-outline" size={20} color="#030303" />
                <Text variant="body" style={styles.infoLabel}>
                  {spotsLeft} {spotsLeft === 1 ? 'spot' : 'spots'} left
                </Text>
              </View>

              <Separator
                orientation="vertical"
                color="#E8E8E6"
                thickness={1}
                style={styles.verticalDivider}
              />

              <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color="#030303" />
                <Text variant="body" style={styles.infoLabel}>
                  {new Date(experience.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
              </View>
            </View>

            <Separator color="#E8E8E6" thickness={1} margin={12} />

            {/* Experience Outcome Summary */}
            {experience.experienceOutcomeSummary && (
              <View style={styles.section}>
                <Text variant="header" style={styles.sectionTitle}>
                  Experience Outcome
                </Text>
                <Text variant="body" style={styles.descriptionText}>
                  {experience.experienceOutcomeSummary}
                </Text>
              </View>
            )}


            <Separator color="#E8E8E6" thickness={1} margin={12} />


            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={20} color="#030303" />
              <Text variant="body" style={styles.locationText} numberOfLines={2}>
                {experience.location}
              </Text>
            </View>
          </View>

          {/* Emotions Section */}
          {emotionTags.length > 0 && (
            <View style={styles.section}>
              <Text variant="header" style={styles.sectionTitle}>
                Emotions You'll Experience
              </Text>
              <Text variant="caption" style={styles.sectionSubtitle}>
                Feel connected to these powerful emotions
              </Text>
              <View style={styles.chipWrapper}>
                <ChipSelector
                  options={emotionTags}
                  selectedColor="#FEF3C7"
                  unselectedColor="#FEF3C7"
                  selectedTextColor="#92400E"
                  textColor="#92400E"
                  borderRadius={16}
                  spacing={8}
                />
              </View>
            </View>
          )}


          {/* Outcomes Section */}
          {outcomeTags.length > 0 && (
            <View style={styles.section}>
              <Text variant="header" style={styles.sectionTitle}>
                What You'll Gain
              </Text>
              <Text variant="caption" style={styles.sectionSubtitle}>
                Personal growth and meaningful outcomes
              </Text>
              <View style={styles.chipWrapper}>
                <ChipSelector
                  options={outcomeTags}
                  selectedColor="#DBEAFE"
                  unselectedColor="#DBEAFE"
                  selectedTextColor="#1E40AF"
                  textColor="#1E40AF"
                  borderRadius={16}
                  spacing={8}
                />
              </View>
            </View>
          )}

          {/* Description Section */}
          <View style={styles.section}>
            <Text variant="header" style={styles.sectionTitle}>
              About This Experience
            </Text>
            <Text variant="body" style={styles.descriptionText}>
              {experience.description}
            </Text>
          </View>

          {/* Cultural Vibes Section */}
          {cultureTags.length > 0 && (
            <View style={styles.section}>
              <Text variant="header" style={styles.sectionTitle}>
                Cultural Vibes
              </Text>
              <Text variant="caption" style={styles.sectionSubtitle}>
                Immerse yourself in these cultural elements
              </Text>
              <View style={styles.chipWrapper}>
                <ChipSelector
                  options={cultureTags}
                  selectedColor="#E9D5FF"
                  unselectedColor="#E9D5FF"
                  selectedTextColor="#6B21A8"
                  textColor="#6B21A8"
                  borderRadius={16}
                  spacing={8}
                />
              </View>
            </View>
          )}

          {/* Host Section */}
          <View style={styles.hostSection}>
            <Text variant="header" style={styles.sectionTitle}>
              Your Host
            </Text>
            <View style={styles.hostCard}>
              <Image
                source={{ uri: experience.host.avatarUrl || undefined }}
                style={styles.hostAvatar}
              />
              <View style={styles.hostInfo}>
                <Text variant="body" style={styles.hostName}>
                  {experience.host.name}
                </Text>
                <Text variant="caption" color="#6B7280">
                  Experience Creator
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Booking Button */}
      <SafeAreaView edges={["bottom"]} style={styles.bookingContainer}>
        <View style={styles.bookingWrapper}>
          <Button
            title={experience.isBooked ? "View Booking" : "Book This Experience"}
            onPress={handleBooking}
            backgroundColor="#030303"
            textColor="#EFEFE7"
            width="100%"
            height={54}
            fontSize={16}
            fontWeight="700"
            borderRadius={16}
            disabled={bookingLoading}
            loading={bookingLoading}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 140
  },

  // Hero Image
  heroImage: {
    width: "100%",
    height: 280,
    backgroundColor: "#E8E8E6",
  },

  // Content Wrapper
  contentWrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 24,
    paddingHorizontal: 20,
  },

  // Emotion Preview
  emotionPreview: {
    marginBottom: 20,
  },
  emotionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
    fontFamily: "Nunito",
  },
  emotionHighlight: {
    fontFamily: "Nunito-Bold",
    color: "#030303",
  },

  // Title Section
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 16,
  },
  title: {
    flex: 1,
    lineHeight: 38,
  },
  priceBadge: {
    backgroundColor: "#030303",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: "center",
  },
  priceText: {
    color: "#EFEFE7",
    fontWeight: "700",
    fontSize: 16,
  },

  // Type Chip
  typeChipContainer: {
    marginBottom: 8,
  },

  // Info Card
  infoCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E8E8E6",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: "#030303",
    fontFamily: "Nunito-SemiBold",
  },
  verticalDivider: {
    height: 24,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#030303",
    flex: 1,
    fontFamily: "Nunito",
  },

  // Sections
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 6,
    color: "#030303",
  },
  sectionSubtitle: {
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 20,
  },
  chipWrapper: {
    marginTop: 4,
  },
  descriptionText: {
    marginTop: 12,
    color: "#4B5563",
    lineHeight: 24,
  },

  // Host Section
  hostSection: {
    marginBottom: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E8E8E6",
  },
  hostCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E8E8E6",
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E8E8E6",
    marginRight: 16,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontFamily: "Nunito-Bold",
    marginBottom: 4,
  },

  // Booking Button
  bookingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E6",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -4 },
    elevation: 10,
  },
  bookingWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },

  // Center Container (Loading/Error States)
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAF8',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  errorText: {
    marginTop: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});