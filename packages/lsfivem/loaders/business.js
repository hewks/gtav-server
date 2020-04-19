"use strict";

var mysql = require('../modules/mysql.js');

var configure = require('../configure.js');

mysql.connection.query('SELECT * FROM business', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		let status_busy = (parseInt(results[i].state) == 1) ? 1 : 2;
		configure.businessblips[i] = mp.blips.new(parseInt(results[i].blip), new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
		{
		    scale: 1,
		    color: status_busy,
		    drawDistance: 100,
		    shortRange: 100,
		    rotation: 0,
		    dimension: 0,
		});
		if(parseInt(results[i].type) == 1) {
			configure.businessblips[i].name = "Магазин 24/7";
			configure.businessmarkers[i] = mp.markers.new(1, new mp.Vector3(parseFloat(results[i].work_pos_x), parseFloat(results[i].work_pos_y), parseFloat(results[i].work_pos_z)), 1,
			{
			    direction: new mp.Vector3(0,0,0),
			    rotation: new mp.Vector3(0,0,0),
			    visible: true,
			    dimension: 0
			});
			configure.businessmarkers[i].setColor(255, 247, 0, 255);
		} else if(parseInt(results[i].type) == 2) {
			configure.businessblips[i].name = "Автозаправка";
		}
		configure.businesscolshapes[i] = mp.colshapes.newRectangle(results[i].work_pos_x, results[i].work_pos_y, 1, 1);
		configure.businessnumber[i] = results[i].id;
    configure.businesstips[i] = results[i].type;
    configure.businessname[i] = results[i].name;
		configure.businesstate[i] = results[i].state;
		configure.businessowner[i] = results[i].owner;
		configure.businesscoast[i] = results[i].coast;
    configure.businesslock[i] = results[i].lock;
    let owner_text = (parseInt(configure.businessowner[i]) != "NONE") ? "~o~Бизнес на аукционе" : `Владелец: ${configure.businessowner[i]}`;
    let text_lock = (parseInt(configure.businesslock[i]) == 1) ? "~r~Открыт" : "~r~Закрыт";
    configure.businesslabels[i] = mp.labels.new(`${configure.businessname[i]}~n~${owner_text}~n~${text_lock}`, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
    {
        los: false,
        font: 1,
        drawDistance: 20,
        color: 2,
        dimension: 0
    });
		configure.loaded_business_count++;
	}
	console.log('[I] Loaded business: ' + configure.loaded_business_count.toString());
});
