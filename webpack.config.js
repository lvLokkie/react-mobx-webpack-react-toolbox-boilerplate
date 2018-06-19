/**
 * @author Ryazanov I.A
 * Webpack configuration
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostCssImport = require('postcss-import');
const PostCssNext = require('postcss-cssnext');

const PATHS = {
  modules: path.join(__dirname, 'node_modules'),
  public: path.join(__dirname, 'public'),
  src: path.join(__dirname, 'src'),
};

module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 300,
    ignored: /node_modules/,
  },
  context: PATHS.src,
  entry: {
    index: ['./index.js'],
  },
  output: {
    filename: '[name].js',
    publicPath: '/',
    path: PATHS.public,
  },
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only',
    contentBase: PATHS.public,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: loader => [
                PostCssImport({ root: loader.resourcePath }),
                PostCssNext,
              ],
            },
          },
          'sass-loader', // compiles Sass to CSS
        ],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                indent: 'postcss',
                plugins: loader => [
                  PostCssImport({ root: loader.resourcePath }),
                  PostCssNext,
                ],
              },
            },
            'less-loader',
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]!postcss-loader'],
        }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.(woff2?$|ttf$|eot$|svg$|png|jpe?g|gif$)/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
  resolve: {
    alias: {
      Scenes: path.join(PATHS.src, '/scenes/'),
      Components: path.join(PATHS.src, '/components/'),
      Services: path.join(PATHS.src, '/services/'),
    },
  },
};
