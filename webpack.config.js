const webpack = require('webpack');

const path = require('path');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  main: path.join(__dirname, 'datepicker.js'),
  build: path.join(__dirname, 'build'),
  scss: path.join(__dirname, 'scss'),
  js: path.join(__dirname, 'js')
};

const common = {
  entry: PATHS.main,
  output: {
    path: PATHS.build,
    filename: 'js/datepicker.js',
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
      }
    ]
  },
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
    output: Object.assign({}, common.output, {
      filename: 'js/datepicker.min.js'
    }),
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}[TARGET]);
