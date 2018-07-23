const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const templatesPages = fs.readdirSync('src/templates/').map((item, index) => {
  return new HtmlWebpackPlugin({
    filename: `./${item}`,
    template: __dirname + `/src/templates/${item}`,
    inject: 'head'
  });
});

const config = {
  entry: {
    app: ['./src/app.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
    // filename: '[name].min.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },

      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },

      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: 'images/', // 自定义 css文件 公用目录
              outputPath: 'images/', // 文件存放目录
              name: '[name].[ext]?[hash:8]',
              limit: 8192
            } 
          }
        ]
      },

      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              publicPath: 'images/', // 自定义 css文件 公用目录
              outputPath: 'images/', // 文件存放目录
              name: '[name].[ext]?[hash:8]',
              limit: 8192
            } 
          }
        ]
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

    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),

    new OptimizeCSSAssetsPlugin()

  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'lib'
        },
        default: {
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'utils'
        }
      }
    }
  }
};

config.plugins = config.plugins.concat(templatesPages);

module.exports = config;