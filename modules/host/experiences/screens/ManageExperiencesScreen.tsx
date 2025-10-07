import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { fetchExperiences, deleteExperience } from "../services/experience";
import ExperienceCard from "../components/ExperienceCard";
import Skeleton from "@/modules/common/components/Skeleton";
import Button from "@/modules/common/components/Button";

export default function ManageExperiencesScreen() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await fetchExperiences();
      setExperiences(data || []);
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExperience(id);
      setExperiences(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  if (loading) {
    return (
      <ScrollView className="p-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} height={160} width="100%" radius={16} style={{ marginBottom: 12 }} />
        ))}
      </ScrollView>
    );
  }

  return (
    <View className="flex-1 px-4 pt-4 bg-gray-50">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Manage Experiences</Text>
        <Button
          title="Add New"
          variant="gradient"
          size="sm"
          iconLeft={<Plus size={16} color="#fff" />}
          onPress={() => navigation.navigate("CreateExperience")}
        />
      </View>

      {experiences.length === 0 ? (
        <View className="bg-white rounded-2xl p-6 items-center justify-center shadow-sm">
          <Text className="text-gray-500">No experiences yet. Start by creating one.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {experiences.map(exp => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onEdit={() => navigation.navigate("UpdateExperience", { id: exp.id })}
              onDelete={() => handleDelete(exp.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
