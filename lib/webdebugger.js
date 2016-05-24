'use strict';

exports.__esModule = true;
exports.inspect = inspect;

var _opener = require('opener');

var _opener2 = _interopRequireDefault(_opener);

var _build = require('../webdebugger/build');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function serializeFileSnapshots(fileSnapshots) {
  var files = [];

  fileSnapshots.forEach(function (snapshots, file) {
    files.push({
      path: file,
      snapshots: snapshots.map(function (snapshot) {
        return serializeSnapshot(snapshot);
      })
    });
  });

  return JSON.stringify({ files: files });
}

function serializeSnapshot(snapshot) {
  return {
    timestamp: snapshot.timestamp,
    prevPlugin: snapshot.prevPlugin,
    nextPlugin: snapshot.nextPlugin,
    content: snapshot.css.toString()
  };
}

function inspect(fileSnapshots) {
  var htmlFilePath = (0, _build.prepareIndexHtml)(serializeFileSnapshots(fileSnapshots));
  (0, _opener2.default)(htmlFilePath).unref();
}