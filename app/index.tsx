import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import Container from "@/components/ui/container";
import Logo from "@/assets/images/logo.svg";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {}, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      backgroundColor="#FAFAFA"
      padding={32}
      style={styles.container}
    >
      {/* Logo */}
      <Logo key="app-logo" width={100} height={100} />
      
      {/* Brand Name */}
      <Text
        variant="display"
        style={styles.brandName}
      >
        Moodly
      </Text>
      
      {/* Main Tagline */}
      <Text
        variant="body"
        style={styles.tagline}
      >
        Match Your Mood to Meaningful Experiences
      </Text>

      {/* Dual Context Section */}
      <View style={styles.contextContainer}>
        
        {/* User Context Card */}
        <View style={styles.contextCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, styles.userIcon]}>
              <Text style={styles.emoji}>😊</Text>
            </View>
            <Text style={styles.cardTitle}>For You</Text>
          </View>
          <Text style={styles.cardDescription}>
            Share how you're feeling and discover experiences perfectly matched to your emotional needs
          </Text>
        </View>

        {/* Host Context Card */}
        <View style={styles.contextCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconCircle, styles.hostIcon]}>
              <Text style={styles.emoji}>✨</Text>
            </View>
            <Text style={styles.cardTitle}>For Hosts</Text>
          </View>
          <Text style={styles.cardDescription}>
            Create transformative experiences that help people feel better and connect meaningfully
          </Text>
        </View>
        
      </View>

      {/* Bottom Tagline */}
      <Text style={styles.bottomTagline}>
        Where emotions meet experiences
      </Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  brandName: {
    color: "#030303",
    fontSize: 32,
    fontFamily: "Nunito",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
    letterSpacing: -0.5,
  },
  
  tagline: {
    color: "#4B5563",
    fontSize: 17,
    fontFamily: "Nunito",
    fontWeight: "600",
    lineHeight: 24,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 32,
    maxWidth: 300,
  },

  contextContainer: {
    width: "100%",
    maxWidth: 360,
    gap: 16,
    marginTop: 8,
  },

  contextCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  userIcon: {
    backgroundColor: "#EEF2FF",
  },

  hostIcon: {
    backgroundColor: "#FEF3C7",
  },

  emoji: {
    fontSize: 20,
  },

  cardTitle: {
    fontSize: 16,
    fontFamily: "Nunito",
    fontWeight: "700",
    color: "#1F2937",
  },

  cardDescription: {
    fontSize: 14,
    fontFamily: "Nunito",
    lineHeight: 20,
    color: "#6B7280",
  },

  bottomTagline: {
    position: "absolute",
    bottom: 40,
    fontSize: 12,
    fontFamily: "Nunito",
    fontWeight: "500",
    color: "#9CA3AF",
    textAlign: "center",
  },
});