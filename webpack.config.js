/*
Copyright (c) 2023, Ingram Micro
All rights reserved.
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');


const generateHtmlPlugin = (title) => {
  const moduleName = title.toLowerCase();

  return new HtmlWebpackPlugin({
    title,
    filename: `${moduleName}.html`,
    template: `./ui/pages/${moduleName}.html`,
    chunks: [moduleName],
  });
};

const populateHtmlPlugins = pagesArray => pagesArray.map(generateHtmlPlugin);

const pages = populateHtmlPlugins([
  'Index',
  'Settings',
]);

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    index: path.resolve(__dirname, 'ui/src/pages/index.js'),
    settings: path.resolve(__dirname, 'ui/src/pages/settings.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'connect_ext_ppr/static'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    ...pages,

    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'ui/images'),
        to: 'images',
      }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ESLintPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              spriteFilename: '[hash:20].svg',
              symbolId: '[folder]_[name]_[hash:6]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    fallback: {
      buffer: require.resolve('buffer'),
    },

    alias: {
      vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'ui/src'),
      '~components': path.resolve(__dirname, 'ui/src/components'),
      '~tools': path.resolve(__dirname, 'ui/src/tools'),
      '~utils': path.resolve(__dirname, 'ui/src/tools/utils'),
      '~helpers': path.resolve(__dirname, 'ui/src/tools/helpers'),
      '~tableHelpers': path.resolve(__dirname, 'ui/src/tools/tableHelpers'),
      '~constants': path.resolve(__dirname, 'ui/src/tools/constants'),
      '~mixins': path.resolve(__dirname, 'ui/src/tools/mixins'),
      '~plugins': path.resolve(__dirname, 'ui/src/tools/plugins'),
      '~views': path.resolve(__dirname, 'ui/src/views'),
      '~styles': path.resolve(__dirname, 'ui/src/styles'),
      '~api': path.resolve(__dirname, 'ui/src/api'),
      '~directives': path.resolve(__dirname, 'ui/src/tools/directives'),
    },
  },
};
