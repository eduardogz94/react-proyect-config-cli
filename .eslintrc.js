module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    //More rules in: http://eslint.org/docs/rules/
    'comma-dangle': 0, // standard: 2 // too many errors to fix now
    'no-cond-assign': 2,
    'no-console': 2,
    'no-constant-condition': 0, // standard: 2 //  to be changed in the near future
    'no-debugger': 2,
    //'no-extra-parens': 2,
    'no-useless-escape': 0,
    'no-case-declarations': 0,
    'no-extra-boolean-cast': 0, // standard: 2 //  to be changed in the near future
    'no-extra-semi': 2,
    'no-fallthrough': 0, // standard: 2 //  to be changed in the near future
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-undef': 2,
    'no-unreachable': 2,
    'no-unused-vars': [
      2,
      {
        args: 'after-used',
      },
    ],
    'no-use-before-define': 1,
  },
  globals: {
    test: false,
    expect: false,
    jest: false,
    describe: false,
    it: false,
  },
};
