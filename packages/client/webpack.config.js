const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildDir = path.join(__dirname, './build');
const srcDir = path.join(__dirname, './src');
const srcIndex = path.join(__dirname, './src/index.html');

module.exports = (env, argv) => {
  const shouldOpenAutomatically = (env.open === 'true');
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  return {
    // DEVELOPER MODE CONFIG
    ...(isDevelopment && {
      mode: 'development',
      performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
      },
      devtool: 'eval-source-map',
      devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: shouldOpenAutomatically,
        port: 8002,
        static: srcDir,
      },
    }),
    // PRODUCTION MODE CONFIG
    ...(isProduction && {
      mode: 'production',
    }),
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
      new Dotenv(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
};
