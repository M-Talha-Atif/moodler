import { View, Text, TouchableOpacity, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MotiView } from "moti";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
  gradientColors?: string[];
  height?: number; // Recommended range: 60–100
}

export default function Header({
  title,
  showBackButton = false,
  rightContent,
  gradientColors = ["#3B82F6", "#6366F1"],
  height = 80, // Default mid-height
}: HeaderProps) {
  const router = useRouter();

  // Dynamic sizing based on height
  const fontSize =
    height >= 95 ? 26 : height >= 80 ? 22 : height >= 70 ? 20 : 18;
  const iconSize = height >= 90 ? 24 : height >= 75 ? 22 : 20;
  const buttonPadding = height >= 90 ? 10 : 8;

  return (
    <MotiView
      from={{ opacity: 0, translateY: -8 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 350 }}
      className="w-full absolute top-0 left-0 z-50"
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full shadow-sm"
        style={{
          height,
          paddingHorizontal: 16,
        }}
      >
        <SafeAreaView edges={["top"]} className="flex-1 justify-center">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-shrink">
              {showBackButton && (
                <TouchableOpacity
                  onPress={() => router.back()}
                  className="rounded-full bg-white/15 active:bg-white/25 mr-3"
                  style={{ padding: buttonPadding }}
                  accessibilityLabel="Go back"
                >
                  <ArrowLeft size={iconSize} color="white" />
                </TouchableOpacity>
              )}

              <Text
                style={{
                  fontSize,
                }}
                className="text-white font-bold font-display"
                numberOfLines={1}
              >
                {title}
              </Text>
            </View>

            {/* Optional right-side content */}
            {rightContent ? <View>{rightContent}</View> : null}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </MotiView>
  );
}
