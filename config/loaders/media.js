const images = {
  test: /\.(jpe?g|png|gif)$/i,
  type: "asset/resource",
  use: [
    {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          progressive: true,
          quality: 65,
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // The following encode images to webp while keeping original file extension.
        // Use only if you don't care about Safari support: https://caniuse.com/#feat=webp
        // webp: {
        //  quality: 75
        // }
      },
    },
  ],
};

const videos = {
  test: /\.(mov|mp4|webm|vtt)$/,
  type: "asset/resource",
};

const svg = {
  test: /\.svg$/,
  oneOf: [
    {
      resourceQuery: /sprite/,
      use: [
        {
          loader: "svg-sprite-loader",
          options: {
            extract: true,
          },
        },
        { loader: "svgo-loader", options: {} },
      ],
    },
    {
      type: "asset/source",
      resourceQuery: /source/,
      use: [{ loader: "svgo-loader", options: {} }],
    },
    {
      type: "asset/resource",
      use: [{ loader: "svgo-loader", options: {} }],
    },
  ],
};

export { images, videos, svg };
