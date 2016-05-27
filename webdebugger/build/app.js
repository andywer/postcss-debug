(function () {
    'use strict';

    var babelHelpers = {};
    babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    babelHelpers.classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    babelHelpers.createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    babelHelpers.taggedTemplateLiteral = function (strings, raw) {
      return Object.freeze(Object.defineProperties(strings, {
        raw: {
          value: Object.freeze(raw)
        }
      }));
    };

    babelHelpers;


    function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }

    var index$2 = __commonjs(function (module) {
    var indexOf = [].indexOf;

    module.exports = function (arr, obj) {
      if (indexOf) return arr.indexOf(obj);
      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }
      return -1;
    };
    });

    var require$$0 = (index$2 && typeof index$2 === 'object' && 'default' in index$2 ? index$2['default'] : index$2);

    var index$1 = __commonjs(function (module) {
    // contains, add, remove, toggle
    var indexof = require$$0;

    module.exports = ClassList;

    function ClassList(elem) {
        var cl = elem.classList;

        if (cl) {
            return cl;
        }

        var classList = {
            add: add,
            remove: remove,
            contains: contains,
            toggle: toggle,
            toString: $toString,
            length: 0,
            item: item
        };

        return classList;

        function add(token) {
            var list = getTokens();
            if (indexof(list, token) > -1) {
                return;
            }
            list.push(token);
            setTokens(list);
        }

        function remove(token) {
            var list = getTokens(),
                index = indexof(list, token);

            if (index === -1) {
                return;
            }

            list.splice(index, 1);
            setTokens(list);
        }

        function contains(token) {
            return indexof(getTokens(), token) > -1;
        }

        function toggle(token) {
            if (contains(token)) {
                remove(token);
                return false;
            } else {
                add(token);
                return true;
            }
        }

        function $toString() {
            return elem.className;
        }

        function item(index) {
            var tokens = getTokens();
            return tokens[index] || null;
        }

        function getTokens() {
            var className = elem.className;

            return filter(className.split(" "), isTruthy);
        }

        function setTokens(list) {
            var length = list.length;

            elem.className = list.join(" ");
            classList.length = length;

            for (var i = 0; i < list.length; i++) {
                classList[i] = list[i];
            }

            delete list[length];
        }
    }

    function filter(arr, fn) {
        var ret = [];
        for (var i = 0; i < arr.length; i++) {
            if (fn(arr[i])) ret.push(arr[i]);
        }
        return ret;
    }

    function isTruthy(value) {
        return !!value;
    }
    });

    var require$$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

    var index$3 = __commonjs(function (module) {
    /*!
     * Cross-Browser Split 1.1.1
     * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
     * Available under the MIT License
     * ECMAScript compliant, uniform cross-browser split method
     */

    /**
     * Splits a string into an array of strings using a regex or string separator. Matches of the
     * separator are not included in the result array. However, if `separator` is a regex that contains
     * capturing groups, backreferences are spliced into the result each time `separator` is matched.
     * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
     * cross-browser.
     * @param {String} str String to split.
     * @param {RegExp|String} separator Regex or string to use for separating the string.
     * @param {Number} [limit] Maximum number of items to include in the result array.
     * @returns {Array} Array of substrings.
     * @example
     *
     * // Basic use
     * split('a b c d', ' ');
     * // -> ['a', 'b', 'c', 'd']
     *
     * // With limit
     * split('a b c d', ' ', 2);
     * // -> ['a', 'b']
     *
     * // Backreferences in result array
     * split('..word1 word2..', /([a-z]+)(\d+)/i);
     * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
     */
    module.exports = function split(undef) {

      var nativeSplit = String.prototype.split,
          compliantExecNpcg = /()??/.exec("")[1] === undef,

      // NPCG: nonparticipating capturing group
      self;

      self = function self(str, separator, limit) {
        // If `separator` is not a regex, use `nativeSplit`
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
          return nativeSplit.call(str, separator, limit);
        }
        var output = [],
            flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + ( // Proposed for ES6
        separator.sticky ? "y" : ""),

        // Firefox 3+
        lastLastIndex = 0,

        // Make `global` and avoid `lastIndex` issues by working with a copy
        separator = new RegExp(separator.source, flags + "g"),
            separator2,
            match,
            lastIndex,
            lastLength;
        str += ""; // Type-convert
        if (!compliantExecNpcg) {
          // Doesn't need flags gy, but they don't hurt
          separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
        limit >>> 0; // ToUint32(limit)
        while (match = separator.exec(str)) {
          // `separator.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0].length;
          if (lastIndex > lastLastIndex) {
            output.push(str.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for
            // nonparticipating capturing groups
            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (arguments[i] === undef) {
                    match[i] = undef;
                  }
                }
              });
            }
            if (match.length > 1 && match.index < str.length) {
              Array.prototype.push.apply(output, match.slice(1));
            }
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= limit) {
              break;
            }
          }
          if (separator.lastIndex === match.index) {
            separator.lastIndex++; // Avoid an infinite loop
          }
        }
        if (lastLastIndex === str.length) {
          if (lastLength || !separator.test("")) {
            output.push("");
          }
        } else {
          output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
      };

      return self;
    }();
    });

    var require$$2 = (index$3 && typeof index$3 === 'object' && 'default' in index$3 ? index$3['default'] : index$3);

    var index = __commonjs(function (module) {
    var split = require$$2;
    var ClassList = require$$1;


    function context() {

      var cleanupFuncs = [];

      function h() {
        var args = [].slice.call(arguments),
            e = null;
        function item(l) {
          var r;
          function parseClass(string) {
            // Our minimal parser doesn’t understand escaping CSS special
            // characters like `#`. Don’t use them. More reading:
            // https://mathiasbynens.be/notes/css-escapes .

            var m = split(string, /([\.#]?[^\s#.]+)/);
            if (/^\.|#/.test(m[1])) e = document.createElement('div');
            forEach(m, function (v) {
              var s = v.substring(1, v.length);
              if (!v) return;
              if (!e) e = document.createElement(v);else if (v[0] === '.') ClassList(e).add(s);else if (v[0] === '#') e.setAttribute('id', s);
            });
          }

          if (l == null) ;else if ('string' === typeof l) {
            if (!e) parseClass(l);else e.appendChild(r = document.createTextNode(l));
          } else if ('number' === typeof l || 'boolean' === typeof l || l instanceof Date || l instanceof RegExp) {
            e.appendChild(r = document.createTextNode(l.toString()));
          }
          //there might be a better way to handle this...
          else if (isArray(l)) forEach(l, item);else if (isNode(l)) e.appendChild(r = l);else if (l instanceof Text) e.appendChild(r = l);else if ('object' === (typeof l === 'undefined' ? 'undefined' : babelHelpers.typeof(l))) {
              for (var k in l) {
                if ('function' === typeof l[k]) {
                  if (/^on\w+/.test(k)) {
                    (function (k, l) {
                      // capture k, l in the closure
                      if (e.addEventListener) {
                        e.addEventListener(k.substring(2), l[k], false);
                        cleanupFuncs.push(function () {
                          e.removeEventListener(k.substring(2), l[k], false);
                        });
                      } else {
                        e.attachEvent(k, l[k]);
                        cleanupFuncs.push(function () {
                          e.detachEvent(k, l[k]);
                        });
                      }
                    })(k, l);
                  } else {
                    // observable
                    e[k] = l[k]();
                    cleanupFuncs.push(l[k](function (v) {
                      e[k] = v;
                    }));
                  }
                } else if (k === 'style') {
                  if ('string' === typeof l[k]) {
                    e.style.cssText = l[k];
                  } else {
                    for (var s in l[k]) {
                      (function (s, v) {
                        if ('function' === typeof v) {
                          // observable
                          e.style.setProperty(s, v());
                          cleanupFuncs.push(v(function (val) {
                            e.style.setProperty(s, val);
                          }));
                        } else e.style.setProperty(s, l[k][s]);
                      })(s, l[k][s]);
                    }
                  }
                } else if (k.substr(0, 5) === "data-") {
                  e.setAttribute(k, l[k]);
                } else {
                  e[k] = l[k];
                }
              }
            } else if ('function' === typeof l) {
              //assume it's an observable!
              var v = l();
              e.appendChild(r = isNode(v) ? v : document.createTextNode(v));

              cleanupFuncs.push(l(function (v) {
                if (isNode(v) && r.parentElement) r.parentElement.replaceChild(v, r), r = v;else r.textContent = v;
              }));
            }

          return r;
        }
        while (args.length) {
          item(args.shift());
        }return e;
      }

      h.cleanup = function () {
        for (var i = 0; i < cleanupFuncs.length; i++) {
          cleanupFuncs[i]();
        }
        cleanupFuncs.length = 0;
      };

      return h;
    }

    var h = module.exports = context();
    h.context = context;

    function isNode(el) {
      return el && el.nodeName && el.nodeType;
    }

    function isText(el) {
      return el && el.nodeName === '#text' && el.nodeType == 3;
    }

    function forEach(arr, fn) {
      if (arr.forEach) return arr.forEach(fn);
      for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i);
      }
    }

    function isArray(arr) {
      return Object.prototype.toString.call(arr) == '[object Array]';
    }
    });

    var h = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

    var index$5 = __commonjs(function (module) {
    module.exports = attributeToProperty;

    var transform = {
      'class': 'className',
      'for': 'htmlFor',
      'http-equiv': 'httpEquiv'
    };

    function attributeToProperty(h) {
      return function (tagName, attrs, children) {
        for (var attr in attrs) {
          if (attr in transform) {
            attrs[transform[attr]] = attrs[attr];
            delete attrs[attr];
          }
        }
        return h(tagName, attrs, children);
      };
    }
    });

    var require$$0$1 = (index$5 && typeof index$5 === 'object' && 'default' in index$5 ? index$5['default'] : index$5);

    var index$4 = __commonjs(function (module) {
    var attrToProp = require$$0$1;

    var VAR = 0,
        TEXT = 1,
        OPEN = 2,
        CLOSE = 3,
        ATTR = 4;
    var ATTR_KEY = 5,
        ATTR_KEY_W = 6;
    var ATTR_VALUE_W = 7,
        ATTR_VALUE = 8;
    var ATTR_VALUE_SQ = 9,
        ATTR_VALUE_DQ = 10;
    var ATTR_EQ = 11,
        ATTR_BREAK = 12;

    module.exports = function (h, opts) {
      h = attrToProp(h);
      if (!opts) opts = {};
      var concat = opts.concat || function (a, b) {
        return String(a) + String(b);
      };

      return function (strings) {
        var state = TEXT,
            reg = '';
        var arglen = arguments.length;
        var parts = [];

        for (var i = 0; i < strings.length; i++) {
          if (i < arglen - 1) {
            var arg = arguments[i + 1];
            var p = parse(strings[i]);
            var xstate = state;
            if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE;
            if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE;
            if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE;
            if (xstate === ATTR) xstate = ATTR_KEY;
            p.push([VAR, xstate, arg]);
            parts.push.apply(parts, p);
          } else parts.push.apply(parts, parse(strings[i]));
        }

        var tree = [null, {}, []];
        var stack = [[tree, -1]];
        for (var i = 0; i < parts.length; i++) {
          var cur = stack[stack.length - 1][0];
          var p = parts[i],
              s = p[0];
          if (s === OPEN && /^\//.test(p[1])) {
            var ix = stack[stack.length - 1][1];
            if (stack.length > 1) {
              stack.pop();
              stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
            }
          } else if (s === OPEN) {
            var c = [p[1], {}, []];
            cur[2].push(c);
            stack.push([c, cur[2].length - 1]);
          } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
            var key = '';
            var copyKey;
            for (; i < parts.length; i++) {
              if (parts[i][0] === ATTR_KEY) {
                key = concat(key, parts[i][1]);
              } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
                if (babelHelpers.typeof(parts[i][2]) === 'object' && !key) {
                  for (copyKey in parts[i][2]) {
                    if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                      cur[1][copyKey] = parts[i][2][copyKey];
                    }
                  }
                } else {
                  key = concat(key, parts[i][2]);
                }
              } else break;
            }
            if (parts[i][0] === ATTR_EQ) i++;
            var j = i;
            for (; i < parts.length; i++) {
              if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
                if (!cur[1][key]) cur[1][key] = strfn(parts[i][1]);else cur[1][key] = concat(cur[1][key], parts[i][1]);
              } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
                if (!cur[1][key]) cur[1][key] = strfn(parts[i][2]);else cur[1][key] = concat(cur[1][key], parts[i][2]);
              } else {
                if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
                  // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
                  // empty string is falsy, not well behaved value in browser
                  cur[1][key] = key.toLowerCase();
                }
                break;
              }
            }
          } else if (s === ATTR_KEY) {
            cur[1][p[1]] = true;
          } else if (s === VAR && p[1] === ATTR_KEY) {
            cur[1][p[2]] = true;
          } else if (s === CLOSE) {
            if (selfClosing(cur[0]) && stack.length) {
              var ix = stack[stack.length - 1][1];
              stack.pop();
              stack[stack.length - 1][0][2][ix] = h(cur[0], cur[1], cur[2].length ? cur[2] : undefined);
            }
          } else if (s === VAR && p[1] === TEXT) {
            if (p[2] === undefined || p[2] === null) p[2] = '';else if (!p[2]) p[2] = concat('', p[2]);
            if (Array.isArray(p[2][0])) {
              cur[2].push.apply(cur[2], p[2]);
            } else {
              cur[2].push(p[2]);
            }
          } else if (s === TEXT) {
            cur[2].push(p[1]);
          } else if (s === ATTR_EQ || s === ATTR_BREAK) {
            // no-op
          } else {
              throw new Error('unhandled: ' + s);
            }
        }

        if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
          tree[2].shift();
        }

        if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
          throw new Error('multiple root elements must be wrapped in an enclosing tag');
        }
        if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string' && Array.isArray(tree[2][0][2])) {
          tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
        }
        return tree[2][0];

        function parse(str) {
          var res = [];
          if (state === ATTR_VALUE_W) state = ATTR;
          for (var i = 0; i < str.length; i++) {
            var c = str.charAt(i);
            if (state === TEXT && c === '<') {
              if (reg.length) res.push([TEXT, reg]);
              reg = '';
              state = OPEN;
            } else if (c === '>' && !quot(state)) {
              if (state === OPEN) {
                res.push([OPEN, reg]);
              } else if (state === ATTR_KEY) {
                res.push([ATTR_KEY, reg]);
              } else if (state === ATTR_VALUE && reg.length) {
                res.push([ATTR_VALUE, reg]);
              }
              res.push([CLOSE]);
              reg = '';
              state = TEXT;
            } else if (state === TEXT) {
              reg += c;
            } else if (state === OPEN && /\s/.test(c)) {
              res.push([OPEN, reg]);
              reg = '';
              state = ATTR;
            } else if (state === OPEN) {
              reg += c;
            } else if (state === ATTR && /[\w-]/.test(c)) {
              state = ATTR_KEY;
              reg = c;
            } else if (state === ATTR && /\s/.test(c)) {
              if (reg.length) res.push([ATTR_KEY, reg]);
              res.push([ATTR_BREAK]);
            } else if (state === ATTR_KEY && /\s/.test(c)) {
              res.push([ATTR_KEY, reg]);
              reg = '';
              state = ATTR_KEY_W;
            } else if (state === ATTR_KEY && c === '=') {
              res.push([ATTR_KEY, reg], [ATTR_EQ]);
              reg = '';
              state = ATTR_VALUE_W;
            } else if (state === ATTR_KEY) {
              reg += c;
            } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
              res.push([ATTR_EQ]);
              state = ATTR_VALUE_W;
            } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
              res.push([ATTR_BREAK]);
              if (/[\w-]/.test(c)) {
                reg += c;
                state = ATTR_KEY;
              } else state = ATTR;
            } else if (state === ATTR_VALUE_W && c === '"') {
              state = ATTR_VALUE_DQ;
            } else if (state === ATTR_VALUE_W && c === "'") {
              state = ATTR_VALUE_SQ;
            } else if (state === ATTR_VALUE_DQ && c === '"') {
              res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
              reg = '';
              state = ATTR;
            } else if (state === ATTR_VALUE_SQ && c === "'") {
              res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
              reg = '';
              state = ATTR;
            } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
              state = ATTR_VALUE;
              i--;
            } else if (state === ATTR_VALUE && /\s/.test(c)) {
              res.push([ATTR_BREAK], [ATTR_VALUE, reg]);
              reg = '';
              state = ATTR;
            } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
              reg += c;
            }
          }
          if (state === TEXT && reg.length) {
            res.push([TEXT, reg]);
            reg = '';
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE, reg]);
            reg = '';
          } else if (state === ATTR_VALUE_DQ && reg.length) {
            res.push([ATTR_VALUE, reg]);
            reg = '';
          } else if (state === ATTR_VALUE_SQ && reg.length) {
            res.push([ATTR_VALUE, reg]);
            reg = '';
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY, reg]);
            reg = '';
          }
          return res;
        }
      };

      function strfn(x) {
        if (typeof x === 'function') return x;else if (typeof x === 'string') return x;else if (x && (typeof x === 'undefined' ? 'undefined' : babelHelpers.typeof(x)) === 'object') return x;else return concat('', x);
      }
    };

    function quot(state) {
      return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
    }

    var hasOwn = Object.prototype.hasOwnProperty;
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }

    var closeRE = RegExp('^(' + ['area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed', 'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr',
    // SVG TAGS
    'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri', 'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath', 'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view', 'vkern'].join('|') + ')(?:[.#][a-zA-Z0-9-￿_:-]+)*$');
    function selfClosing(tag) {
      return closeRE.test(tag);
    }
    });

    var hyperx = (index$4 && typeof index$4 === 'object' && 'default' in index$4 ? index$4['default'] : index$4);

    var html = hyperx(h);

    /**
     * Use like: mount(html`<div>test</div>`, document.querySelector('.my-component'))
     */
    function mount(domFragmentObject, node) {
      removeAllChildren(node);
      node.appendChild(domFragmentObject);

      return domFragmentObject;
    }

    function removeAllChildren(node) {
      while (node.firstChild) {
        node.removeChild(node.firstChild);
      }
    }

    var _templateObject$1 = babelHelpers.taggedTemplateLiteral(['\n      <ul class="snapshots">\n        ', '\n      </ul>\n      '], ['\n      <ul class="snapshots">\n        ', '\n      </ul>\n      ']);
    var _templateObject2$1 = babelHelpers.taggedTemplateLiteral(['\n      <span class="snapshot__relative-time">@', 'ms</span>\n    '], ['\n      <span class="snapshot__relative-time">@', 'ms</span>\n    ']);
    var _templateObject3$1 = babelHelpers.taggedTemplateLiteral(['\n      <li class=', '>\n        <h3 class="clickable" onclick=', '>\n          <span class="snapshot__after-plugin">', '</span>\n          ', '\n        </h3>\n        ', '\n      </li>'], ['\n      <li class=', '>\n        <h3 class="clickable" onclick=', '>\n          <span class="snapshot__after-plugin">', '</span>\n          ', '\n        </h3>\n        ', '\n      </li>']);
    var _templateObject4 = babelHelpers.taggedTemplateLiteral(['<div class="snapshot__content"></div>'], ['<div class="snapshot__content"></div>']);
    var _templateObject5 = babelHelpers.taggedTemplateLiteral(['\n        <pre class="snapshot__content">', '</pre>\n      '], ['\n        <pre class="snapshot__content">', '</pre>\n      ']);
    var SnapshotsContainer = function () {
      /**
       * @param {Element} element
       */

      function SnapshotsContainer(element) {
    babelHelpers.classCallCheck(this, SnapshotsContainer);

        this.element = element;
      }

      /**
       * @param {object[]} snapshots    Array of snapshot objects as in `window.postcssDebug`.
       */


    babelHelpers.createClass(SnapshotsContainer, [{
        key: 'show',
        value: function show(snapshots) {
          var _this = this;

          this.snapshots = snapshots.map(function (snapshot) {
            return _this._prepareSnapshotData(snapshot, snapshots);
          });
          this._render();
        }
      }, {
        key: '_render',
        value: function _render() {
          var _this2 = this;

          mount(html(_templateObject$1, this.snapshots.map(function (snapshot, index) {
            return _this2._renderSnapshot(snapshot, index);
          })), this.element);
        }

        /**
         * @param {object} snapshot     Snapshot object as in `window.postcssDebug`.
         */

      }, {
        key: '_renderSnapshot',
        value: function _renderSnapshot(snapshot, index) {
          var benchmark = html(_templateObject2$1, snapshot.relativeTime);

          return html(_templateObject3$1, 'selectable ' + (snapshot.expanded ? 'selected' : ''), this._onSnapshotToggle.bind(this, snapshot), snapshot.afterPluginLabel, index > 0 ? benchmark : null, this._renderSnapshotContent(snapshot));
        }
      }, {
        key: '_renderSnapshotContent',
        value: function _renderSnapshotContent(snapshot) {
          if (snapshot.highlightedContentHTML) {
            var contentDomNode = html(_templateObject4);
            contentDomNode.innerHTML = snapshot.highlightedContentHTML;

            return contentDomNode;
          } else {
            return html(_templateObject5, snapshot.content);
          }
        }
      }, {
        key: '_prepareSnapshotData',
        value: function _prepareSnapshotData(snapshot, snapshots) {
          return {
            expanded: false,
            relativeTime: snapshot.timestamp - snapshots[0].timestamp,
            afterPluginLabel: snapshot.prevPlugin ? 'After ' + snapshot.prevPlugin : 'Initially',
            highlightedContentHTML: snapshot.highlightedContentHTML,
            content: snapshot.content
          };
        }
      }, {
        key: '_onSnapshotToggle',
        value: function _onSnapshotToggle(snapshot) {
          snapshot.expanded = !snapshot.expanded;
          this._render();
        }
      }]);
      return SnapshotsContainer;
    }();

    var _templateObject = babelHelpers.taggedTemplateLiteral(['\n      <div>\n        <h5>Files</h5>\n        <ul class="file-selector">\n          ', '\n        </ul>\n        ', '\n      </div>\n      '], ['\n      <div>\n        <h5>Files</h5>\n        <ul class="file-selector">\n          ', '\n        </ul>\n        ', '\n      </div>\n      ']);
    var _templateObject2 = babelHelpers.taggedTemplateLiteral(['\n      <div>\n        <hr />\n        <section id="snapshots"></section>\n      </div>\n    '], ['\n      <div>\n        <hr />\n        <section id="snapshots"></section>\n      </div>\n    ']);
    var _templateObject3 = babelHelpers.taggedTemplateLiteral(['\n      <li class=', ' onclick=', '>\n        <span class="file__title">', '</span>\n      </li>'], ['\n      <li class=', ' onclick=', '>\n        <span class="file__title">', '</span>\n      </li>']);
    var FILE_LABEL_MAX_LENGTH = 30;

    var FileSelector = function () {
      /**
       * @param {Element} element
       */

      function FileSelector(element) {
    babelHelpers.classCallCheck(this, FileSelector);

        this.element = element;
        this.selectedFile = null;
        this.snapshotsContainer = null;
      }

      /**
       * @param {object[]} files    Array of file objects as in `window.postcssDebug`.
       */


    babelHelpers.createClass(FileSelector, [{
        key: 'show',
        value: function show(files) {
          this.files = files;
          this._render();
        }
      }, {
        key: '_render',
        value: function _render() {
          var _this = this;

          mount(html(_templateObject, this.files.map(function (file) {
            return _this._renderFile(file);
          }), this._renderSnapshots()), this.element);

          this.snapshotsContainer = new SnapshotsContainer(document.getElementById('snapshots'));
        }
      }, {
        key: '_renderSnapshots',
        value: function _renderSnapshots() {
          if (!this.selectedFile) {
            return null;
          }

          return html(_templateObject2);
        }

        /**
         * @param {object} file   File object as in `window.postcssDebug`.
         */

      }, {
        key: '_renderFile',
        value: function _renderFile(file) {
          var className = 'clickable selectable' + (this.selectedFile === file ? ' selected' : '');
          var label = file.path.length > FILE_LABEL_MAX_LENGTH ? '...' + file.path.substr(-FILE_LABEL_MAX_LENGTH + 3) : file.path;

          return html(_templateObject3, className, this._onFileSelect.bind(this, file), label);
        }

        /**
         * @param {object} file   File object as in `window.postcssDebug`.
         */

      }, {
        key: '_onFileSelect',
        value: function _onFileSelect(file) {
          this.selectedFile = file;
          this._render();
          this.snapshotsContainer.show(file.snapshots);
        }
      }]);
      return FileSelector;
    }();

    var fileSelector = new FileSelector(document.getElementById('file-selector'));

    var files = window.postcssDebug.files;


    fileSelector.show(files);

}());
//# sourceMappingURL=app.js.map