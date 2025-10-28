import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Button from "@/components/ui/button";
import AlertDialog from "@/components/ui/alertDialog";
import { router } from "expo-router";
interface ExperienceCardProps {
  experience: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "No Date";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeletePress = () => setShowDialog(true);

  const handleConfirmDelete = () => {
    setShowDialog(false);
    onDelete();
  };

  const handleEditExperience = () => {
    router.push(
      {
        pathname: "/(host)/editExperience",
        params: { experienceId: experience.id },
      }
    )

}
const handleCancelDelete = () => setShowDialog(false);

return (
  <View style={styles.card}>
    {experience.image && (
      <Image source={{ uri: experience.image }} style={styles.image} resizeMode="cover" />
    )}

    <View style={styles.content}>
      <Text style={styles.title}>{experience.title}</Text>
      <Text style={styles.date}>{formatDate(experience.date)}</Text>

      <View style={styles.actions}>
        <Button
          title="Edit"
          onPress={handleEditExperience}
          backgroundColor="#E5E7EB"
          textColor="#030303"
          width={110}
        />
        <Button
          title="Delete"
          onPress={handleDeletePress}
          backgroundColor="#DC2626"
          textColor="#FFFFFF"
          width={110}
        />
      </View>
    </View>

    {/* Custom AlertDialog */}
    <AlertDialog
      visible={showDialog}
      title="Delete Experience"
      message={`Are you sure you want to delete "${experience.title}"?`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#111827",
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
});
