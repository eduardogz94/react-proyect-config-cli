module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: true,
        },
      },
    ],
    "@babel/preset-react",
    "@babel/flow",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    "@babel/plugin-proposal-nullish-coalescing-operator",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: false,
      },
    ],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {},
      },
    ],
  ],
};
