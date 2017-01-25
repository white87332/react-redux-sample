const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry:
    {
        app: [
            'webpack-hot-middleware/client',
            'babel-polyfill',
            './public/src/containers/app'
        ]
    },
    output:
    {
        path: '/asset/js/bundle/',
        filename: 'bundle.js',
        publicPath: '/asset/js/bundle/',
        chunkFilename: 'chunk.[id].js'
    },
    module:
    {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel',
                include: path.resolve(__dirname, 'public'),
                exclude: /node_modules/
            },
            {
                test: /\.css|\.scss$/,
                use: [
                    'style',
                    {
                        loader: 'css',
                        options: {
                            options: { modules: false }
                        }
                    },
                    'sass?outputStyle=compressed',
                    'postcss'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
            }
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '\'development\'' }),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer] } })
    ]
};
