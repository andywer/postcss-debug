'use strict';

exports.__esModule = true;

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _snapshot = require('./snapshot');

var _snapshot2 = _interopRequireDefault(_snapshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PostcssDebugger = function () {
  function PostcssDebugger(matchers, options) {
    _classCallCheck(this, PostcssDebugger);

    this.matchers = matchers;
    this.options = Object.assign({ logger: new _logger2.default() }, options);

    this.snapshots = new Map(); // key: <file>, value: Array<Snapshot>
    this.inspect = this.inspect.bind(this);
  }

  PostcssDebugger.prototype.createSnapshoter = function createSnapshoter(_ref) {
    var _this = this;

    var prevPlugin = _ref.prevPlugin;
    var nextPlugin = _ref.nextPlugin;

    return _postcss2.default.plugin('postcss-debug-snapshot', function () {
      return function (css) {
        _this.createSnapshot(css, prevPlugin, nextPlugin);
      };
    });
  };

  PostcssDebugger.prototype.createSnapshot = function createSnapshot(css, prevPlugin, nextPlugin) {
    var filePath = css.source.input.file;

    if (this.shouldTrackFile(filePath)) {
      var newSnapshot = new _snapshot2.default(css, { prevPlugin: prevPlugin, nextPlugin: nextPlugin });

      this.snapshots.set(filePath, (this.snapshots.get(filePath) || []).concat([newSnapshot]));
    }
  };

  PostcssDebugger.prototype.inspect = function inspect() {
    this.options.logger.inspect(this.snapshots, this.options);
  };

  PostcssDebugger.prototype.shouldTrackFile = function shouldTrackFile(filePath) {
    return this.matchers.some(function (matcher) {
      return matcher(filePath);
    });
  };

  return PostcssDebugger;
}();

exports.default = PostcssDebugger;