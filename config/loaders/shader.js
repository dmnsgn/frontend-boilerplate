import path from "path";

import { PATHS, ROOT, NODE_ENV } from "../config";

const shader = {
  test: /\.(glsl|frag|vert)$/,
  include: path.join(ROOT, PATHS.get("src")),
  use: [
    {
      loader: "raw-loader",
      options: {}
    },
    {
      loader: "glslify-loader",
      options: {}
    }
  ]
};

export { shader };
