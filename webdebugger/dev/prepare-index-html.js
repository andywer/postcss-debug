'use strict'

var fs = require('fs')
var prepareIndexHtml = require('../build').prepareIndexHtml

var sampleData = fs.readFileSync(__dirname + '/sample-data.js', { encoding: 'utf8' })
prepareIndexHtml(sampleData)
