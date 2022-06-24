module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  rules: {
    'linebreak-style': 0,
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }],
    quotes: ['error', 'single'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.ts', '.js', '.jsx'],
      },
    },
  },
};
