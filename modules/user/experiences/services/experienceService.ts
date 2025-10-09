// src/modules/user/experiences/services/experienceService.ts
import api from "@/services/apiClient";

export interface Host {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  isVirtual: boolean;
  totalSpots: number;
  spotsFilled: number;
  price: number;
  location: string;
  date: string;
  emotions: string[];
  outcomes: string[];
  culturalTags: string[];
  timezone: string;
  isBooked: boolean;
  bookingId?: string;
  bookingStatus?: string;
  sessionStartTime?: string;
  sessionEndTime?: string;
  host: Host;
}

export async function fetchExperienceById(id: string): Promise<Experience> {
  const response = await api.get(`/user/experiences/${id}`);
  
  if (!response.data?.data) {
    throw new Error('Experience not found');
  }
  
  return response.data.data as Experience;
}

export async function createBooking(experienceId: string) {
  const response = await api.post(
    `/user/bookings`,
    { experienceId },
    { withCredentials: true }
  );
  
  if (!response.data?.data) {
    throw new Error('Booking failed - no data received');
  }
  
  return response.data.data;
}