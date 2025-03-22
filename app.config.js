export default {
  name: 'Jwandoon',
  slug: 'jwandoon',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#6200ee'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  plugins: [
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission: "Allow Jwandoon to use your location."
      }
    ],
    'expo-notifications'
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.jwandoon'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#6200ee'
    },
    package: 'com.jwandoon'
  },
  extra: {
    eas: {
      projectId: "your-project-id"
    }
  }
} 