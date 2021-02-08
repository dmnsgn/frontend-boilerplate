import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import webpackConfig from "../index.js";
import { NODE_ENV } from "../config.js";

const compiler = webpack(webpackConfig);

try {
  if (NODE_ENV === "development") {
    const server = new WebpackDevServer(compiler, webpackConfig.devServer);
    server.listen();
  } else {
    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(
        stats.toString({
          chunks: false,
          entrypoints: false,
          hash: false,
          version: false,
          modules: false,
          colors: true,
        })
      );
    });
  }
} catch (error) {
  console.error(error);
}
