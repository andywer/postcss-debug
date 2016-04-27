# postcss-debug

## Usage

```js
import { createDebugger, matcher } from 'postcss-debug'

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
    debug.print()
    // or use the debug data manually:
    const debugData = debug.output // or result.debugData
  })
```
