import { join } from "path";

import { PATHS, ROOT } from "./config.js";

export default {
  // bonjour: false,
  // client: {},
  compress: true,
  dev: {
    publicPath: "/",
  },
  // firewall: ['192.168.0.1', 'domain.com']
  firewall: false,
  // headers: {
  //   "X-Custom-Foo": "bar"
  // },
  port: 8080,
  historyApiFallback: true,
  hot: true,
  http2: true,
  https: true,
  // injectClient: false,
  // injectHot: false,
  liveReload: true,
  // onAfterSetupMiddleware: () => {},
  // onBeforeSetupMiddleware(server) {},
  // onListening: () => {},
  open: true,
  // openPage: ['/different/page1', '/different/page2'],
  // proxy: {
  //   "/api": "http://localhost:3000"
  // },
  // public: "myapp.test:80",
  setupExitSignals: true,
  // static: path.join(ROOT, PATHS.get("dist")),
  static: PATHS.get("dist"),
  transportMode: "ws", // "sockjs",
  watchFiles: [join(ROOT, PATHS.get("src"), "**/*.{ejs,html}")],
};
