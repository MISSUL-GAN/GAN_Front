const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/member/*',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );

    app.use(
        '/image/*',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );

    app.use(
        '/heart/*',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );

    app.use(
        '/scrap/*',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );

    app.use(
        '/drawing/*',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );
};