'use strict';

exports.__esModule = true;
exports.matcher = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.createDebugger = createDebugger;

var _debugger = require('./debugger');

var _debugger2 = _interopRequireDefault(_debugger);

var _matchers = require('./matchers');

var matcher = _interopRequireWildcard(_matchers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.matcher = matcher;
function createDebugger() {
  var matchers = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (matchers.length === 0) {
    matchers = [matcher.all()];
  }

  var postcssDebugger = new _debugger2.default(matchers, options);

  function debugPostCSS(postcss) {
    if (Array.isArray(postcss)) {
      // `postcss` is an array of plugins (`postcss(debug([ plugin1, plugin2, ... ]))`)
      return pluginWrapper(postcss);
    } else if ((typeof postcss === 'undefined' ? 'undefined' : _typeof(postcss)) === 'object' && postcss.constructor.name === 'Processor' && postcss.plugins) {
      // `postcss` is a postcss processor instance (`debug(postcss([ plugin1, plugin2, ... ]))`)
      return new postcss.constructor(pluginWrapper(postcss.plugins));
    } else {
      console.error('Unrecognized parameter passed to postcss-debug. Expected postcss instance or array of plugins.');
      return postcss;
    }
  }

  function pluginWrapper(plugins) {
    if (plugins.length === 0) {
      return [postcssDebugger.createSnapshoter({})];
    }

    var pluginsAndSnapshotters = [];
    var prevPlugin = null;

    plugins.forEach(function (plugin) {
      pluginsAndSnapshotters.push(postcssDebugger.createSnapshoter({ prevPlugin: prevPlugin, nextPlugin: plugin }));
      pluginsAndSnapshotters.push(plugin);
      prevPlugin = plugin;
    });

    pluginsAndSnapshotters.push(postcssDebugger.createSnapshoter({ prevPlugin: prevPlugin }));

    return pluginsAndSnapshotters;
  }

  return Object.assign(debugPostCSS, postcssDebugger);
}