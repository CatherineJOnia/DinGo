module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
  },
  context: __dirname,
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      // {
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader",
      // },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [
      //     "file-loader",
      //     {
      //       loader: "image-webpack-loader",
      //       options: {
      //         mozjpeg: {
      //           progressive: true,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: false,
      //         },
      //         pngquant: {
      //           quality: [0.65, 0.9],
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //         // the webp option will enable WEBP
      //         webp: {
      //           quality: 75,
      //         },
      //       },
      //     },
      //   ],
      // },
    ],
  },
};
