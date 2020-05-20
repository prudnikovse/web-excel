const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const IS_DEV = process.env.NODE_ENV === 'development'

const cssLoaders = ext => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: IS_DEV,
                reloadAll: true
            }
        },
        'css-loader'
    ]
    if (ext)
        loaders.push(ext)

    return loaders
};

const babelOptions = (...presets) => {
    const opt = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: ['@babel/plugin-proposal-class-properties']
    }

    if (presets)
        presets.forEach(pr => opt.presets.push(pr))

    return opt
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (IS_DEV) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const filename = ext => IS_DEV ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        //список расширений файлов, которые webpack может корректно обработать
        extensions: ['.js', '.json', '.png'],
        //альяс для более короткого указания пути
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: IS_DEV ? 'source-map' : false,
    devServer: {
        port: 3000,
        hot: IS_DEV
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                //минифицируем index.html (только для прода)
                collapseWhitespace: !IS_DEV,
                removeComments: !IS_DEV
            }
        }),
        new CopyPlugin({
            patterns: [
            {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]}),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
                // loader: {
                //     loader: 'babel-loader',
                //     options: babelOptions()
                // }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }
            }
        ]
    }
}
