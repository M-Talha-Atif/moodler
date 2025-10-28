import { z } from "zod";

// Helper: Convert Date → "hh:mm AM/PM"
function toTimeString(val: unknown) {
  if (!(val instanceof Date)) return val;
  let hours = val.getHours();
  const minutes = val.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // 0 => 12
  return `${hours}:${minutes} ${ampm}`;
}

// Helper: Compare two time strings (e.g. "3:45 PM")
function parseTimeToMinutes(t: string) {
  const [time, ampm] = t.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let total = hours % 12 + (ampm === "PM" ? 12 : 0);
  return total * 60 + minutes;
}

export const experienceSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(5, "Title must be at least 5 characters"),

    description: z
      .string({ required_error: "Description is required" })
      .min(20, "Description must be at least 20 characters"),

    image: z
      .string({ required_error: "Event image is required" })
      .url("Please select a valid image"),

    // 🗓️ Date — must not be in the past
    date: z.preprocess(
      (val) => (val instanceof Date ? val : new Date(val as any)),
      z
        .date({ required_error: "Date is required" })
        .refine((d) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return d >= today;
        }, { message: "Date cannot be in the past" })
    ),

    isVirtual: z.boolean({ required_error: "Specify if the event is virtual" }),

    // 📍 Location / Link
    location: z
      .string()
      .max(200, "Location must be under 200 characters")
      .optional(),

    meetLink: z.string().url("Enter a valid meeting link").optional(),

    // 🕒 Start / End Time (stored as readable strings)
    sessionStartTime: z.preprocess(
      toTimeString,
      z.string({ required_error: "Start time is required" })
    ),
    sessionEndTime: z.preprocess(
      toTimeString,
      z.string({ required_error: "End time is required" })
    ),

    timezone: z.string().min(1, "Timezone is required"),

    // 💰 Price / Spots
    price: z
      .number({ required_error: "Price is required" })
      .min(0, "Price must be at least 0")
      .max(999.99, "Price must be less than $1000"),

    totalSpots: z
      .number({ required_error: "Total spots are required" })
      .int("Total spots must be an integer")
      .min(1, "At least one spot required")
      .max(1000, "No more than 1000 spots allowed"),

    // 🎯 Focus
    targetEmotions: z
      .array(z.string(), { required_error: "Select at least one target emotion" })
      .min(1, "Select at least one emotion")
      .max(5, "No more than 5 emotions"),

    desiredOutcomes: z
      .array(z.string(), { required_error: "Select at least one desired outcome" })
      .min(1, "Select at least one outcome")
      .max(5, "No more than 5 outcomes"),

    language: z
      .string({ required_error: "Language is required" })
      .min(1, "Language is required"),

    culturalTags: z
      .array(z.string(), { required_error: "Select at least one cultural tag" })
      .min(1, "Select at least one tag")
      .max(8, "No more than 8 tags"),
  })
  // Require location if not virtual
  .refine((d) => d.isVirtual || !!d.location, {
    message: "Location required for onsite events",
    path: ["location"],
  })
  // Require meetLink if virtual
  .refine((d) => !d.isVirtual || !!d.meetLink, {
    message: "Meeting link required for virtual events",
    path: ["meetLink"],
  })
  // 🕑 Ensure end time is after start time
  .refine(
    (d) =>
      !d.sessionStartTime ||
      !d.sessionEndTime ||
      parseTimeToMinutes(d.sessionEndTime) >
        parseTimeToMinutes(d.sessionStartTime),
    {
      message: "End time must be after start time",
      path: ["sessionEndTime"],
    }
  );

export type FormData = z.infer<typeof experienceSchema>;
