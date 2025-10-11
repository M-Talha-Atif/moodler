import api from "@/services/apiClient";


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