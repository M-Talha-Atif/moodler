// src/modules/host/services/experience.ts
import api from "@/services/apiClient";

// Types
export interface ExperiencePayload {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  isVirtual: boolean;
  sessionStartTime: string;
  sessionEndTime: string;
  price: number;
  timezone: string;
  totalSpots: number;
  spotsFilled: number;
  targetEmotions: string[];
  desiredOutcomes: string[];
  language: string;
  culturalTags: string[];
}

// Create a new experience
export const createExperience = async (payload: ExperiencePayload) => {
  try {
    const { data } = await api.post("/host/experiences", payload);
    return data?.data || data;
  } catch (error: any) {
    console.error("Error creating experience:", error);
    throw new Error(error.response?.data?.message || "Failed to create experience");
  }
};

// Upload a image
export const uploadExperienceImage = async (experienceId: string, file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.type || "image/jpeg",
      name: file.name || "upload.jpg",
    } as any);

    const { data } = await api.post(
      `/host/experiences/${experienceId}/image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return data?.data || data;
  } catch (error: any) {
    console.error("Error uploading image:", error);
    throw new Error(error.response?.data?.message || "Image upload failed");
  }
};

// Update a experience
export const updateExperience = async (experienceId: string, payload: Partial<ExperiencePayload>) => {
  try {
    const { data } = await api.put(`/host/experiences/${experienceId}`, payload);
    return data?.data || data;
  } catch (error: any) {
    console.error("Error updating experience:", error);
    throw new Error(error.response?.data?.message || "Failed to update experience");
  }
};

// Delete a experience
export const deleteExperience = async (experienceId: string) => {
  try {
    const { data } = await api.delete(`/host/experiences/${experienceId}`);
    return data?.data || data;
  } catch (error: any) {
    console.error("Error deleting experience:", error);
    throw new Error(error.response?.data?.message || "Failed to delete experience");
  }
};

// Fetch all experiences
export const fetchExperiences = async () => {
  try {
    const { data } = await api.get("/host/experiences");
    return data?.data?.data || [];
  } catch (error: any) {
    console.error("Error fetching experiences:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch experiences");
  }
};

// Fetch single experience
export const fetchSingleExperience = async (experienceId: string) => {
  try {
    const { data } = await api.get(`/host/experiences/${experienceId}`);
    return data?.data || null;
  } catch (error: any) {
    console.error("Error fetching experience:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch experience");
  }
};
