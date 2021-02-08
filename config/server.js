import HtmlWebpackPlugin from "html-webpack-plugin";

import { PATHS } from "./config.js";

let devServer;
const cache = {};

export class CustomHtmlReloadPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("CustomHtmlReloadPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        "CustomHtmlReloadPlugin",
        (data, cb) => {
          const orig = cache[data.outputName];
          const html = data.html;
          if (orig && orig !== html) {
            devServer.sockWrite(devServer.sockets, "content-changed");
          }
          cache[data.outputName] = html;
          cb();
        }
      );
    });
  }
}

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
  onBeforeSetupMiddleware(server) {
    devServer = server;
  },
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
  transportMode: "ws", // "sockjs"
  useLocalIp: true,
};
