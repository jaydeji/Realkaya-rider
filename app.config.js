module.exports = {
  expo: {
    name: 'Realkaya Rider',
    slug: 'realkaya-rider',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    // userInterfaceStyle: 'automatic', //datepicker
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
      bundleIdentifier: 'com.youngmartng.realkayarider',
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
      package: 'com.youngmartng.realkayarider',
    },
    web: {
      favicon: './src/assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: '12574bb5-5532-4a7f-81d0-226c3fa188dd',
      },
    },
    jsEngine: 'hermes',
    plugins: [
      'sentry-expo',
      // 'newrelic-react-native-agent'
    ],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'Realkaya',
            project: 'react-native',
            authToken:
              '710c69ad0e96449cbebdc16432b087d7c2db722a9fad4728a6c539f28cae93b5',
          },
        },
      ],
    },
  },
};
