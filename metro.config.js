const { getDefaultConfig } = require("expo/metro-config");
// const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Enable code minification and obfuscation for production
if (process.env.NODE_ENV === "production") {
  config.transformer.minifierConfig = {
    mangle: {
      keep_fnames: false,
      toplevel: true,
    },
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ["console.log", "console.info", "console.debug"],
    },
    output: {
      comments: false,
    },
  };
}

// Disable source maps in production for security
if (process.env.NODE_ENV === "production") {
  config.transformer.generateSourceMaps = false;
}

// Configure asset handling
config.resolver.assetExts.push(
  "db",
  "mp3",
  "ttf",
  "obj",
  "png",
  "jpg",
  "jpeg",
  "gif",
  "svg"
);

// Configure module resolution
config.resolver.platforms = ["ios", "android", "native", "web"];

// Enable tree shaking
config.transformer.enableBabelRCLookup = false;

// Configure caching
config.cacheStores = [];

module.exports = config;