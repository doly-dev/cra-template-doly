module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  rules: {
    "jsx-a11y/anchor-is-valid": 0,
    "no-restricted-globals": 0,
    "@typescript-eslint/consistent-type-imports": [1, {
      prefer: 'type-imports',
      disallowTypeAnnotations: true,
    }]
  }
}