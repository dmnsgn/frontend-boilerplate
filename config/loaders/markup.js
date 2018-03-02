import { NODE_ENV } from "../config";

const markup = {
  test: /\.html$/,
  exclude: /(index.html)/, // Exclude entry from the HtmlWebpackPlugin
  use: [
    {
      loader: "html-loader",
      options: {
        interpolate: true,
        minimize: NODE_ENV === "production"
      }
    }
  ]
};

const ejs = {
  test: /\.ejs$/,
  use: [
    {
      loader: "ejs-loader"
    }
  ]
};

export { markup, ejs };
