const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    /**
     * /Api/... => http://localhost:1313/Api/...
     */
    app.use(proxy('/service', {
        target: 'https://mom.phuongdongbank.vn/admin',
        changeOrigin: true,
        logLevel: 'debug'
    }));
};