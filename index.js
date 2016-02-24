var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var app = express();
var port = 3000;

var compiler = webpack(config);
var rootPath = path.normalize(__dirname);

app.use(express.static(rootPath + '/public'));
app.use(webpackDevMiddleware(compiler,
{
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

app.get('*', function(req, res)
{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, function(error)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});
