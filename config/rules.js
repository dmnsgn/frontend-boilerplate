import { markup, ejs, markdown } from "./loaders/markup.js";
import { scripts } from "./loaders/scripts.js";
import { css, sass, less, stylus, fonts } from "./loaders/styles.js";
import { images, videos, svg } from "./loaders/media.js";
import { shader } from "./loaders/shader.js";

export default [
  {
    test: /\.(pdf|txt)$/,
    type: "asset/resource",
  },
  {
    test: /\.(xml)$/,
    type: "asset/source",
  },
  markup,
  ejs,
  markdown,
  scripts,
  css,
  sass,
  less,
  stylus,
  fonts,
  images,
  videos,
  svg,
  shader,
];
