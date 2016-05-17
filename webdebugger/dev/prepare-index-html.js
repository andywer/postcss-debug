'use strict'

var fs = require('fs')

var html = fs.readFileSync(__dirname + '/../src/index.html', { encoding: 'utf8' })
var sampleData = fs.readFileSync(__dirname + '/sample-data.js', { encoding: 'utf8' })

fs.writeFileSync(__dirname + '/../build/index.html', html.replace('/* DEBUG_SNAPSHOTS */', sampleData))
