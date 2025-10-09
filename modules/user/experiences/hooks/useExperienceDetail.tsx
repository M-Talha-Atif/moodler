// src/modules/user/experiences/hooks/useExperienceDetail.ts
import { useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import {
  fetchExperienceById,
  createBooking,
  type Experience
} from '../services/experienceService';

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
      console.log("✅ Experience data received:", data ? "has data" : "no data");
      setExperience(data);
    } catch (err: any) {
      console.log("❌ Error loading experience:", err.message);
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
    if (!id || !experience || experience.isBooked) return;

    setBookingLoading(true);
    try {
      await createBooking(id);
      Alert.alert(
        "✅ Booking Confirmed",
        "You have successfully booked this experience!",
        [{ text: "OK", onPress: loadExperience }]
      );
    } catch (err: any) {
      Alert.alert(
        "❌ Booking Failed",
        err.message || "Something went wrong. Please try again."
      );
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