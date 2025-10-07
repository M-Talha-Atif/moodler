import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    StyleProp,
    ViewStyle,
    DimensionValue
} from "react-native";

interface CardProps {
    width?: DimensionValue;
    height?: DimensionValue;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
    margin?: number;
    shadow?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    width = 335,
    height = 157,
    backgroundColor = "#d3d3d3",
    borderRadius = 10,
    padding = 10,
    margin = 0,
    shadow = true,
    onPress,
    style,
    children,
}) => {
    const baseStyle: ViewStyle = {
        width,
        height,
        backgroundColor,
        borderRadius,
        padding,
        margin,
        justifyContent: "center",
        alignItems: "center",
        ...(shadow && {
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 3,
        }),
    };

    const content = <View style={[baseStyle, style]}>{children}</View>;

    return onPress ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            {content}
        </TouchableOpacity>
    ) : (
        content
    );
};

export default Card;
