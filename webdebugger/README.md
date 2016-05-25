# postcss-debug - Webdebugger

This is the webdebugger. It's just a small static web page with some JS logic
for inspecting the debugging data gathered by postcss-debug.

## Development

Run `npm run build` to rebuild if you changed something or run `npm start` to
launch a watcher, serve the webdebugger on your local machine and open it in
your browser. Don't forget the initial `npm install`.

The `build.js` file is also used by `../src/webdebugger.js` to write the
postcss debugging data into the webdebugger's `index.html` file (that is how it
passes the gathered data for inspection).
