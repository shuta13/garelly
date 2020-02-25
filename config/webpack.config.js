const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "../src");
const PAGES_PATH = path.resolve(__dirname, "../src/pages");
const PUBLIC_PATH = path.resolve(__dirname, "../public");

module.exports = {
  entry: {
    index: PAGES_PATH + "/index.ts",
    contents: PAGES_PATH + "/contents/contents.ts"
  },
  output: {
    filename: "[name].js",
    path: PUBLIC_PATH
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "garelly",
      inject: false,
      minify: false,
      chunks: ["index"],
      filename: "index.html",
      template: PAGES_PATH + "/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "garelly - contents",
      inject: false,
      minify: false,
      chunks: ["contents"],
      filename: "contents.html",
      template: PAGES_PATH + "/contents/contents.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
    ],
    extensions: [
      ".ts",
      ".js",
      "json"
    ]
  }
};