import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { experienceSchema, FormData } from "../validation/experienceSchema";
import ExperienceBasicsSection from "../components/ExperienceBasicSection";
import ExperienceTimingSection from "../components/ExperienceTimingSection";
import ExperienceFocusSection from "../components/ExperienceFocusSection";
import Button from "@/components/ui/button";
import Header from "@/modules/common/Header";
import { createExperience } from "../services/experience";
import { useLocalSearchParams, router } from "expo-router";

export default function CreateExperienceScreen() {
    const { control, handleSubmit, setValue, watch, formState } = useForm<FormData>({
        resolver: zodResolver(experienceSchema),
        mode: "onChange",
        defaultValues: {
            language: "English",
            timezone: "UTC+9",
            isVirtual: false,
        } as any,
    });

    const [submitting, setSubmitting] = useState(false);

    //  receiving JSON from previous screen
    const params = useLocalSearchParams();
    const aiResponse = params?.aiResponse
        ? JSON.parse(params.aiResponse)
        : null;

    useEffect(() => {
        if (aiResponse) {
            setValue("title", aiResponse.title || "");
            setValue("description", aiResponse.description || "");
            setValue("culturalTags", aiResponse.culturalTags || []);
            setValue("desiredOutcomes", aiResponse.desiredOutcomes || []);
            setValue("targetEmotions", aiResponse.targetEmotions || []);
            if (aiResponse.location) setValue("location", aiResponse.location);
        }
    }, [aiResponse, setValue]);

    /**  Simplified showErrors — just shows first message */
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

    const onSubmit = async (data: FormData) => {
        try {
            setSubmitting(true);

            // Convert to valid ISO strings
            const baseDate = data.date instanceof Date
                ? data.date
                : new Date(data.date as any);

            const startTime = new Date(baseDate);
            const endTime = new Date(baseDate);

            // Parse "hh:mm AM/PM" → hours/minutes
            const parseTime = (timeStr: string) => {
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
                spotsFilled: 0,
                timezone: data.timezone || "UTC+9",
                language: data.language || "English",
                location: data.isVirtual ? "" : data.location,
                meetLink: data.isVirtual ? data.meetLink : "",
            };

            if (payload.isVirtual) delete payload.location;
            else delete payload.meetLink;

            console.log("--- Final API Payload ---");
            console.log(JSON.stringify(payload, null, 2));

            const response = await createExperience(payload);
            Toast.show({
                type: "success",
                text1: "Experience created successfully!",
                position: "bottom",
            });
            // Expo Router navigation
            setTimeout(() => router.back(), 800);
        } catch (error: any) {
            console.error("Error:", error);
            Toast.show({
                type: "error",
                text1: error.message || "Failed to create experience",
                position: "bottom",
            });
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <View style={styles.container}>
            <Header title="Create Experience" showBackButton />

            <KeyboardAvoidingView
                style={styles.flex}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <ExperienceBasicsSection control={control} watch={watch} setValue={setValue} />
                    <ExperienceTimingSection control={control} setValue={setValue} />
                    <ExperienceFocusSection control={control} setValue={setValue} />
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={submitting ? "Creating..." : "Create Experience"}
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
});
