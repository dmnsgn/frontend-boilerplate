import path from "path";

import { ROOT, PATHS, BROWSERS } from "../config";

const scripts = {
  test: /\.((t|j)sx?)$/,
  include: path.join(ROOT, PATHS.get("src")),
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
              debug: false,
              targets: {
                browsers: BROWSERS
              }
            }
          ]
        ],
        plugins: [
          // Stage 2
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-proposal-numeric-separator",
          "@babel/plugin-proposal-throw-expressions",

          // Stage 3
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-syntax-import-meta",
          ["@babel/plugin-proposal-class-properties", { loose: false }],
          "@babel/plugin-proposal-json-strings"
        ]
      }
    }
  ]
};

export { scripts };
