import React, { forwardRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";

interface BottomSheetProps {
  title?: string;
  children?: React.ReactNode;
}

const BottomSheet = forwardRef<Modalize, BottomSheetProps>(
  ({ title, children }, ref) => {
    return (
      <Modalize
        ref={ref}
        adjustToContentHeight
        handlePosition="inside"
        modalStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 20,
          borderColor: "#d1d5db",
          borderWidth: 1,
        }}
        handleStyle={{
          backgroundColor: "#d1d5db",
          width: 50,
        }}
      >
        {/* Title */}
        {title && (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              fontFamily: "Nunito",
              color: "#030303",
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
        )}

        {/* Content */}
        <View>{children}</View>
      </Modalize>
    );
  }
);

export default BottomSheet;
