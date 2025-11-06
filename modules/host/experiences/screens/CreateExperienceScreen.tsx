import React, { useState, useEffect, useMemo } from "react";
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
    const aiResponse = useMemo(
        () => (params?.aiResponse ? JSON.parse(params.aiResponse) : null),
        [params?.aiResponse]
    );

    const isoToTimeString = (iso: string) => {
        const date = new Date(iso);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };


    useEffect(() => {
        if (aiResponse) {
            setValue("title", aiResponse.title || "");
            setValue("description", aiResponse.description || "");
            setValue("culturalTags", aiResponse.culturalTags || []);
            setValue("desiredOutcomes", aiResponse.desiredOutcomes || []);
            setValue("targetEmotions", aiResponse.targetEmotions || []);
            if (aiResponse.location) setValue("location", aiResponse.location);
            if (aiResponse.date) setValue("date", new Date(aiResponse.date));

            if (aiResponse.sessionStartTime)
                setValue("sessionStartTime", new Date(aiResponse.sessionStartTime));
            if (aiResponse.sessionEndTime)
                setValue("sessionEndTime", new Date(aiResponse.sessionEndTime));


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
            const startTime = data.sessionStartTime;
            const endTime = data.sessionEndTime;


            const payload = {
                ...data,
                date: data.date instanceof Date ? data.date.toISOString() : new Date(data.date).toISOString(),
                sessionStartTime:
                    startTime instanceof Date ? startTime.toISOString() : new Date(startTime).toISOString(),
                sessionEndTime:
                    endTime instanceof Date ? endTime.toISOString() : new Date(endTime).toISOString(),
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
