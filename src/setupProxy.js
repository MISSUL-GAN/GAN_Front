const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/member/me',
        createProxyMiddleware({
            target: 'https://api.missulgan.art:443',
            changeOrigin: true,
        })
    );
};