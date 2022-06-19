const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = path.join(__dirname, './build');
const srcDir = path.join(__dirname, './src');
const srcIndex = path.join(__dirname, './src/index.html');

module.exports = {
  devtool: 'eval-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            rootMode: 'upward',
          },
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
      template: srcIndex,
    }),
  ],
  // settings used by webpack-dev-server
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8001,
    static: srcDir,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
