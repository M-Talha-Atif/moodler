// metro.config.js - CONFIRM THIS FILE EXISTS
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");


const config = getDefaultConfig(__dirname);

// Add modules directory to watch
config.watchFolders = [
  __dirname,
  __dirname + "/modules", // for nativewind to work in modules folder
];
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts.push("svg");

module.exports = withNativeWind(config, { input: "./global.css" });
