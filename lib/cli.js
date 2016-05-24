#!/usr/bin/env node
'use strict';

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _yargs = require('yargs');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_yargs.argv.describe('plugins', 'Path to JS file exporting an array of PostCSS plugins to use and debug.').alias('p', 'plugins').describe('input', 'Path to input CSS file.').alias('i', 'input').describe('output', 'Path to output CSS file.').alias('o', 'output');
//# sourceMappingURL=cli.js.map