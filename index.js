const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.development.config');

const app = express();
const port = 3001;

const compiler = webpack(config);

app.use(express.static(path.resolve('public')));

if (process.env.NODE_ENV !== 'production')
{
    app.use(require('webpack-dev-middleware')(compiler,
        {
            noInfo: true,
            publicPath: config.output.publicPath
        }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(require('prerender-node').set('prerenderServiceUrl', 'http://localhost:3000/'));

app.get('*', (req, res) =>
{
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
{
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
});
