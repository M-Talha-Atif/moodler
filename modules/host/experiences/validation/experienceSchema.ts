import { z } from "zod";

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

    date: z
      .date()
      .refine((d) => {
        const now = new Date();
        const today = new Date(now.setHours(0, 0, 0, 0));
        const selected = new Date(d.setHours(0, 0, 0, 0));

        console.log(" Now (raw):", now.toString());
        console.log("Today (start of day):", today.toString());
        console.log("Selected Date (raw):", d.toString());
        console.log("Selected (normalized):", selected.toString());
        console.log("Comparison (selected >= today):", selected >= today);

        return selected >= today;
      }, {
        message: "Date cannot be in the past",
      }),


    isVirtual: z.boolean({ required_error: "Specify if the event is virtual" }),

    // Location / Link
    location: z
      .string({ required_error: "Specify if the event is virtual" })
      .max(200, "Location must be under 200 characters")
      .optional(),

    meetLink: z.string().optional(),

    // Start / End Time (stored as readable strings)
    sessionStartTime: z.date({ required_error: "Start time is required" }),
    sessionEndTime: z.date({ required_error: "End time is required" }),


    timezone: z.string().min(1, "Timezone is required"),

    // Price / Spots
    price: z
      .number({ required_error: "Price is required" })
      .min(0, "Price must be at least 0")
      .max(999.99, "Price must be less than $1000"),

    totalSpots: z
      .number({ required_error: "Total spots are required" })
      .int("Total spots must be an integer")
      .min(1, "At least one spot required")
      .max(1000, "No more than 1000 spots allowed"),

    language: z
      .string({ required_error: "Language is required" })
      .min(1, "Language is required"),

  })
  // Require location if not virtual
  .refine((d) => d.isVirtual || !!d.location, {
    message: "Location required for onsite events",
    path: ["location"],
  })

  .refine((d) => {
    if (!d.isVirtual) return true;          // No meetLink needed
    if (!d.meetLink) return false;          // Required if virtual

    const urlPattern = /^https?:\/\/.+/i;
    return urlPattern.test(d.meetLink);     // validate URL only if needed
  }, {
    message: "Enter a valid meeting link",
    path: ["meetLink"],
  })

  //  Ensure end time is after start time
  // Ensure end time is after start time (with debug logs)
  .refine((d) => {
    const start = new Date(d.sessionStartTime);
    const end = new Date(d.sessionEndTime);

    // Compare local time values directly (ignore UTC offset)
    const startMs = start.getHours() * 60 + start.getMinutes();
    const endMs = end.getHours() * 60 + end.getMinutes();

    console.log("Local Start:", start.toString());
    console.log("Local End:", end.toString());
    console.log("Local Comparison:", endMs > startMs);

    return endMs > startMs;
  }, {
    message: "End time must be after start time",
    path: ["sessionEndTime"],
  });



export type FormData = z.infer<typeof experienceSchema>;
