"use strict";

let mysql = module.exports;

console.log('[PR] Mysql connect to base...');

var mysql2 = require('mysql');

mysql.connection = mysql2.createConnection({
    host     : '',
    user     : '',
    password : '',
    database : ''
});

mysql.connection.connect(function(err) {
    if(err) {
      console.log("[ERR] Connecting to the database...");
      throw err;
    } else {
      console.log('[OK] Datebase connected!');
      mysql.connection.query('UPDATE persons SET g_online = ?', [0], function (error, results, fields) {
        console.log('[OK] Online stats refresh!');
      });
    }
});

/*

setInterval(function() {
    mysql.connection.query('select 1', function(err, results) {

    });
}, 10000);

*/
