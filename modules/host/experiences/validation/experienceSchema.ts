import { z } from 'zod';

function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

export const experienceSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  image: z.string().url('Enter a valid image URL'),
  date: z.string().min(1, 'Date is required'),
  isVirtual: z.boolean(),
  location: z.string().min(1, 'Location required for onsite events').max(200).optional(),
  meetLink: z.string().url('Enter a valid meeting link').optional(),
  sessionStartTime: z.string().min(1, 'Start time required'),
  sessionEndTime: z.string().min(1, 'End time required'),
  timezone: z.string().min(1, 'Timezone required'),
  price: z.number().min(0, 'Price must be at least 0').max(999.99, 'Price must be less than $1000'),
  totalSpots: z.number().int('Total spots must be an integer').min(1, 'At least one spot required').max(1000, 'No more than 1000 spots allowed'),
  targetEmotions: z.array(z.string())
    .min(1, 'Select at least one target emotion')
    .max(5, 'You can select up to 5 emotions'),
  desiredOutcomes: z.array(z.string())
    .min(1, 'Select at least one desired outcome')
    .max(5, 'You can select up to 5 outcomes'),
  language: z.string().min(1, 'Language required'),
  culturalTags: z.array(z.string())
    .min(1, 'Select at least one cultural tag')
    .max(8, 'You can select up to 8 tags'),
})
.refine(
  d => d.isVirtual || d.location,
  { message: 'Location required for onsite events', path: ['location'] }
)
.refine(
  d => {
    const start = parseTime(d.sessionStartTime);
    const end = parseTime(d.sessionEndTime);
    return start < end;
  },
  { message: 'End time must be after start', path: ['sessionEndTime'] }
)
.refine(
  d => d.isVirtual ? !!d.meetLink : true,
  { message: 'Meeting link required for virtual events', path: ['meetLink'] }
)
.refine(
  d => new Date(d.date) >= new Date('2025-10-06'),
  { message: 'Date must be today or in the future', path: ['date'] }
);

export type FormData = z.infer<typeof experienceSchema>;