const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './src/popup/popup.js',
    content: './src/content/content.js',
    background: './src/background/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: '88' // Chrome Extension Manifest V3 minimum version
                }
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
          to: 'manifest.json'
        },
        {
          from: 'src/assets/icons',
          to: 'images'
        },
        {
          from: 'src/popup/popup.html',
          to: 'popup.html'
        }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  mode: 'production'
};
