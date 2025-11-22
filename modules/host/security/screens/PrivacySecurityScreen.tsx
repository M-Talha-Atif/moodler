// src/modules/user/security/screens/PrivacySecurityScreen.tsx
import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import Header from "@/modules/common/Header";
import Separator from "@/components/ui/separator";
import Logo from "@/assets/images/logo.svg";
import SecurityFeatureCard from "../components/SecurityFeatureCard";
import PrivacySettingItem from "../components/PrivacySettingItem";

/**
 * PrivacySecurityScreen Component
 * 
 * Comprehensive privacy and security settings for users.
 * Emphasizes end-to-end encryption for all user data including:
 * - Mood tracking and emotional data
 * - Experience bookings and interactions
 * - Personal information and preferences
 * - Host-created experiences and content
 * 
 * Product-oriented design with clear value propositions and visual hierarchy.
 */
export default function PrivacySecurityScreen() {
  // Privacy settings state
  const [settings, setSettings] = useState({
    profileVisibility: true,
    activityStatus: true,
    dataCollection: false,
    marketingEmails: false,
  });

  /**
   * Toggle privacy setting
   */
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Privacy & Security" showBackButton={true} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Trust Banner with Logo */}
        <View style={styles.trustBanner}>
          <View style={styles.logoContainer}>
            <Logo width={48} height={48} />
          </View>
          <Text variant="header" style={styles.trustTitle}>
            Your Privacy Matters
          </Text>
          <Text variant="body" style={styles.trustSubtitle}>
            We use industry-leading encryption to keep your data safe and private
          </Text>
        </View>

        {/* Encryption Info Card */}
        <View style={styles.encryptionCard}>
          <View style={styles.encryptionHeader}>
            <View style={styles.shieldIconContainer}>
              <Ionicons name="shield-checkmark" size={32} color="#10B981" />
            </View>
            <View style={styles.encryptionHeaderText}>
              <Text variant="subheader" style={styles.encryptionTitle}>
                End-to-End Encrypted
              </Text>
              <Text variant="caption" color="#6B7280">
                Your data is protected at every step
              </Text>
            </View>
          </View>

          <Separator color="#E8E8E6" thickness={1} margin={16} />

          <Text variant="body" style={styles.encryptionDescription}>
            All your personal information is encrypted with{" "}
            <Text style={styles.highlightText}>AES-256 encryption</Text>, the
            same security standard used by banks and governments.
          </Text>
        </View>

        {/* What's Protected Section */}
        <View style={styles.section}>
          <Text variant="header" style={styles.sectionTitle}>
            What's Protected
          </Text>
          <Text variant="caption" style={styles.sectionSubtitle}>
            Everything you share is encrypted and secure
          </Text>

          <View style={styles.featuresGrid}>
            <SecurityFeatureCard
              icon="heart-outline"
              iconColor="#EF4444"
              title="Your Moods"
              description="All emotional data and mood tracking is end-to-end encrypted"
            />
            <SecurityFeatureCard
              icon="calendar-outline"
              iconColor="#8B5CF6"
              title="Your Bookings"
              description="Experience bookings and attendance records stay private"
            />
            <SecurityFeatureCard
              icon="person-outline"
              iconColor="#3B82F6"
              title="Personal Info"
              description="Profile data, preferences, and settings are fully protected"
            />
            <SecurityFeatureCard
              icon="create-outline"
              iconColor="#F59E0B"
              title="Your Experiences"
              description="Hosted experiences and content are securely stored"
            />
            <SecurityFeatureCard
              icon="chatbubbles-outline"
              iconColor="#10B981"
              title="Communications"
              description="Messages and interactions are encrypted in transit"
            />
            <SecurityFeatureCard
              icon="analytics-outline"
              iconColor="#06B6D4"
              title="Your Insights"
              description="All analytics and personal insights remain confidential"
            />
          </View>
        </View>

        <Separator color="#E8E8E6" thickness={1} margin={24} />

        {/* Privacy Settings Section */}
        <View style={styles.section}>
          <Text variant="header" style={styles.sectionTitle}>
            Privacy Settings
          </Text>
          <Text variant="caption" style={styles.sectionSubtitle}>
            Control what information you share
          </Text>

          <View style={styles.settingsContainer}>
            <PrivacySettingItem
              icon="eye-outline"
              title="Profile Visibility"
              description="Allow others to view your profile"
              value={settings.profileVisibility}
              onToggle={() => toggleSetting("profileVisibility")}
            />
            <PrivacySettingItem
              icon="pulse-outline"
              title="Activity Status"
              description="Show when you're active on the platform"
              value={settings.activityStatus}
              onToggle={() => toggleSetting("activityStatus")}
            />
            <PrivacySettingItem
              icon="analytics-outline"
              title="Data Collection"
              description="Allow usage analytics for app improvement"
              value={settings.dataCollection}
              onToggle={() => toggleSetting("dataCollection")}
            />
            <PrivacySettingItem
              icon="mail-outline"
              title="Marketing Emails"
              description="Receive updates about new features and experiences"
              value={settings.marketingEmails}
              onToggle={() => toggleSetting("marketingEmails")}
            />
          </View>
        </View>

        {/* <Separator color="#E8E8E6" thickness={1} margin={24} /> */}

        {/* Security Actions Section */}
        {/* <View style={styles.section}>
          <Text variant="header" style={styles.sectionTitle}>
            Security Actions
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: "#DBEAFE" }]}>
                  <Ionicons name="key-outline" size={22} color="#1E40AF" />
                </View>
                <View style={styles.actionText}>
                  <Text variant="body" style={styles.actionTitle}>
                    Change Password
                  </Text>
                  <Text variant="caption" color="#6B7280">
                    Update your password regularly
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: "#FEF3C7" }]}>
                  <Ionicons name="phone-portrait-outline" size={22} color="#92400E" />
                </View>
                <View style={styles.actionText}>
                  <Text variant="body" style={styles.actionTitle}>
                    Two-Factor Authentication
                  </Text>
                  <Text variant="caption" color="#6B7280">
                    Add an extra layer of security
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: "#E9D5FF" }]}>
                  <Ionicons name="desktop-outline" size={22} color="#6B21A8" />
                </View>
                <View style={styles.actionText}>
                  <Text variant="body" style={styles.actionTitle}>
                    Active Sessions
                  </Text>
                  <Text variant="caption" color="#6B7280">
                    Manage devices and sessions
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View> */}

        <Separator color="#E8E8E6" thickness={1} margin={24} />

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text variant="header" style={styles.sectionTitle}>
            Data Management
          </Text>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: "#D1FAE5" }]}>
                  <Ionicons name="download-outline" size={22} color="#065F46" />
                </View>
                <View style={styles.actionText}>
                  <Text variant="body" style={styles.actionTitle}>
                    Download Your Data
                  </Text>
                  <Text variant="caption" color="#6B7280">
                    Export all your information
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} activeOpacity={0.7}>
              <View style={styles.actionLeft}>
                <View style={[styles.actionIcon, { backgroundColor: "#FEE2E2" }]}>
                  <Ionicons name="trash-outline" size={22} color="#991B1B" />
                </View>
                <View style={styles.actionText}>
                  <Text variant="body" style={styles.actionTitle}>
                    Delete Account
                  </Text>
                  <Text variant="caption" color="#6B7280">
                    Permanently remove your data
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trust Footer */}
        <View style={styles.trustFooter}>
          <Ionicons name="lock-closed" size={20} color="#6B7280" />
          <Text variant="caption" style={styles.footerText}>
            Your data is never shared with third parties without your explicit
            consent. Read our{" "}
            <Text style={styles.linkText}>Privacy Policy</Text> and{" "}
            <Text style={styles.linkText}>Terms of Service</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAF8",
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Trust Banner
  trustBanner: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  logoContainer: {
    marginBottom: 16,
  },
  trustTitle: {
    marginBottom: 8,
    textAlign: "center",
  },
  trustSubtitle: {
    textAlign: "center",
    color: "#6B7280",
    lineHeight: 22,
    paddingHorizontal: 20,
  },

  // Encryption Card
  encryptionCard: {
    backgroundColor: "#F0FDF4",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  encryptionHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  shieldIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#DCFCE7",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  encryptionHeaderText: {
    flex: 1,
  },
  encryptionTitle: {
    marginBottom: 4,
    color: "#030303",
  },
  encryptionDescription: {
    lineHeight: 22,
    color: "#166534",
  },
  highlightText: {
    fontFamily: "Nunito-Bold",
    color: "#065F46",
  },

  // Sections
  section: {
    marginHorizontal: 20,
    marginBottom: 16,
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

  // Features Grid
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  // Settings Container
  settingsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E6",
  },

  // Actions Container
  actionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E8E8E6",
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    marginBottom: 2,
    fontFamily: "Nunito-SemiBold",
  },

  // Trust Footer
  trustFooter: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    gap: 12,
  },
  footerText: {
    flex: 1,
    lineHeight: 20,
    color: "#6B7280",
  },
  linkText: {
    color: "#030303",
    fontFamily: "Nunito-Bold",
    textDecorationLine: "underline",
  },
});