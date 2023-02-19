module.exports = {
  expo: {
    name: 'carigo-rider',
    slug: 'carigo-rider',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'light',
    // splash: {
    //   image: './assets/splash.png',
    //   resizeMode: 'contain',
    //   backgroundColor: '#ffffff',
    // },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          'The RealKaya App uses your location to pick origins, destinations, and predict ride times',
        NSLocationAlwaysUsageDescription:
          "The RealKaya App will use your location to provide ETA's to yourself and others",
        UIBackgroundModes: ['location', 'fetch'],
      },
      bundleIdentifier: 'com.youngmartng.realkaya',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      permissions: [
        'ACCESS_COARSE_LOCATION',
        'ACCESS_FINE_LOCATION',
        'ACCESS_BACKGROUND_LOCATION',
      ],
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    userInterfaceStyle: 'automatic', //datepicker
    extra: {
      eas: {
        projectId: '5647e6c7-03a1-4afb-a257-e5bedd906c70',
      },
    },
    jsEngine: 'hermes',
  },
};
