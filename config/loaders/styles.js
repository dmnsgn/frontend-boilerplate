import path from "path";

import postcssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import cssnano from "cssnano";

import { PATHS, ROOT, NODE_ENV, BROWSERS } from "../config";

import { extractCSS } from "../plugins";

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

const sassUse = [
  cssLoader,
  {
    loader: "sass-loader",
    options: {}
  }
];

const sass = {
  test: /\.scss$/,
  use:
    NODE_ENV === "production"
      ? extractCSS.extract(sassUse)
      : [styleLoader, ...sassUse]
};

const lessUse = [
  cssLoader,
  {
    loader: "less-loader",
    options: {}
  }
];

const less = {
  test: /\.less$/,
  use:
    NODE_ENV === "production"
      ? extractCSS.extract(lessUse)
      : [styleLoader, ...lessUse]
};

const stylusUse = [
  cssLoader,
  {
    loader: "stylus-loader",
    options: {}
  }
];

const stylus = {
  test: /\.styl$/,
  use:
    NODE_ENV === "production"
      ? extractCSS.extract(stylusUse)
      : [styleLoader, ...stylusUse]
};

const cssUse = [
  cssLoader,
  {
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
          NODE_ENV === "production" ? cssnano() : false
        ].filter(Boolean),
      sourceMap: true
    }
  }
];

const css = {
  test: /\.css$/,
  use:
    NODE_ENV === "production"
      ? extractCSS.extract(cssUse)
      : [styleLoader, ...cssUse]
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
