const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const SRC_PATH    = path.resolve(__dirname, "../src");
const PUBLIC_PATH = path.resolve(__dirname, "../public");

module.exports = {
  entry: {
    index: SRC_PATH + "/pages/index.ts",
    contents: SRC_PATH + "/pages/contents.ts"
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
      template: "src/pages/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "garelly - contents",
      inject: false,
      minify: false,
      chunks: ["contents"],
      filename: "contents.html",
      template: "src/pages/contents.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
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
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: "vendor",
          chunks: 'initial',
          enforce: true
        }
      }
    }
  }
};