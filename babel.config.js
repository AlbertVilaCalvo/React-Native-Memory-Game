module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // The Reanimated plugin has to be listed last.
    'react-native-reanimated/plugin',
  ],
}
