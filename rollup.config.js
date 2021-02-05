import {babel} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import {dependencies} from "./package.json";
import nodeResolve from "@rollup/plugin-node-resolve";
import remove from "rollup-plugin-delete";
import {terser} from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/index.ts",
    plugins: [
        remove({targets: "dist/*"}),
        nodeResolve(),
        commonjs(),
        typescript(),
        babel({
            babelrc: false,
            babelHelpers: "bundled",
            extensions: [".js", ".jsx", ".es6", ".es", ".mjs", ".ts"],
            presets: [
                [
                    "@babel/preset-env", {
                        targets: {
                            node: 6
                        }
                    }
                ]
            ],
            plugins: [
                ["@babel/plugin-proposal-class-properties", {loose: true}],
                ["@babel/plugin-proposal-private-methods", {loose: true}],
                ["@babel/plugin-proposal-private-property-in-object", {loose: true}]
            ]
        }),
        "production" === process.env.NODE_ENV && terser({
            compress: {
                drop_console: true
            }
        })
    ],
    external: [...Object.keys(dependencies), "stream"],
    output: {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true
    }
};
