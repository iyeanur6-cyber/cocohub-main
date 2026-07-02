// metro.config.js
// Extends Expo's default Metro config with web-safe aliases for native-only modules.

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclude the website subfolder so Metro doesn't try to bundle Next.js files
config.watchFolders = (config.watchFolders ?? []).filter(
  (f) => !String(f).includes('website'),
);
config.resolver = config.resolver ?? {};
config.resolver.blockList = [
  /website[\\/].*/,
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : []),
];

// On web, redirect native-only modules to lightweight stubs so the bundler
// doesn't crash. The stubs are located in src/__web_stubs__/.
const STUBS_DIR = path.resolve(__dirname, 'src/__web_stubs__');

config.resolver = config.resolver ?? {};
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'web') {
    const STORYBOOK_DIR = path.resolve(__dirname, '.storybook');

    const stubs = {
      // Storybook — loads native-only @gorhom/bottom-sheet, skip entirely on web
      [path.join(STORYBOOK_DIR, 'index.js')]: path.join(STORYBOOK_DIR, 'index.web.js'),
      '@storybook/react-native': path.join(STUBS_DIR, 'storybook.js'),
      '@gorhom/bottom-sheet': path.join(STUBS_DIR, 'storybook.js'),
      // Native modules
      'expo-sqlite': path.join(STUBS_DIR, 'expo-sqlite.js'),
      'expo-screen-capture': path.join(STUBS_DIR, 'expo-screen-capture.js'),
      'expo-local-authentication': path.join(STUBS_DIR, 'expo-local-authentication.js'),
      'expo-background-fetch': path.join(STUBS_DIR, 'expo-background-fetch.js'),
      'expo-task-manager': path.join(STUBS_DIR, 'expo-task-manager.js'),
      'expo-secure-store': path.join(STUBS_DIR, 'expo-secure-store.js'),
      'react-native-maps': path.join(STUBS_DIR, 'react-native-maps.js'),
      'react-native-webrtc': path.join(STUBS_DIR, 'react-native-webrtc.js'),
      'react-native-keychain': path.join(STUBS_DIR, 'react-native-keychain.js'),
      'react-native-ssl-pinning': path.join(STUBS_DIR, 'react-native-ssl-pinning.js'),
      'expo-in-app-purchases': path.join(STUBS_DIR, 'expo-in-app-purchases.js'),
      'expo-barcode-scanner': path.join(STUBS_DIR, 'expo-barcode-scanner.js'),
      'react-native-image-resizer': path.join(STUBS_DIR, 'react-native-image-resizer.js'),
      'react-native-webview': path.join(STUBS_DIR, 'react-native-webview.js'),
      'react-native-pager-view': path.join(STUBS_DIR, 'react-native-pager-view.js'),
    };

    if (stubs[moduleName]) {
      return { filePath: stubs[moduleName], type: 'sourceFile' };
    }
  }

  // Default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
