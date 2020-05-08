const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


const isDev= process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    let config = {
        splitChunks: {
            chunks: 'all'
        }
    };

    if(isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()    
        ]
    }

    return config;
}

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ];

    if(isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, './src/'),
    entry: {
        main: ['@babel/polyfill','./app/js/index.js'],
        swiper: './app/js/Swiper.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devServer: {
        port: 8080,
        hot: isDev
    },
    devtool: isDev? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin(
        {
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })

    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        hmr: isDev,
                        reloadAll: true
                      },
                    },
                    'css-loader'
                  ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.png', '.css'],
        alias: {
            'js': './src/app/js',
            'css@': './src/app/css',
            'img': './src/app/img'
        }
    },
    optimization: optimization()

}