module.exports = {
  hooks: {
    'pre-commit': 'lint-staged && npm run clean && npm run build',
  },
};
