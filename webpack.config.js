/* eslint-env node */
const path = require('path');

module.exports = {
  resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
          path.resolve('./src'),
          'node_modules'
      ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              'react',
              ['es2015', {modules: false}],
              'stage-2'
            ]
          }
        }],
      },
    ],
  }
};