import path from "path";
import SpritesmithPlugin from "webpack-spritesmith";

import { ROOT, PATHS } from "../config";

const spritesheet = new SpritesmithPlugin({
  src: {
    cwd: path.join(ROOT, PATHS.get("src"), "assets/sprites/"),
    glob: "*.png"
  },
  target: {
    image: path.join(ROOT, PATHS.get("src"), "assets/sprite.png"),
    css: [
      path.join(ROOT, PATHS.get("src"), "assets/sprite.scss"),
      path.join(ROOT, PATHS.get("src"), "assets/sprite.less"),
      path.join(ROOT, PATHS.get("src"), "assets/sprite.styl"),
      path.join(ROOT, PATHS.get("src"), "assets/sprite.json")
    ]
  },
  apiOptions: {
    cssImageRef: "~sprite.png"
  },
  spritesmithOptions: {
    padding: 2,
    algorithm: "binary-tree"
  },
  retina: "@2x"
});

export { spritesheet };
