// https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Coding_Style/Formatting_JS_Code_With_Prettier_and_eslint
// https://eslint.org/docs/user-guide/configuring/rules
// https://eslint.org/docs/rules/

module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': 'off',
    quotes: 'off',
    'no-trailing-spaces': 'off',
    semi: 'off',
  },
}
