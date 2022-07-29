module.exports = {
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
  ],
  ignorePatterns: [
    '**/*.html',
    '**/*.css',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    parser: '@babel/eslint-parser',
  },
  rules: {
    'arrow-parens': 0,
    'linebreak-style': 0,
    'implicit-arrow-linebreak': 0,
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
