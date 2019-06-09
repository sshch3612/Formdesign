/**
 * Created by sushaochun on 2017/11/16.
 */
var path              = require('path'),
    webpack           = require('webpack');
var root_path         = path.resolve(__dirname),
    src_path          = path.resolve(root_path, 'src'),//入口根目录
    dist_path         = path.resolve(root_path, 'dist');//出口根目录
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app:  path.resolve(src_path, 'index.js'),
    },
    output:{   
        filename:'[name].js',
        path:path.resolve(dist_path)
    },
    resolve: {      
        modules: [__dirname, 'src', 'node_modules'],
        alias: {
            applicationStyles: 'app/styles/app.scss',//文件别名
            "@": path.resolve("src")
        },
        extensions: ['*', '.js', '.jsx'],//省略后缀名
    },
    mode: 'development',
    module:{
        rules:[//文件加载方式
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test:/\.(css|less)$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(woff|svg|eot|ttf)#?.*$/,
                use:"url-loader"
            },
            {
                test:/.(jpg|png|gif|jpeg)$/,
                use:'url-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9001
      }
}

