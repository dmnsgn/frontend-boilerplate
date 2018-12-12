import path from "path";

import postcssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { PATHS, ROOT, NODE_ENV, BROWSERS } from "../config";

const styleLoader = {
  loader: "style-loader"
};

const cssLoader = {
  loader: "css-loader",
  options: {
    url: true,
    import: true,
    modules: false,
    sourceMap: NODE_ENV !== "production",
    camelCase: false,
    importLoaders: 0,
    exportOnlyLocals: false
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
      path: path.join(ROOT, PATHS.get("config"), "postcss.config.js")
    },
    plugins: loader =>
      [
        postcssImport(),
        cssnext({ browsers: BROWSERS }),
        NODE_ENV === "production" ? cssnano() : 0
      ].filter(Boolean),
    sourceMap: true
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
      options: {}
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
      options: {}
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
      options: {}
    }
  ]
};

const css = {
  test: /\.css$/,
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
