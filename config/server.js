import { join } from "path";

import { PATHS, ROOT } from "./config.js";

export default {
  // allowedHosts: "all",
  // bonjour: false,
  client: {
    logging: "info",
    overlay: false,
    progress: true,
  },
  // compress: true,
  devMiddleware: {
    publicPath: "/",
  },
  // headers: {
  //   "X-Custom-Foo": "bar"
  // },
  historyApiFallback: true,
  // host: "local-ip",
  // hot: true,
  // http2: true,
  https: true,
  // ipc: true,
  liveReload: true,
  // onAfterSetupMiddleware: () => {},
  // onBeforeSetupMiddleware(server) {},
  // onListening: () => {},
  open: true,
  // port: 8080,
  // proxy: {
  //   "/api": "http://localhost:3000"
  // },
  setupExitSignals: true,
  static: join(ROOT, PATHS.get("dist")),
  // static: PATHS.get("dist"),
  watchFiles: [join(ROOT, PATHS.get("src"), "**/*.{ejs,html}")],
  // webSocketServer: "",
};
