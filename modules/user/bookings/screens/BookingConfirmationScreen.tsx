import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Button from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Separator from "@/components/ui/separator";

export default function BookingConfirmationScreen() {
  const { bookingId } = useLocalSearchParams();
  const router = useRouter();

  // Dummy data for now — you’ll replace this with API data
  const booking = {
    date: "Oct 28",
    start: "7:00 PM",
    end: "8:30 PM",
    qrImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=60",
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
        <Text style={{ fontSize: 24 }}>×</Text>
      </TouchableOpacity>

      {/* Success Icon */}
      <View style={styles.successCircle}>
        <Text style={{ fontSize: 32, color: "#0BDE73" }}>✔</Text>
      </View>

      {/* Headings */}
      <Text variant="header" style={styles.title}>
        Your booking has been confirmed!
      </Text>
      <Text variant="micro" style={styles.subtitle}>
        Please check your mail for booking details.
      </Text>

      {/* QR Section */}
      <View style={styles.qrWrapper}>
        <Image source={{ uri: booking.qrImage }} style={styles.qrImage} />
      </View>
      <Text variant="micro" style={styles.qrNote}>
        Show this QR code for entry
      </Text>

      <Separator thickness={1} margin={14} />

      {/* Date + Time Row */}
      <View style={styles.row}>
        <View style={styles.col}>
          <Text variant="micro" style={styles.label}>
            Date
          </Text>
          <Text variant="body">{booking.date}</Text>
        </View>

        <View style={styles.col}>
          <Text variant="micro" style={styles.label}>
            Start Time
          </Text>
          <Text variant="body">{booking.start}</Text>
        </View>

        <View style={styles.col}>
          <Text variant="micro" style={styles.label}>
            End Time
          </Text>
          <Text variant="body">{booking.end}</Text>
        </View>
      </View>

      <Separator thickness={1} margin={14} />

      {/* Two Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text variant="micro">📅 Add to calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn}>
          <Text variant="micro">📍 View Location</Text>
        </TouchableOpacity>
      </View>

      {/* CTA Button */}
      <Button
        title="Explore More Experiences"
        backgroundColor="#00E676"
        textColor="#030303"
        width="100%"
        height={52}
        borderRadius={30}
        style={{ marginTop: 20 }}
        onPress={() => router.push("/experiences")}
      />

      {/* Bottom Link */}
      <TouchableOpacity onPress={() => router.push("/dashboard")}>
        <Text
          variant="body"
          style={{
            marginTop: 16,
            textAlign: "center",
            color: "#030303",
            fontWeight: "600",
          }}
        >
          Return to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: "#FFFFFF",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E9FFF2",
    alignSelf: "center",
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    marginTop: 6,
    color: "#777",
  },
  qrWrapper: {
    marginTop: 30,
    alignSelf: "center",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  qrImage: {
    width: 160,
    height: 160,
    borderRadius: 12,
  },
  qrNote: {
    textAlign: "center",
    marginTop: 8,
    color: "#777",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  col: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    color: "#777",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 18,
  },
  actionBtn: {
    alignItems: "center",
  },
});
