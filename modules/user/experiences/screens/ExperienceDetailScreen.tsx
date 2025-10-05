// src/modules/user/experiences/screens/ExperienceDetailScreen.tsx
import { View, ScrollView, Text } from 'react-native';
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
import { SafeAreaView } from "react-native-safe-area-context";
import AnimatedBorderCard from '@/modules/common/components/AnimatedBorderCard';

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
    <>
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



          <View className="px-5 space-y-4">
            <View className="my-4" />
            <HostCard host={experience.host} />
            <View className="my-4" />


            <View className="h-6" />

            <InfoSection
              experience={experience}
              spotsLeft={spotsLeft}
            />
            <View className="my-4" />

         
            <BookingStatus isBooked={experience.isBooked} bookingStatus={experience.bookingStatus} />


          </View>
        </ScrollView>

      </SafeAreaView>
      {/* Bottom Safe Area for Sticky Button */}
      <SafeAreaView
        edges={["bottom"]}
        className="absolute left-0 right-0 bottom-0 bg-transparent px-5 pb-3"
      >
        <BookingButton
          isBooked={experience.isBooked}
          bookingLoading={bookingLoading}
          onPress={handleBooking}
          bookingStatus={experience.bookingStatus}
        />
      </SafeAreaView>
    </>
  );
}