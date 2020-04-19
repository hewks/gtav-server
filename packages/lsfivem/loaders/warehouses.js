"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM warehouses', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
    configure.warehouses[i+1].id = results[i].organization;
    configure.warehouses[i+1].bank = results[i].bank;
    configure.warehouses[i+1].materials = results[i].mats;
		configure.loaded_warehouses_count++;
	}
	console.log('[I] Loaded warehouses: ' + configure.loaded_warehouses_count.toString());
});
