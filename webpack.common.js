const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const copyFiles = new CopyWebpackPlugin([
  { from: 'src/views/', to: 'views/' }
]);

module.exports = {
  entry: [
    './src/client/index.js',
    'tachyons/css/tachyons.css'
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
            test: /\.js$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader')
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    copyFiles
  ]
};
