module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  env: {
    es6: true,
    browser: true,
  },
  rules: {
    'no-console': 0,
  },
};
