import React, { useEffect } from "react";
import { Text } from "@/components/ui/text";
import Container from "@/components/ui/container";
import Logo from "@/assets/images/logo.svg";

export default function Index() {
  // Add this to prevent layout measurement errors
  useEffect(() => {
    // Small delay to ensure layout is ready
    const timer = setTimeout(() => {}, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      backgroundColor="#fff"
      padding={32}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* Add key prop to SVG to force remount if needed */}
      <Logo key="app-logo" width={80} height={80} />
      
      <Text
        variant="display"
        style={{
          color: "#030303",
          fontSize: 24,
          fontFamily: "Nunito",
          fontWeight: "700",
          lineHeight: 28,
          textAlign: "center",
          marginTop: 12,
        }}
      >
        Moodly
      </Text>
      
      <Text
        variant="body"
        style={{
          color: "#030303",
          fontSize: 16,
          fontFamily: "Nunito",
          lineHeight: 21,
          textAlign: "center",
          marginTop: 6,
        }}
      >
        Your Emotional Companion
      </Text>
    </Container>
  );
}