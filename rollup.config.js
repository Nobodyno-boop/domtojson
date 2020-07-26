import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

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
      plugins: [commonjs()],
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
  ],
  plugins: [typescript()],
};
