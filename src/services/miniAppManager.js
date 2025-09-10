import AsyncStorage from '@react-native-async-storage/async-storage';

const MINI_APPS_CACHE_KEY = 'tansen_mini_apps';

// Mock data for now - will be replaced with Turso DB API calls in Step 4
const mockMiniApps = [
  {
    id: 'face-detector',
    name: 'Face Detector',
    description: 'Detect personalities from faces',
    icon: 'face',
    status: 'available',
    route: 'FaceDetectorHome',
    requiredNativeLibs: ['vision-camera', 'fast-tflite'],
    codePushKey: null, // Will be set up in CodePush configuration
  },
  {
    id: 'photo-editor',
    name: 'Photo Editor',
    description: 'Advanced photo editing tools',
    icon: 'photo',
    status: 'coming-soon',
    route: null,
    requiredNativeLibs: ['image-processing'],
    codePushKey: null,
  },
  {
    id: 'voice-notes',
    name: 'Voice Notes',
    description: 'Record and organize voice memos',
    icon: 'mic',
    status: 'coming-soon',
    route: null,
    requiredNativeLibs: ['audio-recorder'],
    codePushKey: null,
  },
];

export const fetchMiniApps = async () => {
  try {
    // Try to get cached data first
    const cachedData = await AsyncStorage.getItem(MINI_APPS_CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      // Check if cache is less than 1 hour old
      if (Date.now() - parsed.timestamp < 3600000) {
        return parsed.data;
      }
    }

    // TODO: Replace with actual Turso DB API call in Step 4
    // For now, return mock data
    const miniApps = mockMiniApps;

    // Cache the data
    await AsyncStorage.setItem(
      MINI_APPS_CACHE_KEY,
      JSON.stringify({
        data: miniApps,
        timestamp: Date.now(),
      })
    );

    return miniApps;
  } catch (error) {
    console.error('Error fetching mini-apps:', error);
    return mockMiniApps; // Fallback to mock data
  }
};

export const checkMiniAppSupport = async (miniApp) => {
  // List of native libraries available in current APK
  // This will be updated as we add more native dependencies
  const installedLibs = [
    'vision-camera',
    'fast-tflite',
    'react-navigation',
    'react-native-paper',
    'async-storage',
  ];

  // Check if all required native libs are available
  const isSupported = miniApp.requiredNativeLibs.every(lib =>
    installedLibs.includes(lib)
  );

  if (isSupported && miniApp.codePushKey) {
    try {
      // TODO: Implement CodePush sync in Step 1 CodePush configuration
      // await CodePush.sync({ deploymentKey: miniApp.codePushKey });
      return true;
    } catch (error) {
      console.error('CodePush sync failed:', error);
      return false;
    }
  }

  return isSupported;
};

export const clearMiniAppsCache = async () => {
  try {
    await AsyncStorage.removeItem(MINI_APPS_CACHE_KEY);
  } catch (error) {
    console.error('Error clearing mini-apps cache:', error);
  }
};
