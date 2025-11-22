import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { experienceSchema, FormData } from "@/modules/host/experiences/validation/experienceSchema";
import ExperienceBasicsSection from "@/modules/host/experiences/components/ExperienceBasicSection";
import ExperienceTimingSection from "@/modules/host/experiences/components/ExperienceTimingSection";
import Button from "@/components/ui/button";
import Header from "@/modules/common/Header";
import Skeleton from "@/modules/common/components/Skeleton";
import { fetchSingleExperience, updateExperience } from "@/modules/host/experiences/services/experience";

export default function EditExperienceScreen() {
    const router = useRouter();
    const { experienceId } = useLocalSearchParams<{ experienceId: string }>();

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const { control, handleSubmit, setValue, watch, formState, reset } =
        useForm<FormData>({
            resolver: zodResolver(experienceSchema),
            mode: "onChange",
        });

    const showErrors = () => {
        const firstError =
            Object.values(formState.errors)?.[0]?.message ||
            "Please fill all required fields";

        Toast.show({
            type: "error",
            text1: String(firstError),
            position: "bottom",
            visibilityTime: 2000,
        });
    };

    // Load Experience Data
    useEffect(() => {
        let isActive = true;

        const loadExperience = async () => {
            try {
                setLoading(true);
                const data = await fetchSingleExperience(experienceId);

                if (!data || !isActive) return;

                console.log(data)

                // Helper function to convert "8:19 PM" to Date object
                // In EditExperienceScreen - update the timeStringToDate function:
                const timeStringToDate = (timeValue: any) => {
                    if (!timeValue) return new Date();

                    try {
                        // If it's already a Date object, return it
                        if (timeValue instanceof Date) {
                            return timeValue;
                        }

                        // If it's an ISO string (like "2025-10-12T15:19:00.000Z")
                        if (typeof timeValue === 'string' && timeValue.includes('T')) {
                            return new Date(timeValue);
                        }

                        // If it's a time string (like "8:19 PM")
                        if (typeof timeValue === 'string') {
                            const [time, modifier] = timeValue.trim().split(" ");
                            let [hours, minutes] = time.split(":").map(Number);

                            if (modifier?.toUpperCase() === "PM" && hours < 12) hours += 12;
                            if (modifier?.toUpperCase() === "AM" && hours === 12) hours = 0;

                            const date = new Date();
                            date.setHours(hours, minutes, 0, 0);
                            return date;
                        }

                        // Fallback
                        return new Date();
                    } catch (error) {
                        console.error("Error parsing time:", timeValue, error);
                        return new Date();
                    }
                };

                // Convert backend data → form values
                reset({
                    title: data.title || "",
                    description: data.description || "",
                    image: data.image || "",
                    date: data.date ? new Date(data.date) : new Date(),
                    // Convert time strings to Date objects for DatePicker
                    sessionStartTime: data.sessionStartTime ? timeStringToDate(data.sessionStartTime) : new Date(),
                    sessionEndTime: data.sessionEndTime ? timeStringToDate(data.sessionEndTime) : new Date(),
                    price: Number(data.price) || 0,
                    totalSpots: Number(data.totalSpots) || 1,
                    isVirtual: !!data.isVirtual,
                    location: data.location || "",
                    meetLink: data.meetLink || "",
                    timezone: data.timezone || "UTC+9",
                    language: data.language || "English",
                } as any);
            } catch (error: any) {
                console.error("Error loading experience:", error);
                Toast.show({
                    type: "error",
                    text1: error.message || "Failed to load experience data",
                    position: "bottom",
                });
            } finally {
                setLoading(false);
            }
        };

        loadExperience();
        return () => {
            isActive = false;
        };
    }, [experienceId, reset]);

    // Submit Handler
    const onSubmit = async (data: FormData) => {
        try {
            setSubmitting(true);

            const baseDate = data.date instanceof Date
                ? data.date
                : new Date(data.date as any);

            const startTime = new Date(baseDate);
            const endTime = new Date(baseDate);

            const parseTime = (timeValue: any) => {
                let timeStr: string;

                // If it's a Date object, convert to "hh:mm AM/PM" format
                if (timeValue instanceof Date) {
                    let hours = timeValue.getHours();
                    const minutes = timeValue.getMinutes().toString().padStart(2, "0");
                    const ampm = hours >= 12 ? "PM" : "AM";
                    hours = hours % 12 || 12;
                    timeStr = `${hours}:${minutes} ${ampm}`;
                } else {
                    // It's already a string
                    timeStr = timeValue;
                }

                // Parse the time string
                const [time, modifier] = timeStr.split(" ");
                let [hours, minutes] = time.split(":").map(Number);
                if (modifier === "PM" && hours < 12) hours += 12;
                if (modifier === "AM" && hours === 12) hours = 0;
                return { hours, minutes };
            };

            const { hours: startHours, minutes: startMinutes } = parseTime(data.sessionStartTime);
            const { hours: endHours, minutes: endMinutes } = parseTime(data.sessionEndTime);

            startTime.setHours(startHours, startMinutes, 0, 0);
            endTime.setHours(endHours, endMinutes, 0, 0);

            const payload = {
                ...data,
                date: baseDate.toISOString(),
                sessionStartTime: startTime.toISOString(),
                sessionEndTime: endTime.toISOString(),
                price: Number(data.price),
                totalSpots: Number(data.totalSpots),
                timezone: data.timezone || "UTC+9",
                language: data.language || "English",
                location: data.isVirtual ? "" : data.location,
                meetLink: data.isVirtual ? data.meetLink : "",
            };

            if (payload.isVirtual) delete payload.location;
            else delete payload.meetLink;

            console.log("--- Update API Payload ---");
            console.log(JSON.stringify(payload, null, 2));

            await updateExperience(experienceId, payload);

            Toast.show({
                type: "success",
                text1: "Experience updated successfully!",
                position: "bottom",
            });

            setTimeout(() => router.back(), 800);
        } catch (error: any) {
            console.error("Error:", error);
            Toast.show({
                type: "error",
                text1: error.message || "Failed to update experience",
                position: "bottom",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Header title="Edit Experience" showBackButton />
                <View style={styles.skeletonContainer}>
                    <Skeleton height={44} style={{ marginBottom: 16 }} />
                    <Skeleton height={100} style={{ marginBottom: 16 }} />
                    <Skeleton height={44} style={{ marginBottom: 16 }} />
                    <Skeleton height={44} style={{ marginBottom: 16 }} />
                    <Skeleton height={44} style={{ marginBottom: 16 }} />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Edit Experience" showBackButton />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <ExperienceBasicsSection control={control} />
                    <ExperienceTimingSection control={control} />
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={submitting ? "Updating..." : "Update Experience"}
                        onPress={handleSubmit(onSubmit, showErrors)}
                        disabled={submitting}
                        backgroundColor="#030303"
                        textColor="#EFEFE7"
                        fontSize={16}
                        width="100%"
                        height={48}
                    />
                </View>

                <Toast />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    flex: { flex: 1 },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 120,
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.97)",
        paddingHorizontal: 16,
        paddingBottom: 56,
        paddingTop: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: "#E5E7EB",
    },
    skeletonContainer: {
        padding: 20,
    },
});
