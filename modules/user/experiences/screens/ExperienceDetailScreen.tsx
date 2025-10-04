// src/modules/user/experiences/screens/ExperienceDetailScreen.tsx
import { View, ScrollView, SafeAreaView } from 'react-native';
import ExperienceHeader from '../components/ExperienceHeader';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import { useExperienceDetail } from '../hooks/useExperienceDetail';
import LoadingState from '../components/LoadingState';
import HostCard from '../components/HostCard';
import BookingButton from '../components/BookingButton';
import BookingStatus from '../components/BookingStatus';
import InfoSection from '../components/InfoSection';
import Header from '@/modules/common/Header';

export default function ExperienceDetailScreen() {
  const {
    experience,
    loading,
    bookingLoading,
    error,
    handleBooking,
    spotsLeft
  } = useExperienceDetail();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={handleBooking} />;
  }

  if (!experience) {
    return <EmptyState />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">

      <Header title="Experience Details" showBackButton />
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <ExperienceHeader 
          image={experience.image}
          title={experience.title}
          description={experience.description}
        />

        <View className="px-5 space-y-6">
          <HostCard host={experience.host} />
          
          <InfoSection 
            experience={experience}
            spotsLeft={spotsLeft}
          />

          <BookingStatus isBooked={experience.isBooked} bookingStatus={experience.bookingStatus} />
        </View>
      </ScrollView>

      <BookingButton
        isBooked={experience.isBooked}
        bookingLoading={bookingLoading}
        onPress={handleBooking}
        bookingStatus={experience.bookingStatus}
      />
    </SafeAreaView>
  );
}