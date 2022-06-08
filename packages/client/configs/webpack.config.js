const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = path.join(__dirname, '../build');
const srcDir = path.join(__dirname, 'src');
const srcIndex = path.join(__dirname, '../src/index.html');

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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  output: {
    path: buildDir,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: srcIndex,
    }),
    // new BundleAnalyzerPlugin(),
  ],
  devServer: {
    compress: true,
    contentBase: srcDir,
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 8002,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
