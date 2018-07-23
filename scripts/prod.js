const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = require('../webpack.config');

config.mode = 'production';
config.plugins.push(new CleanWebpackPlugin(['dist'], {
  root: process.cwd()
}));

const compiler = webpack(config);

compiler.run((err, stats) => {
  if (err) {
    console.log(err);
  } else {
    console.log('打包成功...')
  }
});