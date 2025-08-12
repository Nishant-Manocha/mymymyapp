const { getDefaultConfig } = require("expo/metro-config");
const obfuscatorPlugin = require("obfuscator-io-metro-plugin");

const config = getDefaultConfig(__dirname);

// Only apply obfuscation in production
if (process.env.NODE_ENV === "production") {
  const obfuscatorOptions = {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: "hexadecimal",
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: ["base64"],
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false,
  };

  // Wrap the default transformer with the obfuscator plugin
  config.transformer.babelTransformerPath = obfuscatorPlugin(obfuscatorOptions)(
    config.transformer.babelTransformerPath
  );
}

// Minifier settings (already in your code)
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

  config.transformer.generateSourceMaps = false;
}

// Asset handling
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

config.resolver.platforms = ["ios", "android", "native", "web"];
config.transformer.enableBabelRCLookup = false;
config.cacheStores = [];

module.exports = config;
