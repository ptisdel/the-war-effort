const path = require('path');
const dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const buildDir = path.join(__dirname, './build');
const srcDir = path.join(__dirname, './src');
const srcIndex = path.join(__dirname, './src/index.html');

const myenv = dotenv.config().parsed;

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
      // settings used by webpack-dev-server
      devServer: {
        compress: true,
        historyApiFallback: true,
        hot: true,
        open: shouldOpenAutomatically,
        port: 8001,
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
    output: {
      path: buildDir,
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        GOOGLE_MAPS_API_KEY: myenv.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY,
        MAPBOX_ACCESS_TOKEN: myenv.MAPBOX_ACCESS_TOKEN || process.env.MAPBOX_ACCESS_TOKEN,
        SERVER_URL: myenv.SERVER_URL || process.env.SERVER_URL,
      }),
      new HtmlWebpackPlugin({
        template: srcIndex,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
};
