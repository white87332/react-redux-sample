var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry:
    {
        app: [
            'babel-polyfill',
            './public/src/containers/app',
        ]
    },
    output:
    {
        path: path.resolve(__dirname, 'public'),
        filename: '/asset/js/bundle/bundle.min.js',
        chunkFilename: "/asset/js/bundle/chunk.[name].min.js"
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
            loader: ExtractTextPlugin.extract(
                {
                    fallbackLoader: 'style',
                    loader: [
                        { loader: 'css'},
                        'sass',
                        'postcss'
                    ]
                }
            )
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
        }]
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            options: {
                postcss: [ autoprefixer ]
            }
        }),
        new ExtractTextPlugin({
            filename:'./asset/css/bundle/bundle.min.css',
            allChunks: false
        })
    ]
};
