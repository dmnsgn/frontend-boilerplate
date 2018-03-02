import { PATHS } from "./config";

// https://webpack.js.org/configuration/dev-server/
export default {
  // allowedHosts: [],
  // bonjour: true,
  clientLogLevel: "info",
  compress: true,
  contentBase: PATHS.get("dist"),
  disableHostCheck: true,
  // filename: "bundle.js",
  // headers: {
  //   "X-Custom-Foo": "bar"
  // },
  historyApiFallback: true,
  host: "0.0.0.0",
  hot: true,
  // hotOnly: true,
  https: true,
  inline: true,
  // lazy: true,
  noInfo: false,
  open: true,
  // openPage: '/api',
  // overlay: true,
  // pfx: "/path/to/file.pfx",
  // pfxPassphrase: "passphrase",
  port: 8080,
  // proxy: {
  //   "/api": "http://localhost:3000"
  // },
  // public: "myapp.test:80",
  // publicPath: "/assets/",
  quiet: false,
  // setup(app) {
  //   app.get("/some/path", function(req, res) {
  //     res.json({ custom: "response" });
  //   });
  // }
  // socket: "socket",
  // staticOptions: {
  //   redirect: false
  // },
  stats: "normal", // "errors-only" | "minimal" | "none" | "normal" | "detailed" | "verbose"
  // useLocalIp: true,
  watchContentBase: false
  // watchOptions: {
  //   poll: true
  // }
};
