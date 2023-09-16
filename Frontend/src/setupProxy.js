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
      target: "https://sawsim.site/api",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    }),
  );
};