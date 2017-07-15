'use strict';
const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = (options) => {

  let webpackConfig = {
    devtool: options.devtool,
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './app/theme/index.html'
      }),
      new Webpack.ProvidePlugin({
        _: 'underscore',
        $: 'jquery',
        jQuery: 'jquery',
        Backbone: 'backbone',
        Bb: 'backbone',
        Marionette: 'backbone.marionette',
        Mn: 'backbone.marionette',
      }),
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['syntax-async-functions', 'transform-regenerator'],
        },
      }, {
        test: /\.jst$/,
        loader: 'underscore-template-loader',
      }, {
        test: /\.s?css$/i,
        loaders: ['style', 'css']
      }],
    },
    resolve: {
      //fallback: path.resolve(__dirname, 'node_modules'),
      root: Path.join(__dirname, './app/components'),
    },
    resolveLoader: {
      root: Path.join(__dirname, './node_modules'),
    }
  };

  if (options.isProduction) {

    webpackConfig.plugins.push(
      new Webpack.optimize.DedupePlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.AggressiveMergingPlugin()
    );

    /*
    webpackConfig.module.loaders.push({
      test: /\.scss$/i,
      loader: ExtractSASS.extract(['css', 'sass'])
    });*/

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin()
    );

    webpackConfig.devServer = {
      hot: true,
      port: options.port,
      inline: true,
      progress: true,
      proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
        }
      },
    };
  }

  webpackConfig.entry = [];
  if (!options.isProduction) {
    webpackConfig.entry.push(`webpack-dev-server/client?http://localhost:${options.port}`);
    webpackConfig.entry.push('webpack/hot/dev-server');
  }
  webpackConfig.entry.push('./core/init');

  return webpackConfig;

};
