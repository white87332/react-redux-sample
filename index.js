const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.development.config');

const app = express();
const port = 3000;

const compiler = webpack(config);

app.use(express.static(path.resolve('public')));

if (process.env.NODE_ENV !== 'production')
{
    app.use(webpackDevMiddleware(compiler,
        {
            noInfo: true,
            publicPath: config.output.publicPath
        }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(require('prerender-node'));

app.get('*', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
{
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
