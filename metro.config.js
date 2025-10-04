// metro.config.js - CONFIRM THIS FILE EXISTS
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Add modules directory to watch
config.watchFolders = [
  __dirname,
  __dirname + "/modules", // for nativewind to work in modules folder
];

module.exports = withNativeWind(config, { input: "./global.css" });
