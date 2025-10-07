import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function UserTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4ADE80", //  primary (vibrant green)
        tabBarInactiveTintColor: "#94A3B8", // muted foreground
        tabBarStyle: {
          backgroundColor: "#FFFFFF", // clean white base
          borderTopColor: "#E2E8F0", // subtle border
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
      initialRouteName="index"
    >
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Hidden Screens */}
      <Tabs.Screen
        name="experienceDetail"
        options={{
          href: null,
          headerShown: false,
          title: "Experience Detail",
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          headerShown: true,
          title: "Notifications",
        }}
      />
      <Tabs.Screen
        name="bookingDetail"
        options={{
          href: null,
          headerShown: false,
          title: "Booking Detail",
        }}
      />
    </Tabs>
  );
}
