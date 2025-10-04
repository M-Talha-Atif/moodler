// src/modules/user/bookings/components/StatsCards.tsx
import { View, Text } from 'react-native';
import { MotiView } from 'moti';
import { Calendar, Clock, RefreshCw } from 'lucide-react-native';
import { BookingStats } from '../services/bookingService';

interface StatsCardsProps {
  stats: BookingStats;
  loading: boolean;
  error?: string | null;
}

export default function StatsCards({ stats, loading, error }: StatsCardsProps) {
  const statsData = [
    {
      label: 'Upcoming',
      value: stats.upcoming,
      icon: Calendar,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: Clock,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20'
    },
    {
      label: 'Total',
      value: stats.total,
      icon: RefreshCw,
      color: 'text-info',
      bg: 'bg-info/10',
      border: 'border-info/20'
    }
  ];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 200 }}
      className="px-5 pb-4"
    >
      {error && (
        <Text className="text-destructive text-sm text-center mb-2">
          {error}
        </Text>
      )}

      <View className="flex-row justify-between gap-3">
        {statsData.map((stat, index) => (
          <MotiView
            key={stat.label}
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: 300 + (index * 100) }}
            className={`flex-1 rounded-xl p-4 border ${stat.bg} ${stat.border}`}
          >
            <View className="items-center">
              <stat.icon size={20} className={stat.color} />
              <Text className={`text-sm font-medium mt-1 ${stat.color}`}>
                {stat.label}
              </Text>
              <Text className={`text-2xl font-bold mt-1 ${stat.color}`}>
                {loading ? "—" : stat.value}
              </Text>
            </View>
          </MotiView>
        ))}
      </View>
    </MotiView>
  );
}