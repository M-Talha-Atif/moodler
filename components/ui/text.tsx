import React from "react";
import { Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native";

type Variant =
  | "display"
  | "header"
   | "subheader"   
  | "body"
  | "micro"
  | "label"
  | "caption"
  | "button";

interface CustomTextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
  fontFamily?: string;
  fontWeight?: TextStyle["fontWeight"];
  lineHeight?: number;
  fontSize?: number;
  style?: TextStyle;
}

const variantBase: Record<Variant, TextStyle> = {
  display: { fontSize: 32, fontWeight: "700", letterSpacing: -0.3 },
  header: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "400" },
  subheader: { fontSize: 18, fontWeight: "500" }, 
  micro: { fontSize: 12, fontWeight: "400", letterSpacing: 0.2 },
  label: { fontSize: 16, fontWeight: "500", textTransform: "uppercase" },
  caption: { fontSize: 14, fontWeight: "400" },
  button: { fontSize: 16, fontWeight: "600", textTransform: "uppercase" },
};

export const Text: React.FC<CustomTextProps> = ({
  variant = "body",
  color = "#030303",
  fontFamily = "Nunito",
  fontWeight,
  lineHeight,
  fontSize,
  style,
  children,
  ...props
}) => {
  return (
    <RNText
      {...props}
      style={[
        variantBase[variant],
        {
          color,
          fontFamily,
          fontWeight: fontWeight ?? variantBase[variant].fontWeight,
          lineHeight,
          fontSize: fontSize ?? variantBase[variant].fontSize,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
