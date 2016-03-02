var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry:
    {
        app: [
            'webpack-hot-middleware/client',
            './public/src/containers/app'
        ]
    },
    output:
    {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/public/asset/js/bundle/',
        chunkFilename: "bundle.[name].js"
    },
    resolve:
    {
        "extensions": ["", ".js", ".jsx"]
    },
    module:
    {
        loaders: [
        {
            test: /\.js?$/,
            loader: 'babel',
            include: path.resolve(__dirname, 'public'),
            exclude: /node_modules/
        },
        {
            test: /\.json$/,
            loader: "json-loader"
        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },
        {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
