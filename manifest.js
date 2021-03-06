#!/usr/bin/env node
require('module-alias/register');
var Mincer = require('mincer');
var path = require('path');

//
// Get Mincer environment
//

var environment = require('./environment');

//
// Create and compile Manifest
//

var manifest = new Mincer.Manifest(environment, path.join(__dirname, 'public', 'assets'));

try {
  var assetsData = manifest.compile(['application.js', 'application.css', '*.png'], {
    compress: true,
    sourceMaps: true,
    embedMappingComments: true
  });

  /* eslint-disable no-console */
  console.info('\n\nAssets were successfully compiled.\n' +
    'Manifest data (a proper JSON) was written to:\n' +
    manifest.path + '\n\n');
  console.dir(assetsData);
} catch (err) {
  console.error('Failed compile assets: ' + (err.message || err.toString()));
  process.exit(1);
}
