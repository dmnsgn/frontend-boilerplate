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
              useBuiltIns: false,
              debug: false,
              targets: {
                browsers: BROWSERS
              }
            }
          ],
          ["@babel/preset-stage-2", { decoratorsLegacy: true }],
        ],
        plugins: []
      }
    }
  ]
};

export { scripts };
