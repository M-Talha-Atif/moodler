import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { Text } from "@/components/ui/text";
import Card from "@/components/ui/card";
import AlertDialog from "@/components/ui/alertDialog";
import ProgressBar from "@/components/ui/progressBar";
import { router } from "expo-router";
import { MoreVertical } from "lucide-react-native";

interface ExperienceCardProps {
  experience: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HostExperienceCard({
  experience,
  onEdit,
  onDelete,
}: ExperienceCardProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const formatDate = (isoDate: string) => {
    if (!isoDate) return "No Date";
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Dynamic label based on date
  const getDateLabel = (isoDate: string) => {
    if (!isoDate) return "Date not set";

    const today = new Date();
    const expDate = new Date(isoDate);

    const isSameDay =
      expDate.getDate() === today.getDate() &&
      expDate.getMonth() === today.getMonth() &&
      expDate.getFullYear() === today.getFullYear();

    if (isSameDay) return `Happening today (${formatDate(isoDate)})`;
    if (expDate > today) return `Scheduled for ${formatDate(isoDate)}`;
    return `Occurred on ${formatDate(isoDate)}`;
  };

  // Calculate progress for the progress bar
  const calculateProgress = () => {
    if (!experience.totalSpots || experience.totalSpots === 0) return 0;
    return experience.totalBookings / experience.totalSpots;
  };

  const handleDeletePress = () => setShowDialog(true);
  const handleConfirmDelete = () => {
    setShowDialog(false);
    onDelete();
  };
  const handleCancelDelete = () => setShowDialog(false);

  const handleEditExperience = () => {
    router.push({
      pathname: "/(host)/editExperience",
      params: { experienceId: experience.id },
    });
  };

 return (
  <Card backgroundColor="#FFFFFF" borderRadius={16} shadow style={styles.cardContainer}>
    <View style={styles.contentRow}>
      {/* Image - Left Side */}
      {experience.image && (
        <Image
          source={{ uri: experience.image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      {/* Text Content - Right Side */}
      <View style={styles.textContent}>
        {/* Header Row with Three Dots at top right */}
        <View style={styles.headerRow}>
          <Text 
            variant="body" 
            numberOfLines={2} 
            style={styles.title}
            fontWeight="600"
          >
            {experience.title}
          </Text>
          
          <TouchableOpacity 
            onPress={() => setMenuVisible(true)}
            style={styles.menuButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MoreVertical color="#030303" size={18} />
          </TouchableOpacity>
        </View>

        {/* Rest of your content remains the same */}
        <Text variant="caption" color="#6B7280" style={styles.date}>
          {getDateLabel(experience.date)}
        </Text>

        <View style={styles.statusContainer}>
          <Text 
            variant="micro" 
            color={experience.status === "upcoming" ? "#059669" : "#6B7280"}
            fontWeight="600"
          >
            {experience.status === "upcoming" ? "Upcoming" : "Past"}
          </Text>
        </View>

        <View style={styles.bookingSection}>
          <View style={styles.bookingInfo}>
            <Text variant="micro" fontWeight="600" color="#030303">
              {experience.totalBookings !== undefined
                ? `${experience.totalBookings}/${experience.totalSpots} Booked`
                : "Bookings unavailable"}
            </Text>
            <Text variant="micro" color="#6B7280">
              {Math.round(calculateProgress() * 100)}% filled
            </Text>
          </View>
          
          <ProgressBar
            progress={calculateProgress()}
            height={4}
            backgroundColor="#E8E8E6"
            fillColor={experience.status === "upcoming" ? "#0066FF" : "#6B7280"}
            borderRadius={2}
            style={styles.progressBar}
          />
        </View>
      </View>
    </View>

    {/* Delete Confirmation Dialog */}
    <AlertDialog
      visible={showDialog}
      title="Delete Experience"
      message={`Are you sure you want to delete "${experience.title}"?`}
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleConfirmDelete}
      onCancel={handleCancelDelete}
    />

    {/* 3-dot Menu Modal */}
    <Modal
      transparent
      visible={menuVisible}
      animationType="fade"
      onRequestClose={() => setMenuVisible(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              handleEditExperience();
            }}
          >
            <Text variant="body">Edit Experience</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/(host)/viewBookings",
                params: { experienceId: experience.id },
              });
            }}
          >
            <Text variant="body">View Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/(host)/duplicateExperience",
                params: { experienceId: experience.id },
              });
            }}
          >
            <Text variant="body">Duplicate Experience</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              router.push({
                pathname: "/(host)/shareExperience",
                params: { experienceId: experience.id },
              });
            }}
          >
            <Text variant="body">Share Experience</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              handleDeletePress();
            }}
          >
            <Text variant="body" color="#DC2626">
              Delete Experience
            </Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  </Card>
);

}
const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 12,
    overflow: "hidden",
    position: 'relative', // Important for modal positioning
  },
  contentRow: {
    flexDirection: "row",
    padding: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
    minHeight: 70, // Ensure minimum height matches image
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
    fontSize: 15,
    // Ensure text doesn't push the menu button out
    flexShrink: 1,
  },
  menuButton: {
    padding: 4,
    marginLeft: 4,
    // Ensure the button stays within bounds
    alignSelf: "flex-start",
  },
  date: {
    marginBottom: 4,
    fontSize: 13,
  },
  statusContainer: {
    marginBottom: 8,
  },
  bookingSection: {
    marginTop: 2,
  },
  bookingInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressBar: {
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  menu: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
});