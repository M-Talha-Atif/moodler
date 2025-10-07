import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Edit3 } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ProfileHeaderProps {
  name: string;
  email: string;
  image: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, image }) => (
  <Animated.View entering={FadeInDown.duration(500).springify()} className="items-center mb-8">
    <Image source={{ uri: image }} className="w-28 h-28 rounded-full mb-3" />
    <Text className="text-xl font-bold text-gray-900">{name}</Text>
    <Text className="text-gray-500 text-sm">{email}</Text>

    <TouchableOpacity
      activeOpacity={0.8}
      className="flex-row items-center gap-2 mt-3 bg-emerald-100 px-4 py-2 rounded-full"
    >
      <Edit3 size={16} color="#059669" />
      <Text className="text-emerald-600 font-semibold text-sm">Edit Profile</Text>
    </TouchableOpacity>
  </Animated.View>
);

export default ProfileHeader;
