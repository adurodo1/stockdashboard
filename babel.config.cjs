module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ],

  plugins: [
    ["babel-plugin-transform-vite-meta-env"],
    ["babel-plugin-transform-import-meta", { module: "ES6" }],
  ],
};
