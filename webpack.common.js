const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const copyFiles = new CopyWebpackPlugin([
  { from: 'src/views/', to: 'views/' },
]);

module.exports = {
  entry: {
    bundle: ['./src/client/index.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.svg$/,
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
              // Remove the quotes from the url
              // (they’re unnecessary in most cases)
              noquotes: true,
            },
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: require.resolve('url-loader'),
            options: {
              // Inline files smaller than 10 kB (10240 bytes)
              limit: 10 * 1024,
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: require.resolve('babel-loader'),
          },
          {
            test: /\.css$/,
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
            ],
          },
          // "file" loader makes sure assets end up in the `build` folder.
          // When you `import` an asset, you get its filename.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: 'images/[name].[ext]',
            },
            enforce: 'post',
          },
        ],
      },
    ],
  },
  plugins: [
    copyFiles,
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
