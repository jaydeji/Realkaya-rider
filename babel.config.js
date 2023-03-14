module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module:react-native-dotenv',
        {
          allowUndefined: false,
        },
      ],
      //must be last
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.json',
            '.jsx',
            '.tsx',
            '.ts',
          ],
        },
      ],
    ],
  };
};
