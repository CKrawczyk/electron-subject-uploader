import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  debug: true,

  devtool: 'eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './app/index',
  ],

  output: {
    ...baseConfig.output,
    path: __dirname,
    publicPath: 'http://localhost:3000/dist/',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],

  target: 'electron-renderer',
};
