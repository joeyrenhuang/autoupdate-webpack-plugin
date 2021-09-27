import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
export default {
  input: './index.js',
  output: {
    file: 'dist/index.common.js',
    format: 'cjs',
    banner: '/*Created by 01414993 */',
    sourcemap: 'inline',
    exports: 'default',
  },
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
  ]
}
