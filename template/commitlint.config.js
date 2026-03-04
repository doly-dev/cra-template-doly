// ref: https://commitlint.js.org/reference/configuration.html
module.exports = { 
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [0],
    'body-max-line-length': [2, 'always', 300]
  } 
};
