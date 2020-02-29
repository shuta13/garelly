const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const workboxPlugin = require("workbox-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const SRC_PATH = path.resolve(__dirname, "../src");
const PAGES_PATH = path.resolve(__dirname, "../src/pages");
const PUBLIC_PATH = path.resolve(__dirname, "../public");

module.exports = {
  entry: {
    index: PAGES_PATH + "/index.ts",
    "graphics/index": PAGES_PATH + "/graphics/index.ts"
  },
  output: {
    filename: "[name].js",
    path: PUBLIC_PATH
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "garelly",
      inject: false,
      minify: true,
      chunks: ["index"],
      filename: "index.html",
      template: PAGES_PATH + "/index.html",
      favicon: "assets/favicon.ico"
    }),
    new HtmlWebpackPlugin({
      title: "garelly - graphics",
      inject: false,
      minify: true,
      chunks: ["graphics"],
      filename: "graphics/index.html",
      template: PAGES_PATH + "/graphics/index.html",
      favicon: "assets/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new workboxPlugin.GenerateSW({
      swDest: PUBLIC_PATH + "/sw.js",
      clientsClaim: true,
      skipWaiting: true,
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
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(gif|png|jpg|eot|wof|woff|woff2|ttf|svg)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
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
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          ecma: 6,
          compress: {
            drop_console: true
          },
          output: {
            comments: false,
            beautify: false,
          },
          extractComments: {
            condition: true,
            banner: (f) => {
              return banner;
            },
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
};