import { markup, ejs } from "./loaders/markup";
import { scripts } from "./loaders/scripts";
import { css, sass, less, stylus, fonts } from "./loaders/styles";
import { images, svg } from "./loaders/images";
import { shader } from "./loaders/shader";

export default [
  markup,
  ejs,
  scripts,
  css,
  sass,
  less,
  stylus,
  fonts,
  images,
  svg,
  shader
];
