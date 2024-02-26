module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Reanimated plugin has to be listed last.
    'react-native-reanimated/plugin',
  ],
}
