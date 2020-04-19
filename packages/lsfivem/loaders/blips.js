"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM blips', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		configure.blips[i] = mp.blips.new(parseInt(results[i].blip), new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
		{
				scale: parseFloat(results[i].scale),
				color: parseInt(results[i].color),
				alpha: parseFloat(results[i].alpha),
				drawDistance: parseInt(results[i].drawDistance),
				shortRange: parseInt(results[i].shortRange),
				rotation: parseInt(results[i].rotation),
				dimension: parseInt(results[i].dimension),
		});
		configure.blips[i].name = results[i].blip_name;
		configure.loaded_blips_count++;
	}
	console.log('[I] Loaded blips: ' + configure.loaded_blips_count.toString());
});

/* LM-12 */
/*
blipshs[6] = mp.blips.new(84, new mp.Vector3(parseFloat(-250.99754333496094), parseFloat(-1529.802490234375), parseFloat(31.589208602905273)),
{
		name: "lm12",
		scale: 1.2,
		color: 44,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});
blipshs[6].name = "LM-12";
*/
