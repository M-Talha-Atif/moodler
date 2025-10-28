import React, { useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { fetchExperiences, deleteExperience } from "../services/experience";
import ExperienceCard from "../components/ExperienceCard";
import Skeleton from "@/modules/common/components/Skeleton";
import Header from "@/modules/common/Header";
import { useCancelableApi } from "@/hooks/useCanceleableApi";

export default function ManageExperiencesScreen() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  // Create cancelable versions of your API functions
  const cancelableFetchExperiences = useCancelableApi(fetchExperiences);
  const cancelableDeleteExperience = useCancelableApi(deleteExperience);

  const loadExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cancelableFetchExperiences();
      setExperiences(data || []);
    } catch (err: any) {
      // Check if the error is due to abort (component unmounted)
      if (err.name === 'AbortError') {
        console.log('Fetch experiences request was cancelled');
        return;
      }
      console.error("Error fetching experiences:", err);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  }, [cancelableFetchExperiences]);

  const handleDelete = async (id: string) => {
    try {
      await cancelableDeleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err: any) {
      // Check if the error is due to abort
      if (err.name === 'AbortError') {
        console.log('Delete experience request was cancelled');
        return;
      }
      console.error("Error deleting experience:", err);
    }
  };

  // Use focus effect to reload when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadExperiences();

      // Optional: Cleanup function that runs when screen loses focus
      return () => {
        // Any cleanup needed when screen loses focus
        console.log("ManageExperiencesScreen lost focus");
      };
    }, [loadExperiences])
  );

  if (loading) {
    return (
      <ScrollView contentContainerStyle={styles.loaderContainer}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} height={160} width="100%" radius={16} style={{ marginBottom: 12 }} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="Manage Experiences"
        showBackButton
        rightIcon={<Plus size={20} color="#030303" />}
        onRightPress={() => navigation.navigate("CreateExperience")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {experiences.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No experiences yet. Start by creating one.</Text>
          </View>
        ) : (
          experiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={() => navigation.navigate("UpdateExperience", { id: exp.id })}
              onDelete={() => handleDelete(exp.id)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loaderContainer: {
    padding: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  emptyBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 15,
  },
})