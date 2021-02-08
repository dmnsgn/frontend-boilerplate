import { join } from "path";

import imagemin from "imagemin";
import webp from "imagemin-webp";
import sharp from "sharp";
import SpritesmithPlugin from "webpack-spritesmith";
import SpriteLoaderPlugin from "svg-sprite-loader/plugin.js";
import ConvertAssetsPlugin from "convert-assets-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import WorkboxWebpackPlugin from "workbox-webpack-plugin";

import { ROOT, PATHS, NODE_ENV } from "../config.js";

const spritesheet = new SpritesmithPlugin({
  src: {
    cwd: join(ROOT, PATHS.get("src"), "assets/sprites/"),
    glob: "*.png",
  },
  target: {
    image: join(ROOT, PATHS.get("src"), "assets/sprite.png"),
    css: [
      // join(ROOT, PATHS.get("src"), "assets/sprite.scss"),
      // join(ROOT, PATHS.get("src"), "assets/sprite.less"),
      // join(ROOT, PATHS.get("src"), "assets/sprite.styl"),
      join(ROOT, PATHS.get("src"), "assets/sprite.json"),
    ],
  },
  apiOptions: {
    cssImageRef: "~sprite.png",
  },
  spritesmithOptions: {
    padding: 2,
    algorithm: "binary-tree",
  },
  retina: "@2x",
});

const svgSprite = new SpriteLoaderPlugin({ plainSprite: true });

const convertImages = new ConvertAssetsPlugin([
  {
    test: /\.(jpe?g|png)/,
    verbose: NODE_ENV === "production",
    filename: (name) => `${name}.avif`,
    async convertBuffer(buffer) {
      return await sharp(buffer).avif().toBuffer();
    },
  },
  {
    test: /\.(jpe?g|png)/,
    verbose: NODE_ENV === "production",
    filename: (name) => `${name}.webp`,
    async convertBuffer(buffer) {
      return await imagemin.buffer(buffer, {
        plugins: [
          webp({
            quality: 75,
            method: 6,
          }),
        ],
      });
    },
  },
]);

const compression = new CompressionPlugin({
  test: /\.(html|css|js|svg)(\?.*)?$/i,
  // Default to gzip
  filename: "[path][base].gz[query]",
  algorithm: "gzip",
  // See https://nodejs.org/api/zlib.html#zlib_class_options
  compressionOptions: { level: 9 },
  threshold: 0,
  minRatio: 0.8,
  deleteOriginalAssets: true,
  exclude: /.map$/,
  deleteOriginalAssets: "keep-source-map",

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

const pwa = new WorkboxWebpackPlugin.GenerateSW({
  clientsClaim: true,
  skipWaiting: true,
  sourcemap: false,
  // Exclude mp4 (optionally containing hash)
  exclude: [/\.map$/, /^manifest.*\.js$/, /\.mp4(?::(\d+))?/],
  // exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, '**/*.mp4'],
  // runtimeCaching: [
  //   {
  //     urlPattern: new RegExp("\\.mp4$"),
  //     handler: "CacheFirst",
  //     options: {
  //       cacheName: "precache",
  //       plugins: [
  //         {
  //           cacheKeyWillBeUsed: ({ request }) =>
  //             new Request(getCacheKeyForURL(request.url), {
  //               headers: request.headers,
  //             }),
  //         },
  //         new CacheableResponsePlugin({ statuses: [200] }),
  //         new RangeRequestsPlugin(),
  //       ],
  //     },
  //   },
  // ],
});

export { spritesheet, svgSprite, convertImages, compression, pwa };
