#!/usr/bin/env
'use strict';

var fs = require('fs');
var path = require('path');
var postcss = require('postcss');
var os = require('os');
var debug = require('./index').createDebugger();

var argv = require('yargs').usage('Usage: $0 [-c <config file>] <css files...>').demand(1).alias('c', 'config').default('c', '.postcss.js').nargs('c', 1).describe('c', 'Config file specifying the postcss plugins to use').argv;

var destFilePath = path.join(os.tmpdir(), 'postcss-debugged.css');

var config = require(path.join(process.cwd(), argv.config));
var processor = debug(config(postcss));

var donePromise = Promise.resolve();

argv._.forEach(function (cssFilePath) {
  donePromise = donePromise.then(function () {
    return processor.process(fs.readFileSync(cssFilePath), { from: cssFilePath, to: destFilePath });
  });
});

donePromise.then(function () {
  debug.inspect();
}).catch(function (error) {
  console.error(error);
});