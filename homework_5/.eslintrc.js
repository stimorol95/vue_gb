module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/recommended',        // /base, /essential, /strongly-recommended, /recommended
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "semi": [2, "always"],
    'vue/max-attributes-per-line': 'off',
    "quotes": ["off", "double"],
    'no-console': 'off',
    "semi": "off"
  },
};
