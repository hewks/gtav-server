"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM vehicles', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
    configure.vehicle_params[i]['name'] = results[i].name;
    configure.vehicle_params[i]['pos_x'] = parseFloat(results[i].pos_x);
    configure.vehicle_params[i]['pos_y'] = parseFloat(results[i].pos_y);
    configure.vehicle_params[i]['pos_z'] = parseFloat(results[i].pos_z);
    configure.vehicle_params[i]['heading'] = parseInt(results[i].heading);
    configure.vehicle_params[i]['numberPlate'] = results[i].numberPlate;
    configure.vehicle_params[i]['locked'] = parseInt(results[i].locked);
    configure.vehicle_params[i]['engine'] = parseInt(results[i].engine);
    configure.vehicle_params[i]['dimension'] = parseInt(results[i].dimension);
		configure.vehicle_params[i]['color1_1'] = parseInt(results[i].color1_1);
		configure.vehicle_params[i]['color1_2'] = parseInt(results[i].color1_2);
		configure.vehicle_params[i]['color1_3'] = parseInt(results[i].color1_3);
		configure.vehicle_params[i]['color2_1'] = parseInt(results[i].color2_1);
		configure.vehicle_params[i]['color2_2'] = parseInt(results[i].color2_2);
		configure.vehicle_params[i]['color2_3'] = parseInt(results[i].color2_3);
    configure.vehicle_params[i]['special_status'] = parseInt(results[i].special_status);
		configure.vehicle_params[i]['special_status_rent'] = parseInt(results[i].special_status_rent);
		configure.vehicle_params[i]['special_status_owner'] = "";
    configure.vehicle_params[i]['special_job'] = parseInt(results[i].special_job);
    configure.vehicle_params[i]['special_fraction'] = parseInt(results[i].special_fraction);
    configure.vehicle_params[i]['special_gang'] = parseInt(results[i].special_gang);
		configure.vehicle_params[i]['special_spawn'] = parseInt(results[i].special_spawn);

		configure.sys_vehicles[i] = mp.vehicles.new(mp.joaat(configure.vehicle_params[i]['name']), new mp.Vector3(parseFloat(configure.vehicle_params[i]['pos_x']), parseFloat(configure.vehicle_params[i]['pos_y']), parseFloat(configure.vehicle_params[i]['pos_z'])),
		{
		    heading: configure.vehicle_params[i]['heading'],
		    numberPlate: configure.vehicle_params[i]['numberPlate'],
				locked: configure.vehicle_params[i]['locked'],
		    engine: configure.vehicle_params[i]['engine'],
		    dimension: configure.vehicle_params[i]['dimension']
		});

		if(configure.vehicle_params[i]['special_status'] == 1) {
			function getRandom(min, max) {
			  return Math.random() * (max - min) + min;
			}
			configure.vehicle_params[i]['color1_1'] = parseInt(getRandom(0, 255));
			configure.vehicle_params[i]['color1_2'] = parseInt(getRandom(0, 255));
			configure.vehicle_params[i]['color1_3'] = parseInt(getRandom(0, 255));
			configure.sys_vehicles[i].setColorRGB(configure.vehicle_params[i]['color1_1'], configure.vehicle_params[i]['color1_2'], configure.vehicle_params[i]['color1_3'], configure.vehicle_params[i]['color1_1'], configure.vehicle_params[i]['color1_2'], configure.vehicle_params[i]['color1_3']);
		} else {
			configure.sys_vehicles[i].setColorRGB(configure.vehicle_params[i]['color1_1'], configure.vehicle_params[i]['color1_2'], configure.vehicle_params[i]['color1_3'], configure.vehicle_params[i]['color2_1'], configure.vehicle_params[i]['color2_2'], configure.vehicle_params[i]['color2_3']);
		}

		configure.sys_vehicles[i]['special_status'] = configure.vehicle_params[i]['special_status'];
		configure.sys_vehicles[i]['special_status_rent'] = configure.vehicle_params[i]['special_status_rent'];
		configure.sys_vehicles[i]['special_status_busy'] = false;
		configure.sys_vehicles[i]['special_job'] = configure.vehicle_params[i]['special_job'];
		configure.sys_vehicles[i]['special_fraction'] = configure.vehicle_params[i]['special_fraction'];
		configure.sys_vehicles[i]['special_gang'] = configure.vehicle_params[i]['special_gang'];

		configure.loaded_vehicles_count++;
	}
	console.log('[I] Loaded vehicles: ' + configure.loaded_vehicles_count.toString());

});
