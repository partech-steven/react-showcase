const { createProxyMiddleware } = require("http-proxy-middleware");

// This proxy redirects requests to /api endpoints to
// the Express server running on port 3000.
module.exports = function (app) {
  app.use(
    ["/api"],
    createProxyMiddleware({
      target: "http://localhost:3000",
    })
  );
};