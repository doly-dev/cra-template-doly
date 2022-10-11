module.exports = {
  extends: ['react-app', 'react-app/jest'],
  // https://stackoverflow.com/questions/66012761/version-of-typescript-not-officially-supported-by-typescript-eslint-parser
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 0,
    'no-restricted-globals': 0,
    'import/no-anonymous-default-export': 0
  }
};
