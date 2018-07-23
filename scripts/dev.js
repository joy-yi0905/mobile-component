const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

config.mode = 'development';
config.entry.app.unshift('webpack-dev-server/client?http://localhost:8080/');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  inline: true,
  historyApiFallback: true
});

server.listen(8080);

compiler.hooks.done.tap('load', () => {

  console.log('启动成功...')
});
