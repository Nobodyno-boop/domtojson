import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";
import globals from "rollup-plugin-node-globals";
import builtn from "rollup-plugin-node-builtins";
import nodePolyfills from "rollup-plugin-node-polyfills";

let plugins = [commonjs(), typescript(), globals(), builtn(), nodePolyfills()];

export default {
  input: "src/index.ts",
  watch: {
    include: "src/**/*",
  },
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
      // plugins: [globals(), builtn(), nodePolyfills()],
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/bundle.js",
      format: "iife",
      name: "DTM",
    },
    {
      file: "dist/bundle.min.js",
      format: "iife",
      name: "DTM",
      plugins: [],
    },
  ],
  plugins: [...plugins],
};
