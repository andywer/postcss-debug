"use strict";

exports.__esModule = true;
exports.all = all;
exports.contains = contains;
exports.regex = regex;
function all() {
  return function () {
    return true;
  };
}

function contains(operand) {
  return function (string) {
    return string.indexOf(operand) > -1;
  };
}

function regex(operand) {
  return function (string) {
    return string.match(operand);
  };
}