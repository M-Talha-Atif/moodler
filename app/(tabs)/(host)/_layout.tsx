import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HostTabs() {
  return (
    <Tabs   screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#030303", // main dark color
        tabBarInactiveTintColor: "#8E8E8E", // muted gray
        tabBarStyle: {
          backgroundColor: "#FAFAF8", // matches your app background
          borderTopColor: "#E8E8E6", // subtle separator
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Nunito",
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
    </Tabs>
  );
}
