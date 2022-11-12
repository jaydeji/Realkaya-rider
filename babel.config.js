module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'module:react-native-dotenv',
      //must be last
      'react-native-reanimated/plugin',
    ],
  };
};
