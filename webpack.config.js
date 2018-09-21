const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
    entry:path.join(__dirname,'./src/main.js'),
    output: {
        path: path.join(__dirname,'./dist'),
        filename: 'bundle.js'
    },
    module: {   //配置第三方模块加载器
        rules: [
          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
              ]
           },
           {
            test: /\.less$/, 
            use: [
                'style-loader',
                'css-loader',
                'less-loader'
            ]
           },
           {
            test: /\.jpg|png|gif|bmp|jpeg$/,
            use: [
              'file-loader?limit=7631&name=[hash]-[name].[ext]'
            ]
           },
           {
            test: /\.(woff|svg|woff2|eot|ttf|otf)$/,
            use: [
               'file-loader'
            ]
           },
           {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/
           },
           {
            test: /\.vue$/,
            use: 'vue-loader'
           }
        ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new VueLoaderPlugin(),
      new htmlWebpackPlugin({
        //内存中生成HTML的页面插件
        title: 'index',
        template: path.join(__dirname,'./src/index.html'),
        filename: 'index.html'
      })
    ]
}