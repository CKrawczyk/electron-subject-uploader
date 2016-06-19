import path from 'path';
import webpack from 'webpack';

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.css$/,
      loader: 'style!css',
    }, {
      test: /\.styl$/,
      loader: 'style-loader!css-loader!stylus-loader',
    }],
    // suppress warning about the fact that sugar-client is precompiled
    noParse: [/sugar-client/],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.css', '.styl'],
  },
  plugins: [
    // needed to make panoptes-client work with electron
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
  ],
};
