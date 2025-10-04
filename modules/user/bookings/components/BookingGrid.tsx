// src/modules/user/bookings/components/BookingGrid.tsx
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { MotiView } from 'moti';
import BookingCard from './BookingCard';
import { Booking } from '../services/bookingService';

interface BookingGridProps {
  bookings: Booking[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  hasMore: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}

export default function BookingGrid({ 
  bookings, 
  loading, 
  loadingMore, 
  refreshing, 
  hasMore, 
  onRefresh, 
  onLoadMore 
}: BookingGridProps) {

  // Render footer with loading indicator or end message
  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View className="py-6 items-center">
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text className="text-gray-600 mt-2 text-sm">Loading more bookings...</Text>
        </View>
      );
    }
    
    if (!hasMore && bookings.length > 0) {
      return (
        <View className="py-6 items-center">
          <Text className="text-gray-500 text-sm">No more bookings to load</Text>
        </View>
      );
    }
    
    return null;
  };

  // Empty state
  const renderEmpty = () => {
    if (loading) return null;
    
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 items-center justify-center p-8"
      >
        <Text className="text-lg text-gray-600 text-center mb-2 font-medium">
          No bookings found
        </Text>
        <Text className="text-sm text-gray-500 text-center">
          Try adjusting your filters or search terms
        </Text>
      </MotiView>
    );
  };

  if (loading && bookings.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-gray-600 mt-4">Loading bookings...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      renderItem={({ item }) => <BookingCard booking={item} />}
      keyExtractor={(item) => item.id}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={[
        { flexGrow: 1, paddingVertical: 8 },
        bookings.length === 0 && { flex: 1 }
      ]}
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
    />
  );
}