import ExtractTextPlugin from "extract-text-webpack-plugin";

import { NODE_ENV } from "./config";
import { htmlIndex } from "./plugins/html";
import { spritesheet } from "./plugins/assets";
import {
  define,
  HMR,
  hashedModuleIds,
  banner,
  buildInfo,
  npmInstall
} from "./plugins/utils";

const extractCSS = new ExtractTextPlugin("index.[contentHash].css");

export { extractCSS };

export default [
  define,
  NODE_ENV === "development" ? HMR : 0,
  NODE_ENV === "production" ? hashedModuleIds : 0,
  htmlIndex,
  NODE_ENV === "production" ? extractCSS : 0,
  spritesheet,
  NODE_ENV === "production" ? banner : 0,
  // NODE_ENV === "development" ? npmInstall : 0,
  NODE_ENV === "production" ? buildInfo : 0
].filter(Boolean);
