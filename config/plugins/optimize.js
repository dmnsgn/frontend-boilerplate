import webpack from "webpack";

const uglify = new webpack.optimize.UglifyJsPlugin();

const commons = new webpack.optimize.CommonsChunkPlugin({
  name: "commons",
  filename: "commons.js",
  minChunks: module =>
    module.context && module.context.indexOf("node_modules") !== -1
});

const manifest = new webpack.optimize.CommonsChunkPlugin({
  name: "manifest"
});

export { uglify, commons, manifest };
