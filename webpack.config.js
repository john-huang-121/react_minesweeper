const path = require("path");

module.exports = {
  mode: "development",
  entry: "./frontend/app.jsx",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, ".")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};