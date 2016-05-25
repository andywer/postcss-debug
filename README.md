# postcss-debug

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM Version](https://img.shields.io/npm/v/postcss-debug.svg)](https://www.npmjs.com/package/postcss-debug)

Debug your postcss workflow with ease! Creates snapshots of your CSS files
before/after each postcss plugin is run. See what transformations where done
when things stopped working as expected.


## Usage

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
    // or use the debug data manually:
    const debugData = debug.output // or result.debugData
  })
```

## Contributing

Contributions welcome! Feel free to write code, documentation, tests, ...
Optionally open an issue first or just create a pull request :)


## License

This plugin is released under the terms of the MIT license. See [LICENSE](https://github.com/andywer/postcss-debug/blob/master/LICENSE) for details.
