const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: "./main.js",
  // output: {
  //   path: path.resolve(__dirname, './dist'),
  //   filename: 'index_bundle.js'
  // },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "createElement"
              }]
            ]
          }
        }
      }
    ]
  },
  // plugins: [new HtmlWebpackPlugin()]
}