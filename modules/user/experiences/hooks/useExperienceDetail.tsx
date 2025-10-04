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
  const { id } = useLocalSearchParams<{ id: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadExperience = useCallback(async () => {
    if (!id) {
      setError('No experience ID provided');
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const data = await fetchExperienceById(id);
      setExperience(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load experience');
      console.error('Load experience error:', err);
    } finally {
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