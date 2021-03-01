module.exports = {
  hooks: {
    'pre-commit': 'npm run lint && lint-staged && npm run clean && npm run build',
  },
};
