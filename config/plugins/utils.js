import fs from "fs";
import path from "path";
import webpack from "webpack";
import NpmInstallPlugin from "npm-install-webpack-plugin";
import { StatsWriterPlugin } from "webpack-stats-plugin";

import { NODE_ENV, ROOT, PATHS, BANNER } from "../config";

const define = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(NODE_ENV === "development"),
  __PRODUCTION__: JSON.stringify(NODE_ENV === "production")
});

const HMR = new webpack.HotModuleReplacementPlugin();

const hashedModuleIds = new webpack.HashedModuleIdsPlugin();

const banner = new webpack.BannerPlugin({
  banner: BANNER,
  raw: false,
  entryOnly: false
});

const buildInfo = new StatsWriterPlugin({
  filename: "stats.json"
});

// https://github.com/webpack-contrib/npm-install-webpack-plugin/issues/105
const npmInstall = new NpmInstallPlugin({
  dev: false,
  peerDependencies: true,
  quiet: false
});

export { define, HMR, hashedModuleIds, banner, buildInfo, npmInstall };
