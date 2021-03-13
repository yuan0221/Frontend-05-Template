module.exports = {
  entry: "./main.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],

            // jsx插件将jsx翻译成 React.createElement 的一个函数调用
            plugins: ["@babel/plugin-transform-react-jsx"],

            // 1. 这里配置 pragma 的值为 createElement，可以将 React.createElement 变为 createElement
            // 2. 这样和 React 就毫无关联了，下文可以自己实现 createElement 方法
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "createElement"
              }]
            ],
          }
        }
      }
    ]
  }
}