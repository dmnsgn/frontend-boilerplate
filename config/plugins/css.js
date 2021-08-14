import glob from "glob";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import PurgecssPlugin from "purgecss-webpack-plugin";
import Critters from "critters-webpack-plugin";
import { createRequire } from "module";

import { PATHS, NODE_ENV } from "../config.js";

const cssExtract = new MiniCssExtractPlugin({
  filename:
    NODE_ENV !== "production" ? "[name].css" : "[name].[contenthash].css",
  chunkFilename:
    NODE_ENV !== "production" ? "[id].css" : "[id].[contenthash].css",
  ignoreOrder: true,
});

const cssUnused = new PurgecssPlugin({
  paths: glob.sync(`${PATHS.get("src")}/**/*`, { nodir: true }),
  variables: true,
  safelist: [/^hljs-/, /^::-webkit/],
});

// TODO: https://github.com/GoogleChromeLabs/critters/pull/62
const require = createRequire(import.meta.url);

var PLUGIN_NAME = "critters-webpack-plugin";
function tap(inst, hook, pluginName, async, callback) {
  if (inst.hooks) {
    var camel = hook.replace(/-([a-z])/g, function (s, i) {
      return i.toUpperCase();
    });
    inst.hooks[camel][async ? "tapAsync" : "tap"](pluginName, callback);
  } else {
    inst.plugin(hook, callback);
  }
}
Critters.prototype.apply = function apply(compiler) {
  var this$1 = this;

  tap(compiler, "compilation", PLUGIN_NAME, false, function (compilation) {
    require("html-webpack-plugin")
      .getHooks(compilation)
      .beforeEmit.tapAsync(PLUGIN_NAME, (htmlPluginData, callback) => {
        this$1
          .process(compiler, compilation, htmlPluginData.html)
          .then((html) => {
            callback(null, { html });
          })
          .catch(callback);
      });
  });
};

const cssCritical = new Critters({
  // external: true,
  // inlineThreshold: 0,
  // minimumExternalSize: 0,
  // pruneSource: true,
  // mergeStylesheets: true,
  // additionalStylesheets: []
  preload: "swap", // "body" | "media" | "swap" | "js" | "js-lazy"
  // noscriptFallback: true,
  // inlineFonts: false,
  // preloadFonts: true,
  keyframes: "critical", // "all" | "none",
  // compress: true,
  // logLevel: "info", // "info" | "warn" | "error" | "trace" | "debug" | "silent"
});

export { cssExtract, cssUnused, cssCritical };
