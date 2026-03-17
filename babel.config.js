module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started#react-native-community-cli
    // Must be the last plugin
    'react-native-worklets/plugin',
  ],
}
