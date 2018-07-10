const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyFiles = new CopyWebpackPlugin([
  { from: 'src/views/', to: 'views/' }
]);

module.exports = {
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(svg|png)$/,
            loader: require.resolve('url-loader')
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader')
          }
        ]
      }
    ]
  },
  plugins: [
    copyFiles
  ]
};
