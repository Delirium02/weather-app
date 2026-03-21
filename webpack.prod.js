import path from "path";
import { merge } from 'webpack-merge';
import common from './webpack.common.js';

export default merge(common, {
  mode: "production",
  output: {
    filename: "bundle.[contenthash].js", // Cache-busting: prevents users from seeing old code
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
});