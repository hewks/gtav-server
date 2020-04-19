"use strict";

let mysql = module.exports;

console.log('Prepare mysql connect to base...');

var mysql2 = require('mysql');

mysql.connection = mysql2.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'lsfivem_server'
});

mysql.connection.connect(function(err) {
	console.log(err);
    if(err) {
      console.log("Error connecting to the database...");
      throw err;
    } else {
      console.log('Database connected!');
      mysql.connection.query('UPDATE persons SET g_online = ?', [0], function (error, results, fields) {
        console.log(error);
        console.log('Online stats refresh!');
      });
    }
  });

console.log('Loaded mysql data...');

/*

setInterval(function() {
    mysql.connection.query('select 1', function(err, results) {

    });
}, 10000);

*/
