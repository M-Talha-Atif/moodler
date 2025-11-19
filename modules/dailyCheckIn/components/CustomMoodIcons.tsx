// // // src/components/mood-icons/CustomMoodIcons.tsx
// import React from 'react';
// import Svg, { Circle, Path, G } from 'react-native-svg';

// // Custom Duolingo-style character expressions
// export const AngryIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Angry eyebrows */}
//     <Path d="M10 12 Q13 10 16 11" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     <Path d="M22 12 Q19 10 16 11" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     {/* Angry mouth */}
//     <Path d="M11 20 Q16 17 21 20" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//   </Svg>
// );

// export const DisgustedIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Wrinkled nose */}
//     <Path d="M14 15 L18 15" stroke="#EFEFE7" strokeWidth="1.5" />
//     <Path d="M13 16 L19 16" stroke="#EFEFE7" strokeWidth="1.5" />
//     {/* Disgusted mouth */}
//     <Path d="M12 21 Q16 19 20 21" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//   </Svg>
// );

// export const FearfulIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Wide fearful eyes */}
//     <Circle cx="12" cy="13" r="2" fill="#EFEFE7" />
//     <Circle cx="20" cy="13" r="2" fill="#EFEFE7" />
//     {/* Open fearful mouth */}
//     <Circle cx="16" cy="20" r="1.5" fill="#EFEFE7" />
//   </Svg>
// );

// export const HappyIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Happy eyes */}
//     <Path d="M11 13 Q12 14 13 13" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     <Path d="M19 13 Q20 14 21 13" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     {/* Big smile */}
//     <Path d="M11 18 Q16 22 21 18" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//   </Svg>
// );

// export const NeutralIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Neutral eyes */}
//     <Circle cx="12" cy="13" r="1.5" fill="#EFEFE7" />
//     <Circle cx="20" cy="13" r="1.5" fill="#EFEFE7" />
//     {/* Straight mouth */}
//     <Path d="M11 20 L21 20" stroke="#EFEFE7" strokeWidth="2" />
//   </Svg>
// );

// export const SadIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Sad eyes */}
//     <Path d="M11 14 Q12 13 13 14" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     <Path d="M19 14 Q20 13 21 14" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//     {/* Sad mouth */}
//     <Path d="M11 19 Q16 17 21 19" stroke="#EFEFE7" strokeWidth="2" fill="none" />
//   </Svg>
// );

// export const SurprisedIcon = ({ size = 32, color = "#030303" }) => (
//   <Svg width={size} height={size} viewBox="0 0 32 32">
//     <Circle cx="16" cy="16" r="14" fill={color} stroke="#E5E7EB" strokeWidth="0.5"/>
//     {/* Surprised eyes */}
//     <Circle cx="12" cy="13" r="2" fill="#EFEFE7" />
//     <Circle cx="20" cy="13" r="2" fill="#EFEFE7" />
//     {/* Surprised mouth */}
//     <Circle cx="16" cy="20" r="2" fill="#EFEFE7" />
//   </Svg>
// );