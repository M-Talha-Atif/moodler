// src/modules/user/experiences/hooks/useExperienceDetail.ts
import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import {
  fetchExperienceById,
  createBooking,
  type Experience
} from '../services/experienceService';
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export const useExperienceDetail = () => {
  const params = useLocalSearchParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug: Check what's actually in params
  console.log("All params:", params);
  console.log("ID from params:", params.id);
  const id = params.id;


  // In your useExperienceDetail hook, add more logs:
  const loadExperience = useCallback(async () => {
    console.log("🔄 Loading experience with ID:", id);

    if (!id) {
      setError('No experience ID provided');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      console.log("📡 Calling fetchExperienceById...");
      const data = await fetchExperienceById(id);
      console.log("Experience data received:", data ? "has data" : "no data");
      setExperience(data);
    } catch (err: any) {
      console.log("Error loading experience:", err.message);
      setError(err.message || 'Failed to load experience');
    } finally {
      console.log("🏁 Loading complete");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadExperience();
  }, [loadExperience]);

  const handleBooking = async () => {
    if (!id || !experience) return;

    console.log(experience)

    if (experience.isBooked ){
      console.log(experience.bookingId)
        router.push({
        pathname: "/bookingDetail",
        params: { bookingId: experience.bookingId },
      });
    }

    setBookingLoading(true);
    try {
      const booking = await createBooking(id);

      Toast.show({
        type: "success",
        text1: "Booking Confirmed 🎉",
        text2: "You have successfully booked this experience!",
        position: "bottom",
      });

      router.push({
        pathname: "/bookingConfirmation",
        params: { bookingId: booking.id },
      });
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Booking Failed",
        text2: err?.message || "Something went wrong.",
        position: "bottom",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  const spotsLeft = experience ? experience.totalSpots - experience.spotsFilled : 0;

  return {
    experience,
    loading,
    bookingLoading,
    error,
    handleBooking,
    spotsLeft,
    refetch: loadExperience
  };
};