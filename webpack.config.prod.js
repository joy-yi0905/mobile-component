var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
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

      // {
      //   test: /\.less$/,
      //   loader: 'style-loader!css-loader!less-loader'
      // },

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
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './content-box.html',
      template: __dirname + '/src/templates/content-box.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './grid.html',
      template: __dirname + '/src/templates/grid.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './icon.html',
      template: __dirname + '/src/templates/icon.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './button.html',
      template: __dirname + '/src/templates/button.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './navbar.html',
      template: __dirname + '/src/templates/navbar.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './toolbar.html',
      template: __dirname + '/src/templates/toolbar.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './list.html',
      template: __dirname + '/src/templates/list.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './form.html',
      template: __dirname + '/src/templates/form.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './card.html',
      template: __dirname + '/src/templates/card.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './search.html',
      template: __dirname + '/src/templates/search.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './footer-sticky.html',
      template: __dirname + '/src/templates/footer-sticky.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './pop-toast.html',
      template: __dirname + '/src/templates/pop-toast.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './pop-loading.html',
      template: __dirname + '/src/templates/pop-loading.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './pop-dialog.html',
      template: __dirname + '/src/templates/pop-dialog.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './pop-popup.html',
      template: __dirname + '/src/templates/pop-popup.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './tab-switch.html',
      template: __dirname + '/src/templates/tab-switch.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './accordion.html',
      template: __dirname + '/src/templates/accordion.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './timeline.html',
      template: __dirname + '/src/templates/timeline.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './num-pad.html',
      template: __dirname + '/src/templates/num-pad.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './img-upload.html',
      template: __dirname + '/src/templates/img-upload.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './date-picker.html',
      template: __dirname + '/src/templates/date-picker.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './countdown.html',
      template: __dirname + '/src/templates/countdown.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './slide.html',
      template: __dirname + '/src/templates/slide.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      filename: './slide-fullpage.html',
      template: __dirname + '/src/templates/slide-fullpage.html',
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