import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import postcssNested from 'postcss-nested'

export default {
  entry: 'src/app.js',
  dest: 'build/app.js',
  format: 'iife',
  plugins: [
    postcss({
      extensions: [ '.css' ],
      plugins: [
        postcssNested()
      ]
    }),
    babel(),
    nodeResolve({
      browser: true
    }),
    commonjs()
  ]
}
