import { NODE_ENV, ROOT, PATHS } from "./config";

import path from "path";
import webpack from "webpack";

import devServer from "./server";
import rules from "./rules";
import plugins from "./plugins";

export default {
  context: path.join(ROOT, PATHS.get("src")),
  entry: {
    main: "./index.js"
  },
  output: {
    chunkFilename:
      NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].js",
    crossOriginLoading: false, // 'anonymous', 'use-credentials'
    hashDigest: "hex",
    hashDigestLength: 8,
    hashFunction: "md5",
    hotUpdateChunkFilename: "[id].[hash].hot-update.js",
    hotUpdateMainFilename: "[hash].hot-update.json",
    filename: NODE_ENV === "production" ? "[name].[chunkhash].js" : "[name].js",
    path: path.join(ROOT, PATHS.get("dist")),
    pathinfo: NODE_ENV === "development",
    publicPath: "/",
    sourceMapFilename: "[file].map",
    sourcePrefix: "\t"
  },
  devServer,
  module: {
    noParse: /jquery/,
    rules
  },
  resolve: {
    alias: {
      Utils: path.join(ROOT, PATHS.get("src"), "utils/"),
      Templates: path.join(ROOT, PATHS.get("src"), "templates/")
    },
    aliasFields: ["browser"],
    descriptionFiles: ["package.json"],
    enforceExtension: false,
    enforceModuleExtension: false,
    extensions: [".js", ".json", ".jsx", ".ts", ".tsx", ".vert", ".frag"],
    mainFields: ["browser", "module", "main"],
    mainFiles: ["index"],
    modules: [`${ROOT}/${PATHS.get("src")}`, "node_modules"],
    unsafeCache: true,
    symlinks: true,
    cachePredicate: () => true
  },
  plugins,
  devtool: NODE_ENV !== "production" ? "source-map" : false
};
