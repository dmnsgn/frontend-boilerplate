module.exports = ({ file, options, env }) => ({
  parser: file.extname === ".sss" ? "sugarss" : false,
  plugins: {
    "postcss-import": { root: file.dirname },
    "postcss-preset-env": options["postcss-preset-env"] || false,
    cssnano: options.cssnano || false
  }
});
