var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry:
    {
        app: [
            './public/src/containers/app',
        ]
    },
    output:
    {
        path: path.resolve(__dirname, 'public'),
        filename: '/asset/js/bundle/bundle.min.js',
        chunkFilename: "/asset/js/bundle/chunk.[name].min.js"
    },
    // devtool: "source-map",
    // resolve:
    // {
    //     alias:
    //     {
    //         jqueryLazyload: './public/asset/js/jquery/jquery.lazyload.min.js',
    //         i18Next: './public/asset/js/i18Next/i18Next.min.js'
    //     },
    //     "extensions": ["", ".js", ".jsx"]
    // },
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
            test: /\.css|\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader",
                "css-loader!sass-loader!postcss-loader"
            )
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'url-loader?limit=8192&name=./asset/img/[name].[ext]'
        }]
    },
    postcss: [
        autoprefixer
    ],
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}),
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'asset/js/vendors.min.js'),
        new ExtractTextPlugin('./asset/css/bundle/bundle.min.css', { allChunks: true }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' })
    ]
};
