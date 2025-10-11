import api from "@/services/apiClient";

export const getInsights = async (moodDays: number = 60) => {
  try {
    const response = await api.get(`/insights?moodDays=${moodDays}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching insights:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch insights");
  }
};

export const getMoodLogsByRange = async (start: string, end: string) => {
  try {
    const response = await api.get(`/mood-log/range?start=${start}&end=${end}`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching mood logs:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch mood logs");
  }
};


export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data.data;
};


/** Fetch only profile image */
export const getProfileImage = async () => {
  try {
    const response = await api.get("/profile/image");
    return response.data.data; 
  } catch (error: any) {
    console.error("Error fetching profile image:", error);
    throw new Error(error.response?.data?.reason || "Failed to fetch profile image");
  }
};


export const updateProfile = async (name: string, fileUri?: string) => {
  const formData = new FormData();
  formData.append("name", name);
  if (fileUri) {
    formData.append("file", {
      uri: fileUri,
      name: "avatar.jpg",
      type: "image/jpeg",
    } as any);
  }

  const response = await api.patch("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};


export const updatePassword = async (oldPassword: string, newPassword: string) => {
  // Using URLSearchParams instead of FormData since it's just text data
  const formData = new URLSearchParams();
  formData.append("oldPassword", oldPassword);
  formData.append("newPassword", newPassword);
  
  const response = await api.patch("/profile/password", formData, {
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};