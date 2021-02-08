import { join } from "path";

import { ROOT, PATHS, BROWSERS, NODE_ENV } from "../config.js";

const scripts = {
  test: /\.((t|j|cj|mj)sx?)$/,
  include: join(ROOT, PATHS.get("src")),
  exclude: /(node_modules|bower_components)/,
  use: [
    {
      loader: "babel-loader",
      options: {
        babelrc: false,
        presets: [
          "@babel/preset-typescript",
          [
            "@babel/preset-env",
            {
              modules: false,
              corejs: 3,
              useBuiltIns: "usage",
              debug: NODE_ENV === "production",
              targets: {
                browsers: BROWSERS,
              },
            },
          ],
        ],
        plugins: [
          // Stage 4
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-unicode-property-regex",
          "babel-plugin-transform-regexp-constructors",
          "babel-plugin-transform-modern-regexp",

          // Stage 3
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-syntax-import-meta",
          "@babel/plugin-proposal-json-strings",

          // Stage 2
          "@babel/plugin-proposal-function-sent",
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          "@babel/plugin-proposal-throw-expressions",
        ],
      },
    },
  ],
};

export { scripts };
