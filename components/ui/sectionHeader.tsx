import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@/components/ui/text";
import Button from "@/components/ui/button";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
  style?: ViewStyle;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeAll,
  showSeeAll = true,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="header" color="#030303">
        {title}
      </Text>

      {showSeeAll && (
        <Button
          title="See All"
          onPress={onSeeAll}
          backgroundColor="transparent"
          textColor="#0066FF"
          width="auto"
          height="auto"
          paddingHorizontal={0}
          paddingVertical={0}
          textStyle={{ fontWeight: "600", fontSize: 14 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    marginBottom: 8,
  },
});

export default SectionHeader;
