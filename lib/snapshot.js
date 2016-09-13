"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getPluginName(plugin) {
  if (plugin.postcss) {
    plugin = plugin.postcss;
  }

  return plugin.postcssPlugin;
}

var Snapshot = function () {
  function Snapshot(css, _ref) {
    var prevPlugin = _ref.prevPlugin;
    var nextPlugin = _ref.nextPlugin;

    _classCallCheck(this, Snapshot);

    this.css = css.toString();
    this.timestamp = Date.now();
    this.prevPlugin = prevPlugin && getPluginName(prevPlugin);
    this.nextPlugin = nextPlugin && getPluginName(nextPlugin);
  }

  Snapshot.prototype.isFirstSnapshot = function isFirstSnapshot() {
    return !this.prevPlugin;
  };

  Snapshot.prototype.isLastSnapshot = function isLastSnapshot() {
    return !this.nextPlugin;
  };

  return Snapshot;
}();

exports.default = Snapshot;