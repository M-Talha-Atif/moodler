import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/modules/common/Header";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";
import VoiceExperienceInput from "../components/VoiceExperienceInput";
import TextExperienceInput from "../components/TextExperienceInput";
import { generateExperience } from "../services/experience";
import { router } from "expo-router";

export default function HostExperienceInputScreen() {
    const [mode, setMode] = useState<"voice" | "text">("voice");
    const [experienceText, setExperienceText] = useState("");
    const [voiceFile, setVoiceFile] = useState<{ uri: string; type: string; name: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const toggleMode = () => setMode((prev) => (prev === "voice" ? "text" : "voice"));

    const handleSubmit = async () => {
        if (mode === "voice" && !voiceFile) {
            Alert.alert("Missing input", "Please record your voice before submitting.");
            return;
        }
        if (mode === "text" && !experienceText.trim()) {
            Alert.alert("Missing input", "Please enter your experience text.");
            return;
        }

        try {
            setLoading(true);
            const response = await generateExperience(
                voiceFile,
                mode === "text" ? experienceText.trim() : undefined
            );

            router.push({
                pathname: "/createExperience",
                params: { aiResponse: JSON.stringify(response) },
            });

            Alert.alert("Success", "Experience generated successfully!");
            console.log("Generated Experience:", response);
        } catch (error: any) {
            console.error("Error generating experience:", error);
            Alert.alert("Error", error?.message || "Failed to generate experience.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header title="Host Experience" showBackButton />

            <View style={styles.inner}>
                <Text style={styles.title}>
                    You can fill your experience form using{" "}
                    <Text style={{ fontWeight: "700" }}>
                        {mode === "voice" ? "Voice" : "Text"}
                    </Text>
                </Text>

                <TouchableOpacity style={styles.toggle} onPress={toggleMode}>
                    <Ionicons
                        name={mode === "voice" ? "text-outline" : "mic-outline"}
                        size={16}
                        color="#030303"
                    />
                    <Text style={styles.toggleText}>
                        {mode === "voice" ? "Use Text" : "Use Voice"}
                    </Text>
                </TouchableOpacity>

                {mode === "voice" ? (
                    <VoiceExperienceInput onResult={setVoiceFile} />
                ) : (
                    <TextExperienceInput
                        text={experienceText}
                        onChange={setExperienceText}
                    />
                )}

                <Button
                    title={loading ? "Processing..." : "Submit Experience"}
                    onPress={handleSubmit}
                    width="100%"
                    height={45}
                    disabled={loading}
                    style={{ marginTop: 20 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFAF8",
    },
    inner: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontFamily: "Nunito",
        fontSize: 16,
        fontWeight: "600",
        color: "#030303",
        textAlign: "center",
        marginBottom: 12,
    },
    toggle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#EFEFE7",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        marginBottom: 20,
    },
    toggleText: {
        fontFamily: "Nunito",
        fontWeight: "600",
        fontSize: 13,
        color: "#030303",
        marginLeft: 6,
    },
});
