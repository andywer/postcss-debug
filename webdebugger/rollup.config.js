import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/app.js',
  dest: 'build/app.js',
  format: 'iife',
  plugins: [
    babel(),
    nodeResolve({
      browser: true
    }),
    commonjs()
  ]
}
