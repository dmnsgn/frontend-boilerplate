import { NODE_ENV } from "../config";

const markup = {
  test: /\.html$/,
  use: [
    {
      loader: "html-loader",
      options: {
        minimize: NODE_ENV === "production"
      }
    }
  ]
};

export { markup };
