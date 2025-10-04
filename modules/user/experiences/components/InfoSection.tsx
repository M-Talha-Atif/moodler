// src/modules/user/experiences/components/InfoSection.tsx
import { View } from 'react-native';
import { MotiView } from 'moti';
import dayjs from 'dayjs';
import { Experience } from '../services/experienceService';
import InfoRow from './InfoRow';

interface InfoSectionProps {
  experience: Experience;
  spotsLeft: number;
}

export default function InfoSection({ experience, spotsLeft }: InfoSectionProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay: 400 }}
    >
      <View className="bg-card p-5 rounded-2xl border border-border shadow-sm space-y-3">
        <InfoRow label="Location" value={experience.location || "Virtual Experience"} />
        <InfoRow 
          label="Date" 
          value={dayjs(experience.date).format("MMMM D, YYYY")} 
        />
        {experience.sessionStartTime && (
          <InfoRow 
            label="Session Start" 
            value={dayjs(experience.sessionStartTime).format("h:mm A")} 
          />
        )}
        {experience.sessionEndTime && (
          <InfoRow 
            label="Session End" 
            value={dayjs(experience.sessionEndTime).format("h:mm A")} 
          />
        )}
        <InfoRow 
          label="Timezone" 
          value={experience.timezone || "UTC"} 
        />
        <InfoRow 
          label="Spots Available" 
          value={`${spotsLeft} / ${experience.totalSpots}`}
          highlight={spotsLeft < 5}
          warning={spotsLeft < 3}
        />
        <InfoRow 
          label="Price" 
          value={`$${experience.price ?? 0}`}
          highlight 
        />
      </View>
    </MotiView>
  );
}