// app/(tabs)/(user)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function UserTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="index">
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />

      {/*  Hidden route inside tabs */}
      <Tabs.Screen
        name="experienceDetail"
        options={{
          href: null, // hides it from tab bar
          headerShown: false,
          title: "Experience Detail",
        }}
      />
      {/* Hidden route inside tabs */}
      <Tabs.Screen
        name="notifications"
        options={{
          href: null, // hides it from tab bar
          headerShown: true,
          title: "Notifications",
        }}
      />
      {/* Hidden route inside tabs */}
      <Tabs.Screen
        name="bookingDetail"
        options={{
          href: null, // hides it from tab bar
          headerShown: false,
          title: "Booking Detail",
        }}
      />
    </Tabs>
  );
}
