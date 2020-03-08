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
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
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
