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
      <Stack.Screen 
        name="bookingConfirmation" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="editProfile" 
        options={{ headerShown: false }} 
      />
        <Stack.Screen 
        name="editPassword" 
        options={{ headerShown: false }} 
      />
       <Stack.Screen 
        name="insights" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}