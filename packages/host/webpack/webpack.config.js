const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = path.join(__dirname, '../build');
const srcDir = path.join(__dirname, '../src');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    path: buildDir,
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: path.resolve(srcDir, 'index.html'),
    }),
  ],
  devServer: {
    contentBase: srcDir,
    historyApiFallback: true,
    open: true,
    port: 8002,
  },
};
