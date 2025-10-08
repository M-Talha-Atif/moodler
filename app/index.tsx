import React from "react";
import { Text } from "@/components/ui/text";
import Container from "@/components/ui/container";
import Logo from "@/assets/images/logo.svg";


export default function Index() {
  return (
    <Container
      backgroundColor="#fff"
      padding={32}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {/* Logo */}
      <Logo width={80} height={80} />

      {/* Title */}
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

      {/* Subtitle */}
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
