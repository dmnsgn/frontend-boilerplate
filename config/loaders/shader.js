import { join } from "path";

import { PATHS, ROOT } from "../config.js";

const shader = {
  test: /\.(glsl|frag|vert)$/,
  include: join(ROOT, PATHS.get("src")),
  type: "asset/source",
  use: [
    {
      loader: "glslify-loader",
      options: {},
    },
  ],
};

export { shader };
