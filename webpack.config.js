const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  main: path.join(__dirname, 'datepicker.js'),
  build: path.join(__dirname, 'dist'),
  scss: path.join(__dirname, 'scss'),
  js: path.join(__dirname, 'js')
};

const common = {
  entry: PATHS.main,
  output: {
    path: PATHS.build,
    filename: 'datepicker.js',
    library: 'datepicker',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap',
        include: PATHS.scss
      },
      {
        test: /\.js$/,
        loaders: ['babel?cacheDirectory'],
        include: [ PATHS.main, PATHS.js ]
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: false,
      dry: false
    })
  ],
  postcss: function () {
    return [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({ browsers: ['last 2 versions'] })
    ];
  }
};

module.exports = Object.assign(common, {
  start: {},
  build: {
    plugins: [
      ...common.plugins,
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}[TARGET]);
