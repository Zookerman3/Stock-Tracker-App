const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.quiverquant.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/beta',
            },
        })
    );
};