import React from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import Button from "@/modules/common/components/Button";

interface ExperienceCardProps {
    experience: any;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: ExperienceCardProps) {
    const handleDelete = () => {
        Alert.alert(
            "Delete Experience",
            `Are you sure you want to delete "${experience.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: onDelete },
            ]
        );
    };

    return (
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
            <Image
                source={{ uri: experience.image }}
                className="w-full h-36"
                resizeMode="cover"
            />
            <View className="p-4">
                <Text className="text-lg font-semibold mb-1">{experience.title}</Text>
                <Text className="text-gray-500 text-sm mb-2">{experience.date}</Text>
                <View className="flex-row justify-between mt-2">
                    <Button title="Edit" variant="secondary" onPress={onEdit} size="sm" />
                    <Button title="Delete" variant="destructive" onPress={handleDelete} size="sm" />
                </View>
            </View>
        </View>
    );
}
