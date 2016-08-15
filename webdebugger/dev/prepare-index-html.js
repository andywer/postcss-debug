'use strict'

var fs = require('fs')
var prepareIndexHtml = require('../build').prepareIndexHtml
var sampleData = require('./sample-data')(3, 5)

prepareIndexHtml(JSON.stringify(sampleData))
