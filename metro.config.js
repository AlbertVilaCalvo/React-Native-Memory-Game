const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {}

// https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#step-3-wrap-metro-config-with-reanimated-wrapper-recommended
module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(getDefaultConfig(__dirname), config),
)
