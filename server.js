import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from './webpack.config.development';

const compiler = webpack(config);
const PORT = 3000;

const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
});

function callback(err) {
  if (err) {
    console.log(err);
  }
  console.log(`Listening at localhost:${PORT}`);
}

server.listen(PORT, 'localhost', callback);
