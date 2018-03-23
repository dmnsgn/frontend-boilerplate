const images = {
  test: /\.(jpe?g|png|gif)$/i,
  use: [
    {
      loader: "file-loader",
      query: {
        name: "[name].[ext]?[hash]",
        outputPath: "images/"
      }
    },
    {
      loader: "image-webpack-loader",
      query: {
        gifsicle: {
          interlaced: true
        },
        optipng: {
          optimizationLevel: 7
        },
        pngquant: {
          quality: "65-90",
          speed: 4
        },
        mozjpeg: {
          progressive: true
        }
      }
    }
  ]
};

const svg = {
  test: /\.svg$/,
  use: [
    { loader: "svg-sprite-loader", options: {} },
    { loader: "svgo-loader", options: {} }
  ]
};

export { images, svg };
