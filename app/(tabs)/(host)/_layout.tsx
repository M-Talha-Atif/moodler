// app/(tabs)/(host)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HostTabs() {
  return (
    <Tabs screenOptions={{
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
      initialRouteName="index">
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
        name="manageExperiences"
        options={{
          title: "Experiences",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
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
        name="createExperience"
        options={{
          href: null,
          headerShown: false,
          title: "Create Experience",
        }}
      />

      <Tabs.Screen
        name="updateExperience"
        options={{
          href: null,
          headerShown: false,
          title: "Update Experience",
        }}
      />
    </Tabs>
  );
}
