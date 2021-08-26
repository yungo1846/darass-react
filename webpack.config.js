const path = require("path");

const config = {
  entry: "./src/Darass/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `index.jsx`,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  mode: "production",
  devtool: "source-map",
};

module.exports = config;
