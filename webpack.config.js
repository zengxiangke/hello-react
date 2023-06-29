const HtmlPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const isProdEnv = process.env.NODE_ENV === 'production';

/**
 * @type {import('webpack-dev-server').Configuration}
 */
const devServerConfig = {};

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  mode: isProdEnv ? 'production' : 'development',
  devtool: isProdEnv ? 'source-map' : 'inline-source-map',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
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
        test: /\.tsx?$/,
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
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],

  // for dev server
  devServer: devServerConfig,
};

module.exports = config;
