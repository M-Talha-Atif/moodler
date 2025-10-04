// src/modules/dailyCheckIn/services/moodLogService.ts
import api from "@/services/apiClient";

export interface MoodLogData {
  moodLabel: string;
  note?: string;
  textSentiment?: string;
  photo?: {
    uri: string;
    type: string;
    name: string;
  };
  voice?: {
    uri: string;
    type: string;
    name: string;
  };
}

export const createMoodLog = async (data: MoodLogData) => {
  try {
    const formData = new FormData();

    // Append text fields
    formData.append("moodLabel", data.moodLabel);
    if (data.note) formData.append("note", data.note);
    if (data.textSentiment)
      formData.append("textSentiment", data.textSentiment);

    // Append photo file - CORRECT WAY FOR REACT NATIVE
    if (data.photo) {
      formData.append("photo", {
        uri: data.photo.uri,
        type: data.photo.type || "image/jpeg",
        name: data.photo.name || `photo-${Date.now()}.jpg`,
      } as any);
    }

    // Append voice file - CORRECT WAY FOR REACT NATIVE
    if (data.voice) {
      formData.append("voice", {
        uri: data.voice.uri,
        type: data.voice.type || "audio/m4a",
        name: data.voice.name || `voice-${Date.now()}.m4a`,
      } as any);
    }

    console.log("FormData contents:", {
      moodLabel: data.moodLabel,
      hasPhoto: !!data.photo,
      hasVoice: !!data.voice,
      photoInfo: data.photo
        ? { uri: data.photo.uri, type: data.photo.type, name: data.photo.name }
        : null,
      voiceInfo: data.voice
        ? { uri: data.voice.uri, type: data.voice.type, name: data.voice.name }
        : null,
    });

    const response = await api.post("/mood-log", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
      transformRequest: (data) => data, // Important for FormData
    });

    return response.data;
  } catch (error: any) {
    console.error("Error creating mood log:", error);
    console.error("Error response:", error.response?.data);

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw error;
    } else {
      throw new Error("Failed to create mood log. Please try again.");
    }
  }
};

export const getTodayMoodLog = async () => {
  try {
    const response = await api.get("/mood-log/today");
    return response.data;
  } catch (error: any) {
    // Handle 404 (no mood log for today) gracefully
    if (error.response?.status === 404 || error.response?.status === 500) {
      console.log("returned null");
      return null; // No mood log for today
    }

    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to fetch today's mood log");
    }
  }
};
