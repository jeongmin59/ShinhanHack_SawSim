const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api1",
    createProxyMiddleware({
      target: "https://shbhack.shinhan.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api1": "",
      },
    }),
  );
  app.use(
    "/api2",
    createProxyMiddleware({
      target: "http://34.64.216.247:8080",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    }),
  );
};