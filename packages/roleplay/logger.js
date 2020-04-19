"use strict";

var fs = require('fs');
var configure = require('./configure.js');

let logger = module.exports;

logger.write = function(text) {
  fs.appendFile('gamemode_log.txt', "\n" + text, (err) => {
      if (err) throw err;
      console.log('[OK] Log update!');
  });
}

logger.console = function(text) {
  console.log(`[${configure.hour}:${configure.min}:${configure.seconds}] ${text}`);
}
