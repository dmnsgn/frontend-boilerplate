import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { NODE_ENV, BROWSERS } from "../config.js";

const sourceMap = NODE_ENV !== "production";

const styleLoader = {
  loader: "style-loader",
  options: {
    // injectType: "styleTag",
    // attributes: {},
    // insert: "head",
    // base: true,
    esModule: true,
  },
};

const cssLoader = {
  loader: "css-loader",
  options: {
    // url: true,
    // import: true,
    modules: false,
    sourceMap,
    importLoaders: 1,
    esModule: true,
  },
};

const extractLoader = MiniCssExtractPlugin.loader;

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    // execute: undefined,
    postcssOptions: {
      config: false,
      plugins: [
        postcssImport(),
        postcssPresetEnv({ browsers: BROWSERS, stage: 0 }),
      ],
    },
    sourceMap,
  },
};

const sass = {
  test: /\.(sa|sc)ss$/,
  use: [
    NODE_ENV === "production" ? extractLoader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "sass-loader",
      options: { sourceMap },
    },
  ],
};

const less = {
  test: /\.less$/,
  use: [
    NODE_ENV === "production" ? extractLoader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "less-loader",
      options: { sourceMap },
    },
  ],
};

const stylus = {
  test: /\.styl$/,
  use: [
    NODE_ENV === "production" ? extractLoader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "stylus-loader",
      options: { sourceMap },
    },
  ],
};

const css = {
  test: /\.(p|post)?css$/,
  use: [
    NODE_ENV === "production" ? extractLoader : styleLoader,
    cssLoader,
    postcssLoader,
  ],
};

const fonts = {
  test: /\.(woff(2)?|eot|ttf|otf)$/,
  type: "asset/resource",
};

export { css, sass, less, stylus, fonts };
