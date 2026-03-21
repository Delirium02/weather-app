import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map", // This makes debugging way easier
  devServer: {
    watchFiles: ["./src/template.html"], // Reloads when you change HTML
  },
});