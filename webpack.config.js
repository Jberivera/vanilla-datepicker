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

const loaders = [
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader?sourceMap',
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('postcss-flexbugs-fixes'),
              require('autoprefixer')({ browsers: ['last 2 versions'] })
            ];
          }
        }
      },
      'sass-loader?sourceMap'
    ],
    include: PATHS.scss
  },
  {
    test: /\.js$/,
    loader: 'babel-loader?cacheDirectory',
    include: [ PATHS.main, PATHS.js ]
  },
  {
    test: /\.js$/,
    loader: 'eslint-loader',
    include: [ PATHS.main, PATHS.js ]
  }
];

const common = {
  entry: PATHS.main,
  output: {
    path: PATHS.build,
    filename: 'datepicker.js',
    library: 'datepicker',
    libraryTarget: 'umd'
  },
  module: {
    rules: loaders
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: false,
      dry: false
    })
  ]
};

module.exports = Object.assign(common, {
  start: {},
  build: {
    module: Object.assign({}, common.module, {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({ browsers: ['last 2 versions'] })
                  ];
                }
              }
            },
            'sass-loader'
          ],
          include: PATHS.scss
        },
        ...loaders.slice(1, loaders.length)
      ]
    }),
    plugins: [
      ...common.plugins,
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
}[TARGET]);
