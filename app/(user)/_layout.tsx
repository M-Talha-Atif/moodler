// app/(user)/_layout.tsx
import { Stack } from "expo-router";

export default function UserLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="experienceDetail" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="notifications" 
        options={{ headerShown: false, title: "Notifications" }} 
      />
      <Stack.Screen 
        name="bookingDetail" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}