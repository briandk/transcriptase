const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
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
