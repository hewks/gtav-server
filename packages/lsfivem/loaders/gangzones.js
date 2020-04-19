"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM gangzones', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		configure.gangzones[i] = new Array(999);
		configure.gangzones[i].x = results[i].coord_one;
    configure.gangzones[i].y = results[i].coord_two;
    configure.gangzones[i].z = results[i].coord_three;
    configure.gangzones[i].distance = results[i].distance;
    configure.gangzones[i].owner = results[i].owner;
		configure.gangzonecolshapes[i] = mp.colshapes.newRectangle(results[i].coord_one, results[i].coord_two, results[i].distance * 2, results[i].distance * 2);
		configure.loaded_gangzones_count++;
	}
	console.log('[I] Loaded gangzones: ' + configure.loaded_gangzones_count.toString());
});
