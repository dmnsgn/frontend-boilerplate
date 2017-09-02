import path from "path";
import fs from "fs";

import ExtractTextPlugin from "extract-text-webpack-plugin";

import { NODE_ENV } from "./config";
import { htmlIndex } from "./plugins/html";
import { spritesheet } from "./plugins/assets";
import { uglify, commons, manifest } from "./plugins/optimize";
import {
  define,
  HMR,
  namedModules,
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
  NODE_ENV === "development" ? namedModules : hashedModuleIds,
  htmlIndex,
  NODE_ENV === "production" ? extractCSS : 0,
  spritesheet,
  NODE_ENV === "production" ? uglify : 0,
  commons,
  manifest,
  NODE_ENV === "production" ? banner : 0,
  NODE_ENV === "development" ? npmInstall : 0,
  NODE_ENV === "production" ? buildInfo : 0
].filter(Boolean);
