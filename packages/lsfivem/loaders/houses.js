"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM houses', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		let status_busy = (parseInt(results[i].state) == 1) ? 1 : 2;
		configure.housesblips[i] = mp.blips.new(40, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
		{
				name: (results[i].rare == 0) ? "Жилой дом [H]" : (results[i].rare == 1) ? "Жилой дом [M]" : (results[i].rare == 2) ? "Жилой дом [R]" : "Жилой дом [A]",
				scale: 1,
				color: status_busy,
				drawDistance: 100,
				shortRange: true,
				rotation: 0,
				dimension: 0,
		});
		configure.housesmarkers[i] = mp.markers.new(0, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)), 1,
		{
		    direction: new mp.Vector3(0,0,0),
		    rotation: new mp.Vector3(0,0,0),
		    visible: true,
		    dimension: 0
		});
		configure.housesmarkers[i].setColor(255, 247, 0, 255);
		configure.housescolshapes[i] = mp.colshapes.newRectangle(results[i].pos_x, results[i].pos_y, 1, 1);
		configure.housesnumber[i] = results[i].id;
		configure.housestate[i] = results[i].state;
		configure.housesrare[i] = results[i].rare;
		configure.housesowner[i] = results[i].owner;
		configure.housescoast[i] = results[i].coast;
		configure.housesinterior[i] = results[i].interior;
		configure.housesgarage[i] = results[i].garage;
		if(configure.housesgarage[i] != 0) {
			configure.housesgaragecolshapes[i] = mp.colshapes.newRectangle(results[i].garage_pos_x, results[i].garage_pos_y, 1, 1);
		}
		configure.loaded_houses_count++;
	}
	console.log('[I] Loaded houses: ' + configure.loaded_houses_count.toString());
	console.log('[!] Done... Good Luck!');
});
