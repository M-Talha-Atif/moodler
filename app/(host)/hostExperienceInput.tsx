import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/modules/common/Header";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";
import VoiceExperienceInput from "@/modules/host/experiences/components/VoiceExperienceInput";
import TextExperienceInput from "@/modules/host/experiences/components/TextExperienceInput";
import { generateExperience } from "@/modules/host/experiences/services/experience";
import { router } from "expo-router";

export default function HostExperienceInputScreen() {
    const [mode, setMode] = useState<"voice" | "text">("voice");
    const [experienceText, setExperienceText] = useState("");
    const [voiceFile, setVoiceFile] = useState<{ uri: string; type: string; name: string } | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Ref to track if we're already processing to prevent double submission
    const isProcessingRef = useRef(false);

    /**
     * Toggle between voice and text modes
     */
    const toggleMode = () => {
        // Reset state when switching modes
        setVoiceFile(null);
        setExperienceText("");
        setMode((prev) => (prev === "voice" ? "text" : "voice"));
    };

    /**
     * Handle automatic submission when voice recording completes
     * This mimics ChatGPT's behavior: record → stop → auto-process
     */
    const handleVoiceRecordingComplete = async () => {
        // Prevent duplicate submissions
        if (isProcessingRef.current) {
            return;
        }

        // Small delay to ensure voiceFile state is updated
        setTimeout(async () => {
            // Check if we have a valid voice file
            if (!voiceFile) {
                console.log("Voice file not yet set, waiting...");
                return;
            }

            isProcessingRef.current = true;

            try {
                setLoading(true);
                
                // Generate experience from voice recording
                const response = await generateExperience(voiceFile, undefined);
                
                // Navigate to create experience screen with AI response
                router.push({
                    pathname: "/createExperience",
                    params: { aiResponse: JSON.stringify(response) },
                });

                console.log("Generated Experience from voice:", response);
                
            } catch (error: any) {
                console.error("Error generating experience from voice:", error);
                Alert.alert(
                    "Processing Error", 
                    error?.message || "Failed to generate experience from voice recording. Please try again."
                );
            } finally {
                setLoading(false);
                isProcessingRef.current = false;
            }
        }, 100);
    };

    /**
     * Handle manual text submission
     */
    const handleTextSubmit = async () => {
        // Validate text input
        if (!experienceText.trim()) {
            Alert.alert("Missing Input", "Please enter your experience details before submitting.");
            return;
        }

        try {
            setLoading(true);
            
            // Generate experience from text
            const response = await generateExperience(null, experienceText.trim());
            
            // Navigate to create experience screen with AI response
            router.push({
                pathname: "/createExperience",
                params: { aiResponse: JSON.stringify(response) },
            });

            console.log("Generated Experience from text:", response);
            
        } catch (error: any) {
            console.error("Error generating experience from text:", error);
            Alert.alert(
                "Processing Error", 
                error?.message || "Failed to generate experience from text. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    /**
     * Handle voice file result updates
     */
    const handleVoiceResult = (file: { uri: string; type: string; name: string } | null) => {
        setVoiceFile(file);
    };

    return (
        <SafeAreaView style={styles.container} edges={["top"]}>
            <Header title="Host Experience" showBackButton />
            
            <View style={styles.inner}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>
                        Choose Your Preferred Method
                    </Text>
                    <Text style={styles.description}>
                        You're currently using{" "}
                        <Text style={styles.modeHighlight}>
                            {mode === "voice" ? "Voice Recording" : "Text Input"}
                        </Text>
                    </Text>
                </View>

                {/* Mode Toggle */}
                <TouchableOpacity 
                    style={styles.toggle} 
                    onPress={toggleMode}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <View style={styles.toggleIcon}>
                        <Ionicons
                            name={mode === "voice" ? "text" : "mic"}
                            size={18}
                            color="#030303"
                        />
                    </View>
                    <Text style={styles.toggleText}>
                        Switch to {mode === "voice" ? "Text" : "Voice"}
                    </Text>
                    <Ionicons name="swap-horizontal" size={16} color="#666" />
                </TouchableOpacity>

                {/* Input Component Based on Mode */}
                <View style={styles.inputContainer}>
                    {mode === "voice" ? (
                        <VoiceExperienceInput 
                            onResult={handleVoiceResult}
                            onRecordingComplete={handleVoiceRecordingComplete}
                        />
                    ) : (
                        <TextExperienceInput
                            text={experienceText}
                            onChange={setExperienceText}
                        />
                    )}
                </View>

                {/* Submit Button - Only show for text mode */}
                {mode === "text" && (
                    <View style={styles.submitContainer}>
                        <Button
                            title={loading ? "Processing..." : "Generate Experience"}
                            onPress={handleTextSubmit}
                            width="100%"
                            height={50}
                            disabled={loading || !experienceText.trim()}
                            style={styles.submitButton}
                        />
                    </View>
                )}

                {/* Loading indicator for voice mode */}
                {mode === "voice" && loading && (
                    <View style={styles.loadingContainer}>
                        <View style={styles.loadingCard}>
                            <ActivityIndicator size="large" color="#030303" />
                            <Text style={styles.loadingTitle}>
                                Processing Your Recording
                            </Text>
                            <Text style={styles.loadingText}>
                               Moodly AI is analyzing your voice and creating your experience...
                            </Text>
                        </View>
                    </View>
                )}
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
    },
    headerSection: {
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: "Nunito",
        fontSize: 18,
        fontWeight: "800",
        color: "#030303",
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontFamily: "Nunito",
        fontSize: 14,
        fontWeight: "400",
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },
    modeHighlight: {
        fontWeight: "700",
        color: "#030303",
    },
    toggle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: "#EFEFE7",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    toggleIcon: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#FAFAF8",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    toggleText: {
        fontFamily: "Nunito",
        fontWeight: "700",
        fontSize: 14,
        color: "#030303",
        marginRight: 8,
    },
    inputContainer: {
        flex: 1,
    },
    submitContainer: {
        paddingVertical: 20,
        paddingBottom: 30,
    },
    submitButton: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 8,
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(250, 250, 248, 0.95)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    loadingCard: {
        backgroundColor: "#FAFAF8",
        borderRadius: 20,
        padding: 32,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#E8E8E6",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        width: "100%",
    },
    loadingTitle: {
        fontFamily: "Nunito",
        fontSize: 18,
        fontWeight: "800",
        color: "#030303",
        marginTop: 20,
        marginBottom: 8,
        textAlign: "center",
    },
    loadingText: {
        fontFamily: "Nunito",
        fontSize: 14,
        fontWeight: "400",
        color: "#666",
        textAlign: "center",
        lineHeight: 20,
    },
});