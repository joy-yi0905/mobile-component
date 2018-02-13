var path = require('path');
var fs = require('fs');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var templatesPages = fs.readdirSync('src/templates/').map((item, index) => {
  return new HtmlWebpackPlugin({
    filename: `./${item}`,
    template: __dirname + `/src/templates/${item}`,
    inject: 'head'
  });
});

var prodConfig = {
  entry: {
    zepto: ['n-zepto'],
    ['mc']: path.resolve(__dirname, './src/app.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    // publicPath: 'http://www.xx.com/project/res'
    publicPath: ''
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.less$/i,
        loader:  ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '../'
        })
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },

      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash:8]'
　　　},

      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: 'head'
    }),
    new ExtractTextPlugin('css/mc.min.css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['zepto']
    }),
    new CleanWebpackPlugin(
      [
        'dist',         // 移除 'dist' 文件夹
        //'build/*.*',    // 移除 'build' 文件夹里有后缀名的文件
        //'web/*.js'      // 移除 'web' 文件夹中所有的js文件
      ]
    )
  ]
};

prodConfig.plugins = prodConfig.plugins.concat(templatesPages);

module.exports = prodConfig;