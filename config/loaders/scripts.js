import path from "path";

import { PATHS, ROOT, NODE_ENV, BROWSERS } from "../config";

// babel-preset-env: https://github.com/babel/babel-preset-env
const scripts = {
  test: /\.(js|jsx)$/,
  include: path.join(ROOT, PATHS.get("src")),
  exclude: /(node_modules|bower_components)/,
  use: [
    {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "env",
            {
              modules: false,
              targets: {
                browsers: BROWSERS
              }
            }
          ]
        ],
        plugins: [
          "transform-es2015-modules-commonjs",
          "transform-class-properties",
          "transform-object-rest-spread"
        ]
      }
    }
  ]
};

const typescript = {
  test: /\.tsx?$/,
  loader: "awesome-typescript-loader"
};

export { scripts, typescript };
