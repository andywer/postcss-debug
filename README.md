# PostCSS-Debug

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/postcss-debug.svg)](https://www.npmjs.com/package/postcss-debug)

Debug your postcss workflow with ease! Contains a simple, but interactive web
inspector. Creates snapshots of your CSS files before/after each postcss plugin is run.
See what transformations where done when things stopped working as expected.

**Consider this a beta release. Everything documented here should work, though.**

![Inspector screenshot](/doc/inspector-screenshot.png?raw=true)


## Usage

### CLI

You can use the `postcss-debug` command line interface to run PostCSS on files
of your choice and let the debugger analyze it. It will automatically open the
PostCSS debugger's web inspector, so you can browse through the debugging data.

```sh
npm install -g postcss-debug          # Install
postcss-debug path/to/styles/*.css    # Run
```

You need a configuration file for postcss plugin setup. The name of this file
defaults to `.postcss.js`. This is a sample config using postcss-calc and
postcss-nested plugins:

```js
var calc = require('postcss-calc')
var nested = require('postcss-nested')

module.exports = function (postcss) {
  return postcss([ calc, nested ])
}
```

If you need further information how to use the `postcss-debug` CLI:

```sh
postcss-debug --help
```

### gulp-postcss

This is a modified version of the `gulp-postcss` sample usage code. Adapt your
code like shown here and run `gulp css-debug` in order to debug your PostCSS
process. The PostCSS-Debug web inspector will be opened in your browser automatically.

```js
var postcss = require('gulp-postcss')
var gulp = require('gulp')
var autoprefixer = require('autoprefixer')
var cssnano = require('cssnano')
var debug = require('postcss-debug').createDebugger()

gulp.task('css', function () {
  var processors = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano(),
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(debug(processors)))   // <- we wrap our processors in the debugger
    .pipe(gulp.dest('./dest'))
})

gulp.task('css-debug', ['css'], function () {
  debug.inspect()
})
```


### JS Code

```js
import { createDebugger, matcher } from 'postcss-debug'

const debug = createDebugger()
// or limit gathering debug data to certain css files only:
const debug = createDebugger([
  matcher.contains('style/some-file.css'),
  matcher.regex(/foo\.css/)
])

const plugins = [
  plugin1,
  plugin2
]

postcss(debug(plugins))
  .process(css, {
    from: 'src/app.css',
    to: 'app.css'
  })
  .then(result => {
    debug.inspect()
  })
```


## Contributing

Contributions welcome! Feel free to write code, documentation, tests, ...
Optionally open an issue first or just create a pull request :)

The web inspector is a rather loosely coupled stand-alone application. Have a
look at directory [webdebugger](https://github.com/andywer/postcss-debug/tree/master/webdebugger).


## Changelog

Have a look at file
[CHANGELOG.md](https://github.com/andywer/postcss-debug/blob/master/CHANGELOG.md).


## License

This plugin is released under the terms of the MIT license. See [LICENSE](https://github.com/andywer/postcss-debug/blob/master/LICENSE) for details.
