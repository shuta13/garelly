const path = require("path");

const SRC_PATH    = path.resolve(__dirname, "../src");
const PUBLIC_PATH = path.resolve(__dirname, "../public");

module.exports = {
  entry: {
    main: SRC_PATH + "/index.ts"
  },
  output: {
    filename: "[name].js",
    path: PUBLIC_PATH + "/dist/js/"
  },
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