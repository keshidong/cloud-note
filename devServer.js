const proxy = require('http-proxy-middleware');
const Bundler = require('parcel-bundler');
const express = require('express');

const bundler = new Bundler('src/index.html', {
    cache: false
});

const app = express();

app.use(
    '/v1',
    proxy({
        target: 'http://localhost:8685'
    })
)

app.use(bundler.middleware());

app.listen(Number(process.env.PORT || 1234));
