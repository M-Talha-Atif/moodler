// app/(tabs)/_layout.tsx - NEW FILE
import { Tabs } from 'expo-router';

export default function UserLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
    </Tabs>
  );
}