import path from "path";

import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { PATHS, ROOT, NODE_ENV, BROWSERS } from "../config";

const sourceMap = NODE_ENV !== "production";

const styleLoader = {
  loader: "style-loader",
  options: {
    injectType: "styleTag",
    attributes: {},
    insert: "head",
    // base: 1000,
    esModule: false
  }
};

const cssLoader = {
  loader: "css-loader",
  options: {
    url: true,
    import: true,
    modules: false,
    sourceMap,
    importLoaders: 0,
    localsConvention: "asIs",
    onlyLocals: false,
    esModule: false
  }
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    exec: undefined,
    parser: undefined,
    syntax: undefined,
    stringifier: undefined,
    config: {
      path: path.join(ROOT, PATHS.get("config"), "postcss.config.js"),
      ctx: {
        "postcss-preset-env": {},
        cssnano: {}
      }
    },
    ident: "postcss",
    plugins: loader =>
      [
        postcssImport({ root: loader.resourcePath }),
        postcssPresetEnv({ browsers: BROWSERS }),
        NODE_ENV === "production" ? cssnano() : 0
      ].filter(Boolean),
    sourceMap
  }
};

const sass = {
  test: /\.scss$/,
  use: [
    NODE_ENV === "production" ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "sass-loader",
      options: {
        sourceMap
      }
    }
  ]
};

const less = {
  test: /\.less$/,
  use: [
    NODE_ENV === "production" ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "less-loader",
      options: { sourceMap }
    }
  ]
};

const stylus = {
  test: /\.styl$/,
  use: [
    NODE_ENV === "production" ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader,
    {
      loader: "stylus-loader",
      options: { sourceMap }
    }
  ]
};

const css = {
  test: /\.(p|post)?css$/,
  use: [
    NODE_ENV === "production" ? MiniCssExtractPlugin.loader : styleLoader,
    cssLoader,
    postcssLoader
  ]
};

const fonts = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    {
      loader: "file-loader",
      query: {
        name: "[name].[ext]",
        outputPath: "fonts/"
      }
    }
  ]
};

export { css, sass, less, stylus, fonts };
