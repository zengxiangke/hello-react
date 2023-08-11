const HtmlPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const isProdEnv = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack-dev-server').Configuration}
 */
const devServerConfig = {
  open: true,
  static: {
    directory: path.join(__dirname, 'public'),
  },
};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: isProdEnv ? 'production' : 'development',
  devtool: isProdEnv ? 'source-map' : 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name]-[hash].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(md|xlsx?)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'assets/',
      //       },
      //     },
      //   ],
      // },

      {
        test: /[.](js|ts)x?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: './public/index.html',
    }),
  ],

  // for dev server
  devServer: devServerConfig,
};

module.exports = config;
