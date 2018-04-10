const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require("awesome-typescript-loader");

const commonConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          typeCheck: true,
          emitErrors: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  plugins: [new CheckerPlugin()],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
  },
};

// {
//   target: "electron-renderer",
//   entry: "./src/renderer/index.ts",
//   output: {
//     filename: "renderer.js",
//     path: `${path.join(__dirname, "dist")}`,
//   },
// },

module.exports = {
  ...{
    target: "electron-main",
    entry: "./src/index.ts",
    output: {
      filename: "index.js",
    },
    ...commonConfig,
  },
};
