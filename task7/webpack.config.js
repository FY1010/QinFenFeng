const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevServer = require('webpack-dev-server')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false, // 不加的话会有这种情况 img属性src="[object Module]"
              limit: 1024 * 100, // 当大于100kb时候，将文件打包到publicPath中
              outputPath: 'images', // 将文件打包到哪里
              publicPath: 'images/',
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    })
  ],
  devServer: {    //本地服务配置
    contentBase: path.join(__dirname, 'dist'),  // 需要挂载文件目录
    progress: true,  // 是否显示进度条
    compress: true,  // 是否压缩
    port: 8080,  // 端口号
  },
}
