import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ObsoleteWebpackPlugin from "obsolete-webpack-plugin";

import { NODE_ENV, BANNER, BROWSERS } from "../config.js";

const define = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(NODE_ENV === "development"),
  __PRODUCTION__: JSON.stringify(NODE_ENV === "production"),
});

const banner = new webpack.BannerPlugin({
  banner: BANNER,
  raw: false,
  entryOnly: false,
  exclude: /\.svg$/,
});

const progress = new webpack.ProgressPlugin();

const analyze = new BundleAnalyzerPlugin({
  analyzerMode: NODE_ENV === "production" ? "static" : "disabled",
  generateStatsFile: true,
  openAnalyzer: false,
});

const obsolete = new ObsoleteWebpackPlugin({
  browsers: BROWSERS,
});

export { define, banner, progress, analyze, obsolete };
