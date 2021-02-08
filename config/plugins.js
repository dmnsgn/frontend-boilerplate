import { NODE_ENV } from "./config.js";
import { htmlPages, htmlProcessing, htmlReload } from "./plugins/html.js";
import { cssExtract, cssUnused, cssCritical } from "./plugins/css.js";
import {
  spritesheet,
  svgSprite,
  convertImages,
  // compression,
  pwa,
} from "./plugins/assets.js";
import {
  progress,
  obsolete,
  define,
  banner,
  analyze,
} from "./plugins/utils.js";

export default [
  progress,
  obsolete,
  define,
  ...htmlPages,
  NODE_ENV === "development" ? htmlReload : 0,
  htmlProcessing,
  cssExtract,
  NODE_ENV === "production" ? cssUnused : 0,
  cssCritical,
  svgSprite,
  spritesheet,
  convertImages,
  NODE_ENV === "production" ? banner : 0,
  // NODE_ENV === "production" ? compression : 0,
  NODE_ENV === "production" ? analyze : 0,
  NODE_ENV === "production" ? pwa : 0,
].filter(Boolean);
