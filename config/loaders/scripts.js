import path from "path";

import { PATHS, ROOT, NODE_ENV, BROWSERS } from "../config";

// babel-preset-env: https://github.com/babel/babel-preset-env
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
          "@babel/preset-stage-2",
          "@babel/preset-typescript"
        ],
        plugins: []
      }
    }
  ]
};

export { scripts };
