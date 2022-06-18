module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base',
    'plugin:cypress/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  plugins: [
    'react',
  ],
  root: true,
  rules: {
    'linebreak-style': 0,
    'arrow-parens': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'no-use-before-define': ['error', { functions: false, classes: true }],
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-filename-extension': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    'import/parsers': {
      '@babel/eslint-parser': ['.js'],
    },
  },
};
