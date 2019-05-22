import path from "path";
import SpritesmithPlugin from "webpack-spritesmith";
import CompressionPlugin from "compression-webpack-plugin";
import OfflinePlugin from "offline-plugin";

import { ROOT, PATHS } from "../config";

const spritesheet = new SpritesmithPlugin({
  src: {
    cwd: path.join(ROOT, PATHS.get("src"), "assets/sprites/"),
    glob: "*.png"
  },
  target: {
    image: path.join(ROOT, PATHS.get("src"), "assets/sprite.png"),
    css: [
      path.join(ROOT, PATHS.get("src"), "assets/sprite.scss")
      // path.join(ROOT, PATHS.get("src"), "assets/sprite.less"),
      // path.join(ROOT, PATHS.get("src"), "assets/sprite.styl"),
      // path.join(ROOT, PATHS.get("src"), "assets/sprite.json")
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

const compression = new CompressionPlugin({
  test: /\.(html|css|js|svg)(\?.*)?$/i,
  // Default to gzip
  cache: false,
  filename: "[path].gz[query]",
  algorithm: "gzip",
  // See https://nodejs.org/api/zlib.html#zlib_class_options
  compressionOptions: { level: 9 },
  threshold: 0,
  minRatio: 0.8,
  deleteOriginalAssets: false

  // For Zopfli (npm install @gfx/zopfli --save-dev)
  // compressionOptions: {
  //   numiterations: 15
  // },
  // algorithm(input, compressionOptions, callback) {
  //   return zopfli.gzip(input, compressionOptions, callback);
  // }

  // For Brotli
  // filename: "[path].br[query]",
  // algorithm: "brotliCompress",
  // compressionOptions: { level: 11 },
  // threshold: 10240,
  // minRatio: 0.8,
  // deleteOriginalAssets: false
});

const offline = new OfflinePlugin();

export { spritesheet, compression, offline };
