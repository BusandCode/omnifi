// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Some packages (e.g. lucide-react-native) ship an "exports" field that
// Metro's newer package-exports resolution can't resolve correctly yet.
// Disabling it falls back to "main"/"module", which works reliably.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;