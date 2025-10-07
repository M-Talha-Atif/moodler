import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import { experienceSchema, FormData } from '../validation/experienceSchema';
import ExperienceBasicsSection from '../components/ExperienceBasicSection';
import ExperienceTimingSection from '../components/ExperienceTimingSection';
import ExperienceFocusSection from '../components/ExperienceFocusSection';
import Button from '@/modules/common/components/Button';
import Header from '@/modules/common/Header';

export default function CreateExperienceScreen({ navigation }: any) {
    const { control, handleSubmit, setValue, watch, formState } = useForm<FormData>({
        resolver: zodResolver(experienceSchema),
        mode: 'onChange',
        defaultValues: {
            language: 'English',
            timezone: 'UTC+9',
        } as any,
    });
    const [submitting, setSubmitting] = useState(false);

    const showErrors = () => {
        Object.entries(formState.errors).forEach(([_, err]: any) => {
            Toast.show({ type: 'error', text1: err?.message });
        });
    };

    // Helper to format date/time to ISO 8601
    const formatToISO = (date: string, time?: string) => {
        if (!date) return '';
        if (!time) return new Date(date).toISOString();
        // date: 2025-11-01, time: 19:00
        return new Date(`${date}T${time}:00Z`).toISOString();
    };

    const onSubmit = (data: FormData) => {
        setSubmitting(true);

        // Format the payload as required
        const payload = {
            title: data.title,
            description: data.description,
            date: formatToISO(data.date).slice(0, 10) + "T00:00:00Z",
            location: data.isVirtual ? "" : data.location,
            image: data.image,
            isVirtual: data.isVirtual,
            sessionStartTime: formatToISO(data.date, data.sessionStartTime),
            sessionEndTime: formatToISO(data.date, data.sessionEndTime),
            price: Number(data.price),
            timezone: "UTC+9",
            totalSpots: Number(data.totalSpots),
            spotsFilled: 0,
            targetEmotions: data.targetEmotions,
            desiredOutcomes: data.desiredOutcomes,
            language: "English", // fixed for now
            culturalTags: data.culturalTags,
            meetLink: data.isVirtual ? data.meetLink : "",
        };

        // Show in the console as requested
        // Remove meetLink from payload if onsite, remove location if virtual
        if (payload.isVirtual) delete payload.location;
        else delete payload.meetLink;
        // Remove undefined keys
        Object.keys(payload).forEach(
            key => payload[key] === undefined && delete payload[key]
        );

        console.log("--- Experience Payload ---");
        Object.entries(payload).forEach(([key, value]) =>
            console.log(
                `"${key}": (${typeof value})`, value
            )
        );
        console.log("--- Payload JSON ---");
        console.log(JSON.stringify(payload, null, 2));

        setTimeout(() => {
            setSubmitting(false);
            Toast.show({ type: 'success', text1: 'Experience created!' });
            navigation?.goBack?.();
        }, 1500);
    };

    return (
        <>
            <Header title="Create Experience" showBackButton />

            
            <KeyboardAvoidingView
                className="flex-1 bg-white"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <View className="mt-24" />


                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120, paddingTop: 16 }}>
                    <ExperienceBasicsSection control={control} watch={watch} setValue={setValue} />
                    <ExperienceTimingSection control={control} setValue={setValue} />
                    <ExperienceFocusSection control={control} setValue={setValue} />
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        paddingHorizontal: 16,
                        paddingBottom: 24,
                        backgroundColor: 'rgba(255,255,255,0.97)',
                    }}
                >
                    <Button
                        title="Create Experience"
                        loading={submitting}
                        disabled={submitting}
                        variant="primary"
                        size="lg"
                        onPress={handleSubmit(onSubmit, showErrors)}
                        className="w-full"
                    />
                </View>
                <Toast />
            </KeyboardAvoidingView>
        </>

    );
}