import CopyPlugin from "copy-webpack-plugin";
import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          to: "main_window",
          from: "public",
          globOptions: {
            ignore: ["**.html"],
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss", ".json"],
  },
};
