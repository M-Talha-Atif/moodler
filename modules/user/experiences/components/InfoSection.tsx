// src/modules/user/experiences/components/InfoSection.tsx
import React from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import dayjs from 'dayjs';
import InfoRow from './InfoRow';
import { Experience } from '../services/experienceService';
import { Dimensions } from 'react-native';

interface InfoSectionProps {
  experience: Experience;
  spotsLeft: number;
}
const screenWidth = Dimensions.get('window').width;


function getFittedText(text: string, fontSize = 16, padding = 80) {
  // Estimate how many characters can fit
  const usableWidth = screenWidth - padding;
  const charWidth = fontSize * 0.8; // approx width per character
  const maxChars = Math.floor(usableWidth / charWidth);

  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + '...';
}

export default function InfoSection({ experience, spotsLeft }: InfoSectionProps) {
  const infoRows = [
    {
      label: 'Location',
      value: getFittedText(experience.location) || 'Virtual Experience',
      icon: experience.location ? 'location-outline' : 'globe-outline',
    },
    {
      label: 'Date',
      value: dayjs(experience.date).format('MMMM D, YYYY'),
      icon: 'calendar-outline',
    },
    ...(experience.sessionStartTime
      ? [{ label: 'Session Start', value: dayjs(experience.sessionStartTime).format('h:mm A'), icon: 'time-outline' }]
      : []),
    ...(experience.sessionEndTime
      ? [{ label: 'Session End', value: dayjs(experience.sessionEndTime).format('h:mm A'), icon: 'time-outline' }]
      : []),
    {
      label: 'Timezone',
      value: experience.timezone || 'UTC',
      icon: 'time-outline',
    },
    {
      label: 'Spots Available',
      value: `${spotsLeft} / ${experience.totalSpots}`,
      icon: 'people-outline',
      highlight: spotsLeft < 5,
      warning: spotsLeft < 3,
      showProgress: true,
    },
    {
      label: 'Price',
      value: `$${experience.price ?? 0}`,
      icon: 'cash-outline',
      highlight: true,
    },
  ];

  return (
    <MotiView
      from={{ opacity: 0, translateY: 15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 300 }}
    >
      <View className="p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3 relative overflow-hidden bg-card"
       style={{ borderColor: experience.isBooked ? '#7bf163' : '#E2E8F0' }}>
       
        <View className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" />

        {infoRows.map((row, index) => (
          <MotiView
            key={row.label}
            from={{ opacity: 0, translateX: -15 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 100,
              delay: 350 + index * 80,
            }}
          >
            <InfoRow {...row} />
            {/* Optional separator between rows */}
            {index < infoRows.length - 1 && (
              <View className="h-[1px] bg-gray-100 mt-2" />
            )}
          </MotiView>
        ))}
      </View>
    </MotiView>
  );
}
