"use strict";

let func = module.exports;

var mysql = require('./modules/mysql.js');
var configure = require('./configure.js');
var chat = require('./modules/chat.js');
var fraction = require('./configs/fractions.js');
var gang = require('./configs/gangs.js');
var struct = require('./struct.js');
var logger = require('./modules/logger.js');

func.getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}

function system_timer_one_min() {
  configure.date = new Date();
  configure.hour = configure.date.getHours();
  configure.min = configure.date.getMinutes();
  configure.seconds = configure.date.getSeconds();
  mp.world.time.hour = configure.hour;
  mp.world.time.minute = configure.min;
  mp.world.time.second = configure.seconds;

  mp.players.forEach(_player => {
    struct.person_auth[_player.id].flood_message_count = 0;
    if(struct.person_data[_player.id].g_jail == 1) {
      struct.person_data[_player.id].g_jail_time--;
      if(struct.person_data[_player.id].g_jail_time == 0) {
        struct.person_data[player.id].g_jail = 0;
        chat.local(player, 'FFFFFF', "Вы заплатили свой долг обществу");
        player.position = new mp.Vector3(parseFloat(431.870849609375), parseFloat(-981.7169799804688), parseFloat(30.71070098876953));
      }
    }
  });

  if(configure.gangzonestatusnow == 1) {

    let show_time_war = "";
    let show_time_sec, show_time_min;
    configure.gangzonestatustimer_sec++;

    if(configure.gangzonestatustimer_sec >= 60) {
      configure.gangzonestatustimer_min++;
      configure.gangzonestatustimer_sec = 0;
      configure.gangzonestatustimer = `${configure.gangzonestatustimer_min}:${configure.gangzonestatustimer_sec}`;
    } else if(configure.gangzonestatustimer_min == 0) {
      configure.gangzonestatustimer = `${configure.gangzonestatustimer_sec}`;
    } else if(configure.gangzonestatustimer_min >= 1) {
      configure.gangzonestatustimer = `${configure.gangzonestatustimer_min}:${configure.gangzonestatustimer_sec}`;
    }

    mp.players.forEach(_player => {
      if(struct.person_data[_player.id].g_gang >= 1) {
        _player.call('captureGangStart', [configure.gangzonestatuswar, configure.gangzonesfrags_grove, configure.gangzonesfrags_ballas, configure.gangzonestatustimer]);
      }
    });

  }

  if(configure.gangzonestatustimer == "20:0") {

    let winner_color = 0, new_owner = 0;
    if(configure.gangzonesfrags_grove == configure.gangzonesfrags_ballas) {
      if(configure.gangzones[configure.gangzonestatusnowid].owner == 1) {
        winner_color = 83;
        new_owner = 2;
        configure.gangzones[configure.gangzonestatusnowid].owner = 2;
      } else if(configure.gangzones[configure.gangzonestatusnowid].owner == 2) {
        winner_color = 2;
        new_owner = 1;
        configure.gangzones[configure.gangzonestatusnowid].owner = 1;
      }
    } else if(configure.gangzonesfrags_grove >= configure.gangzonesfrags_ballas) {
      winner_color = 2;
      new_owner = 1;
      configure.gangzones[configure.gangzonestatusnowid].owner = 1;
    } else if(configure.gangzonesfrags_grove <= configure.gangzonesfrags_ballas) {
      winner_color = 83;
      new_owner = 2;
      configure.gangzones[configure.gangzonestatusnowid].owner = 2;
    }

    func.saveGangZones(configure.gangzonestatusnowid, configure.gangzones[configure.gangzonestatusnowid].owner);

    configure.gangzonestatusnow = 0;
    configure.gangzonestatustimer = 0;
    configure.gangzonestatustimer_min = 0;
    configure.gangzonestatustimer_sec = 0;

    mp.players.forEach(_player => {
      struct.person_sys[_player.id].enter_gangzone_war = 0;
      if(struct.person_data[_player.id].g_gang >= 1) {
        _player.call('captureGangStop', [struct.person_sys[_player.id].storage_blip[parseInt(configure.gangzonestatusnowid)], winner_color]);
        if(new_owner == 1) {
          chat.local(_player, '00FF2E', `The Grove Street Gang захватили территорию. Оппозиция The Ballas Gang`);
        } else if(new_owner == 2) {
          chat.local(_player, 'E500FF', `The Ballas Gang захватили территорию. Оппозиция The Grove Street Gang`);
        }
      }
    });

    configure.gangzonestatuswar = 0;
    configure.gangzonestatusnowid = 0;

  }
}

setInterval(system_timer_one_min, 1000);

func.loadCharacter = function(player) {
  let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
  let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
  let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
  for(let s1 = 1; s1 <= 11; s1++) {
    player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
  }
  for(let s2 = 0; s2 <= 2; s2++) {
    player.setProp(s2, props[s2].drawable, props[s2].texture);
  }
  let detailface = JSON.parse(struct.person_data[player.id].g_character_style_4);
  for(let d1 = 0; d1 <= 18; d1++) {
    player.setFaceFeature(d1, parseFloat(detailface[0]));
  }
  player.setHairColor(struct.person_data[player.id].g_character_head_color, struct.person_data[player.id].g_character_head_color);
  player.setHeadBlend(parseFloat(blend[0]), parseFloat(blend[1]), parseFloat(blend[2]), parseFloat(blend[0]), parseFloat(blend[1]), parseFloat(blend[3]), 0, 0, parseFloat(blend[3]));
}

func.loadComponent = function(player, type1, type2) {
  let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
  let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
  let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);

  if(parseInt(type1) == 1) {
    for(let s1 = 1; s1 <= 11; s1++) {
      if(s1 == parseInt(type2)) {
        player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
      }
    }
  } else if(parseInt(type1) == 2) {
    for(let s2 = 0; s2 <= 7; s2++) {
      if(s2 == parseInt(type2)) {
        player.setProp(s2, props[s2].drawable, props[s2].texture);
      }
    }
  }
}

func.dispatcher = function(player, caller, type) {
  if(parseInt(type) == 0) {
    player.call('addCheckPoint', [10, new mp.Vector3(parseFloat(caller.position.x), parseFloat(caller.position.y), parseFloat(caller.position.z)), 0]);
    player.call('addMapPoint', [1, new mp.Vector3(parseFloat(caller.position.x), parseFloat(caller.position.y), parseFloat(caller.position.z))]);
  } else if(parseInt(type) == 1) {
    player.call('addCheckPoint', [11, new mp.Vector3(parseFloat(caller.position.x), parseFloat(caller.position.y), parseFloat(caller.position.z)), 0]);
    player.call('addMapPoint', [1, new mp.Vector3(parseFloat(caller.position.x), parseFloat(caller.position.y), parseFloat(caller.position.z))]);
  } else if(parseInt(type) == 2) {
    player.call('delMapPoint', []); player.call('delCheckPoint', []);
  }
}

func.JobBus = function(player, rais, checkhelpoints, checknumpoint) {
  if(parseInt(rais) == 1) {
    console.log(`OWN CHECK: ${checknumpoint}; HELP CHECK: ${checkhelpoints}`);
    if(checknumpoint == 0) {
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(404.268310546875), parseFloat(-671.4325561523438), parseFloat(29)), 0]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(404.268310546875), parseFloat(-671.4325561523438), parseFloat(29))]);
    } else if(checknumpoint == 1 && checkhelpoints == 0) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(313.2313232421875), parseFloat(-649.2468872070312), parseFloat(28.773759841918945)), 11]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(313.2313232421875), parseFloat(-649.2468872070312), parseFloat(28.773759841918945))]);
    } else if(checknumpoint == 1 && checkhelpoints == 1) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(106.84131622314453), parseFloat(-568.3339233398438), parseFloat(31)), 12]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(106.84131622314453), parseFloat(-568.3339233398438), parseFloat(31))]);
    } else if(checknumpoint == 1 && checkhelpoints == 2) { // end
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(60.255916595458984), parseFloat(-657.29345703125), parseFloat(31)), 0]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(60.255916595458984), parseFloat(-657.29345703125), parseFloat(31))]);
    } else if(checknumpoint == 2 && checkhelpoints == 2) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(32.37792205810547), parseFloat(-755.5144653320312), parseFloat(31.58058738708496)), 11]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(32.37792205810547), parseFloat(-755.5144653320312), parseFloat(31.58058738708496))]);
    } else if(checknumpoint == 2 && checkhelpoints == 3) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(-34.79875183105469), parseFloat(-933.1693115234375), parseFloat(29.35404396057129)), 12]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-34.79875183105469), parseFloat(-933.1693115234375), parseFloat(29.35404396057129))]);
    } else if(checknumpoint == 2 && checkhelpoints == 4) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(-179.04104614257812), parseFloat(-891.34912109375), parseFloat(29.33979034423828)), 13]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-179.04104614257812), parseFloat(-891.34912109375), parseFloat(29.33979034423828))]);
    } else if(checknumpoint == 2 && checkhelpoints == 5) {
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-244.4712677001953), parseFloat(-1006.9932861328125), parseFloat(28.968027114868164)), 0]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-244.4712677001953), parseFloat(-1006.9932861328125), parseFloat(28.968027114868164))]);
    } else if(checknumpoint == 3 && checkhelpoints == 2) { // not yet2-1
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-244.4712677001953), parseFloat(-1006.9932861328125), parseFloat(28.968027114868164))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-244.4712677001953), parseFloat(-1006.9932861328125), parseFloat(28.968027114868164))]);
    } else if(checknumpoint == 4 && checkhelpoints == 2) { // not yet3-1
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-532.3560180664062), parseFloat(-1001.08154296875), parseFloat(23.098217010498047))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-532.3560180664062), parseFloat(-1001.08154296875), parseFloat(23.098217010498047))]);
    } else if(checknumpoint == 5 && checkhelpoints == 2) { // not yet4
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-841.0404052734375), parseFloat(-1145.058837890625), parseFloat(6.921145915985107))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-841.0404052734375), parseFloat(-1145.058837890625), parseFloat(6.921145915985107))]);
    } else if(checknumpoint == 6 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1034.5452880859375), parseFloat(-1550.76220703125), parseFloat(5.020487308502197))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1034.5452880859375), parseFloat(-1550.76220703125), parseFloat(5.020487308502197))]);
    } else if(checknumpoint == 7 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1076.6707763671875), parseFloat(-1588.1923828125), parseFloat(4.297313690185547))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1076.6707763671875), parseFloat(-1588.1923828125), parseFloat(4.297313690185547))]);
    } else if(checknumpoint == 8 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1177.67333984375), parseFloat(-1277.5809326171875), parseFloat(5.580826282501221))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1177.67333984375), parseFloat(-1277.5809326171875), parseFloat(5.580826282501221))]);
    } else if(checknumpoint == 9 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1599.2088623046875), parseFloat(-613.3511962890625), parseFloat(31.405378341674805))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1599.2088623046875), parseFloat(-613.3511962890625), parseFloat(31.405378341674805))]);
    } else if(checknumpoint == 10 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1424.227783203125), parseFloat(-432.6309509277344), parseFloat(35.872440338134766))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1424.227783203125), parseFloat(-432.6309509277344), parseFloat(35.872440338134766))]);
    } else if(checknumpoint == 11 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-1101.9779052734375), parseFloat(-284.2100524902344), parseFloat(37.63135528564453))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-1101.9779052734375), parseFloat(-284.2100524902344), parseFloat(37.63135528564453))]);
    } else if(checknumpoint == 12 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-633.7051391601562), parseFloat(-63.67927932739258), parseFloat(40.76791000366211))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-633.7051391601562), parseFloat(-63.67927932739258), parseFloat(40.76791000366211))]);
    } else if(checknumpoint == 13 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(-408.07177734375), parseFloat(-65.06011962890625), parseFloat(43.91555404663086))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(-408.07177734375), parseFloat(-65.06011962890625), parseFloat(43.91555404663086))]);
    } else if(checknumpoint == 14 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(279.0760498046875), parseFloat(-252.75759887695312), parseFloat(53.88371276855469))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(279.0760498046875), parseFloat(-252.75759887695312), parseFloat(53.88371276855469))]);
    } else if(checknumpoint == 15 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(769.424072265625), parseFloat(-928.0022583007812), parseFloat(25.425752639770508))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(769.424072265625), parseFloat(-928.0022583007812), parseFloat(25.425752639770508))]);
    } else if(checknumpoint == 16 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(409.224365234375), parseFloat(-908.5487670898438), parseFloat(29.306793212890625))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(409.224365234375), parseFloat(-908.5487670898438), parseFloat(29.306793212890625))]);
    } else if(checknumpoint == 17 && checkhelpoints == 2) { // not yet5
      player.call('delMapPoint', []); player.call('delCheckPoint', []);
      player.call('addCheckPoint', [0, new mp.Vector3(parseFloat(404.268310546875), parseFloat(-671.4325561523438), parseFloat(29))]);
      player.call('addMapPoint', [1, new mp.Vector3(parseFloat(404.268310546875), parseFloat(-671.4325561523438), parseFloat(29))]);
      console.log('end raise');
    }
  }
}

func.saveGangZones = function(gangid, newowner) {
  logger.console('[A] System: SaveGagZones; Status: Start;');
  var query = mysql.connection.query('UPDATE `gangzones` SET owner = ? WHERE id = ?', [newowner, gangid], function (error, results, fields) {

  });
  logger.console('[A] System: SaveGagZones; Status: End;');
}

func.spawnPosition = function(player) {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_sys[player.id].fraction_ready == 1) {
    player.spawn(new mp.Vector3(parseFloat(-2360.62060546875),parseFloat(3249.447265625),parseFloat(32.81074523925781)));
  } else if(struct.person_data[player.id].g_fraction == 2 && struct.person_sys[player.id].fraction_ready == 1) {
    player.spawn(new mp.Vector3(parseFloat(457.596435546875),parseFloat(-990.7761840820312),parseFloat(30.689599990844727)));
  } else if(struct.person_data[player.id].g_fraction == 3) {
    player.spawn(new mp.Vector3(parseFloat(-599.0673217773438),parseFloat(-929.88623046875),parseFloat(23.86334228515625)));
    player.heading = 91;
  } else if(struct.person_data[player.id].g_gang == 1) {
    player.giveWeapon(mp.joaat('weapon_bat'), 1);
    player.heading = 179;
    player.spawn(new mp.Vector3(parseFloat(1042.2713623046875),parseFloat(-3195.41845703125),parseFloat(-38.162960052490234)));
  } else if(struct.person_data[player.id].g_gang == 2) {
    player.giveWeapon(mp.joaat('weapon_bat'), 1);
    player.spawn(new mp.Vector3(parseFloat(126.38209533691406),parseFloat(-1284.3297119140625),parseFloat(29.28255271911621)));
    player.heading = 208;
  } else {
    mysql.connection.query('SELECT * FROM houses WHERE owner = ?', [player.name], function (err4, selecthouse) {
      if(selecthouse[0]) {
        player.dimension = 10000 + selecthouse[0].id;
        if(selecthouse[0].rare == 0) {
          if(selecthouse[0].interior == 0) {
            player.position = configure.housesinterior_rare0_pos0;
          } else if(selecthouse[0].interior == 1) {
            player.position = configure.housesinterior_rare0_pos1;
          }
        } else if(selecthouse[0].rare == 1) {
          player.position = configure.housesinterior_rare0_pos1;
        } else if(selecthouse[0].rare == 2) {
          if(configure.housesinterior[parseInt(args[1])] == 0) {
            player.position = configure.housesinterior_rare2_pos0;
          } else if(selecthouse[0].rare == 1) {
            player.position = configure.housesinterior_rare2_pos1;
          } else if(selecthouse[0].rare == 2) {
            player.position = configure.housesinterior_rare2_pos2;
          }
        }
        struct.person_sys[player.id].enter_limit = 1;
        struct.person_sys[player.id].enter_house = selecthouse[0].id;
      } else {
        let get_spawn = parseInt(func.getRandom(0,2));
        if(get_spawn == 0) {
          player.spawn(new mp.Vector3(parseFloat(-268.30657958984375), parseFloat(-957.444580078125), parseFloat(31.223134994506836)));
          player.heading = 202;
        } else if(get_spawn == 1) {
          player.spawn(new mp.Vector3(parseFloat(-824.635498046875), parseFloat(-1221.31005859375), parseFloat(7.365410804748535)));
          player.heading = 202;
        }
        struct.person_sys[player.id].enter_limit = 0;
      }
    });
  }
}

func.loadMapGangZones = function(player) {
  let hashes = new Array(10);
  hashes[0] = "0xF20857E4CB32A2B7"; // set alpha
  hashes[1] = "0x4B4040A0EC7DBA81"; // set sprite
  hashes[2] = "0xC71C8E276E3EC54"; // set color
  hashes[3] = "0x3ED68ABD7299EAA3"; // set display
  hashes[4] = "0x66DAED36FB41050D"; // set short
  for(let i = 0; i < configure.loaded_gangzones_count; i++) {
    let get_color_zone = 0;
    if(configure.gangzones[i].owner == 1) {
      get_color_zone = 2;
    } else if(configure.gangzones[i].owner == 2) {
      get_color_zone = 83;
    } else if(configure.gangzones[i].owner == 101) {
      get_color_zone = 56;
    }
    player.call('addGangZone', [i, hashes, configure.gangzones[i].x, configure.gangzones[i].y, configure.gangzones[i].z, configure.gangzones[i].distance, get_color_zone]);
  }
}

func.spawnVehicle = function() {
  logger.console('[PR] System: Spawn Vehicles; Status: Start;');
	for(let i = 0; i <= configure.sys_vehicles.length; i++) {
		if(configure.sys_vehicles[i]) {
			let ret_occup, get_model, get_position, get_heading, get_color1_1, get_color1_2, get_color1_3, get_color2_1, get_color2_2, get_color2_3, get_numpl, get_locked, get_engine, get_dimension, get_special_spawn;
      ret_occup = configure.sys_vehicles[i].getOccupants();
			get_model = configure.sys_vehicles[i].model;
			get_position = new mp.Vector3(parseFloat(configure.vehicle_params[i]['pos_x']), parseFloat(configure.vehicle_params[i]['pos_y']), parseFloat(configure.vehicle_params[i]['pos_z']));
			get_heading = configure.vehicle_params[i]['heading'];
			get_numpl = configure.vehicle_params[i]['numberPlate'];
      //get_locked = configure.vehicle_params[i]['locked'];
      get_engine = configure.vehicle_params[i]['engine'];
      get_dimension = configure.vehicle_params[i]['dimension'];
      get_special_spawn = configure.vehicle_params[i]['special_spawn'];
			if(ret_occup == "") {
        if(get_special_spawn == 0) {
  				configure.sys_vehicles[i].destroy();
  				function create_car() {
  					configure.sys_vehicles[i] = mp.vehicles.new(parseInt(get_model), get_position,
  					{
  							heading: get_heading,
  							engine: get_engine,
  							dimension: get_dimension
  					});
  					configure.sys_vehicles[i].setColorRGB(configure.vehicle_params[i]['color1_1'], configure.vehicle_params[i]['color1_2'], configure.vehicle_params[i]['color1_3'], configure.vehicle_params[i]['color2_1'], configure.vehicle_params[i]['color2_2'], configure.vehicle_params[i]['color2_3']);
  					configure.sys_vehicles[i].numberPlate = get_numpl;
            configure.sys_vehicles[i]['special_status'] = configure.vehicle_params[i]['special_status'];
            configure.sys_vehicles[i]['special_status_rent'] = configure.vehicle_params[i]['special_status_rent'];
            configure.sys_vehicles[i]['special_status_busy'] = false;
            configure.sys_vehicles[i]['special_job'] = configure.vehicle_params[i]['special_job'];
            configure.sys_vehicles[i]['special_fraction'] = configure.vehicle_params[i]['special_fraction'];
            configure.sys_vehicles[i]['special_gang'] = configure.vehicle_params[i]['special_gang'];
  				}
          setTimeout(create_car, 1000);
        }
			}
		}
	}
  configure.spawnvehicle_counter++;
  logger.console('[OK] System: Spawn Vehicles; Status: Complete;');
}

func.loadData = function(getdata, player, struct) {
  struct.person_data[player.id].id = getdata.id;
  struct.person_data[player.id].g_name = getdata.g_name;
  struct.person_data[player.id].g_password = getdata.g_password;
	struct.person_data[player.id].g_status = getdata.g_status;
	struct.person_data[player.id].g_warns = getdata.g_warns;
	struct.person_data[player.id].g_web_ip = getdata.web_ip;
  struct.person_data[player.id].g_game_ip = getdata.game_ip;
  struct.person_data[player.id].g_ipreg = getdata.ipreg;
	struct.person_data[player.id].g_online = getdata.g_online;
	struct.person_data[player.id].g_sex = getdata.g_sex;
	struct.person_data[player.id].g_character_create = getdata.g_character_create;
	struct.person_data[player.id].g_character_style_1 = getdata.g_character_style_1;
	struct.person_data[player.id].g_character_style_2 = getdata.g_character_style_2;
	struct.person_data[player.id].g_character_style_3 = getdata.g_character_style_3;
	struct.person_data[player.id].g_character_style_4 = getdata.g_character_style_4;
	struct.person_data[player.id].g_character_head_color = getdata.g_character_head_color;
  struct.person_data[player.id].g_level = getdata.g_level;
	struct.person_data[player.id].g_exp = getdata.g_exp;
	struct.person_data[player.id].g_money = getdata.g_money;
  struct.person_data[player.id].g_hungry = getdata.g_hungry;
  struct.person_data[player.id].g_wanted = getdata.g_wanted;
  struct.person_data[player.id].g_jail = getdata.g_jail;
  struct.person_data[player.id].g_jail_camera = getdata.g_jail_camera;
  struct.person_data[player.id].g_jail_time = getdata.g_jail_time;
	struct.person_data[player.id].g_victims = getdata.g_victims;
	struct.person_data[player.id].g_respect = getdata.g_respect;
	struct.person_data[player.id].g_zavisim = getdata.g_zavisim;
	struct.person_data[player.id].g_drugs = getdata.g_drugs;
	struct.person_data[player.id].g_materials = getdata.g_materials;
	struct.person_data[player.id].g_health = getdata.g_health;
	struct.person_data[player.id].g_armour = getdata.g_armour;
	struct.person_data[player.id].g_job = getdata.g_job;
	struct.person_data[player.id].g_fraction = getdata.g_fraction;
	struct.person_data[player.id].g_fraction_clothes = getdata.g_fraction_clothes;
	struct.person_data[player.id].g_fraction_rang = getdata.g_fraction_rang;
	struct.person_data[player.id].g_gang = getdata.g_gang;
	struct.person_data[player.id].g_gang_clothes = getdata.g_gang_clothes;
	struct.person_data[player.id].g_gang_rang = getdata.g_gang_rang;
}

func.resetData = function(player, struct) {
	struct.person_sys[player.id] = {
    auth_status: 0,
    voice_active: 0,
    voice_listen: 0,
    voice_disabled: 0,
    chat_timer: 0,
    chat_counter: 0,
    bhead_data1: 0,
    bhead_data2: 0,
    bhead_data3: 0,
    hair_color: 0,
    freeze: 0,
    duehuman: 0,
    spec: 0,
    active_phone: 0,
    fraction_ready: 0,
    fraction_ammo: 0,
    job_style: 0,
    job_enter: 0,
    job_action: 0,
    job_count: 0,
    job_payday: 0,
    enter_limit: 0,
    enter_house: -1,
    enter_garage: -1,
    store_money: 0,
    rent_money: 0,
    rent_car: "",
    person_summon_cars: 0,
    person_car: new Array(6),
    person_car_active: -1,
    store_complect_1: 0,
    store_complect_2: 0,
    store_complect_3: 0,
    store_complect_4: 0,
    store_complect_color: 0,
    storage_blip: new Array(999),
    bus_checkpoints: new Array(999),
    bus_checknumpoints: 0,
    bus_checknumhelpoints: 0,
    enter_gangzone: 0,
    enter_gangzone_war: 0,
    enter_materials: 0,
    admin_save_pos_x: 0,
    admin_save_pos_y: 0,
    admin_save_pos_z: 0,
    admin_sel_object_id: 0,
    admin_alogin_auth: 0,
    admin_alogin_level: 0,
    timestamp: 0
  };

  struct.person_data[player.id] = {
    id: 0,
    g_name:"",
    g_password:"",
    g_online:0,
    g_status:0,
    g_warns:0,
    g_web_ip:"",
    g_game_ip:"",
    g_ipreg:"",
    g_sex:"",
    g_character_create:0,
    g_character_style_1:"",
    g_character_style_2:"",
    g_character_style_3:"",
    g_character_style_4:"",
    g_character_head_color:0,
    g_level:0,
    g_exp:0,
    g_money:0,
    g_hungry:0,
    g_wanted:0,
    g_jail:0,
    g_jail_camera:0,
    g_jail_time:0,
    g_victims: 0,
    g_respect: 0,
    g_zavisim: 0,
    g_drugs: 0,
    g_materials: 0,
    g_health:100,
    g_armour:100,
    g_job:0,
    g_fraction:0,
    g_fraction_clothes:0,
    g_fraction_rang:0,
    g_gang:0,
    g_gang_clothes:0,
    g_gang_rang:0,
  };

	logger.console(`${player.name} all data reset!`);

}

func.updateTab = function(struct, setfraction, setgangs) {
	configure.online = 0;
	let cleartab = 0;
	let text = "";
	mp.players.forEach(_player => {
		configure.online++;
		if(struct.person_sys[_player.id].auth_status == 0) {
			text = text + `
				<tr id="player-${_player.id}">
					<td class="id">${_player.id}</td>
					<td class="name">Guest</td>
          <td class="name">-</td>
					<td class="name">-</td>
					<td class="name">${_player.ping} ms.</td>
				</tr>`;
		} else {
		  let fraction_let = setfraction.get_name(struct.person_data[_player.id].g_fraction);
			let gang_let = setgangs.get_name(struct.person_data[_player.id].g_gang);
			let type_fg = "";
			if(struct.person_data[_player.id].g_fraction >= 1) {
				type_fg = fraction_let;
			} else if(struct.person_data[_player.id].g_gang >= 1) {
				type_fg = gang_let;
			} else {
				type_fg = "-";
			}
			text = text + `
				<tr id="player-${_player.id}">
					<td class="id">${_player.id}</td>
					<td class="name">${_player.name}</td>
          <td class="name">${struct.person_data[_player.id].g_level} г.</td>
					<td class="name">${type_fg}</td>
					<td class="name">${_player.ping} ms.</td>
				</tr>`;
		}
	});
	mp.players.forEach(_player => {
		_player.call('clearTab');
		_player.call('updateTab', [`${text}`, configure.online]);
	});
  configure.tab_counter++;
}

func.setFractionClothes = function(player, fractionid, struct) {
	player.setClothes(3, 1, 0, 0);
	player.setClothes(4, 46, 0, 0);
	player.setClothes(6, 63, 0, 0);
	player.setClothes(8, 15, 0, 0);
	player.setClothes(11, 98, 0, 0);
}

func.paydayHour = function() {
  logger.console('[A] System: PayDay; Status: Start;');
	mp.world.weather = configure.weather;
  configure.gangzonescapturehour = 0;
	for(let i = 0; i < configure.jobs_1_markers.length; i++) {
		configure.jobs_1_markers[i].setColor(255, 247, 0, 255);
		configure.jobs_1_status[i] = 0;
	}
	let zp_count = 0;
	let payday_get = 0;
  let gangzones_grove = 0;
  let gangzones_ballas = 0;
  for(let check1 = 0; check1 < configure.loaded_gangzones_count; check1++) {
    if(configure.gangzones[check1].owner == 1) {
      gangzones_grove++;
    } else if(configure.gangzones[check1].owner == 2) {
      gangzones_ballas++;
    }
  }
	mp.players.forEach(_player => {
		if(struct.person_sys[_player.id].auth_status >= 1) {
			chat.local(_player, 'DFD1FC', '--------===[ КЛИЕНТ БАНКА LS ]===-------');
			chat.local(_player, 'DFD1FC', '[N] Налог государству: 0$');
			if(struct.person_sys[_player.id].job_enter == 1 || struct.person_data[_player.id].g_job >= 1) {
				if(struct.person_data[_player.id].g_job == 1) {
          if(struct.person_sys[_player.id].job_payday >= 1) {
					  zp_count = 1000;
          } else {
            chat.local(_player, 'DFD1FC', `[T] Диспетчер: у вас не было ни одного пассажира`);
          }
          chat.local(_player, 'DFD1FC', `[T] Ваша зарплата таксиста: ${zp_count}$`);
				}
			} else if(struct.person_data[_player.id].g_fraction >= 1) {
				zp_count = struct.person_data[_player.id].g_fraction_rang * 100;
				chat.local(_player, 'DFD1FC', `[F] Ваша зарплата: ${zp_count}$`);
			} else if(struct.person_data[_player.id].g_gang >= 1) {
        if(struct.person_data[_player.id].g_gang == 1) {
          zp_count = gangzones_grove * 3;
          chat.local(_player, 'DFD1FC', `[G] Под контроллем банды: ${gangzones_grove} терр.`);
        } else if(struct.person_data[_player.id].g_gang == 2) {
          zp_count = gangzones_ballas * 3;
          chat.local(_player, 'DFD1FC', `[G] Под контроллем банды: ${gangzones_ballas} терр.`);
        }
        chat.local(_player, 'DFD1FC', `[G] Ваша доля банды: ${zp_count}$`);
      } else {
        zp_count = 50;
				chat.local(_player, 'DFD1FC', `[W] Пособие по безработице: ${zp_count}$`);
			}
      chat.local(_player, 'DFD1FC', '[B] На вашем банковском счету: 0$');
			chat.local(_player, 'DFD1FC', '===================================');
      struct.person_data[_player.id].g_exp = struct.person_data[_player.id].g_exp + 1;
      let get_exp_new_level = struct.person_data[_player.id].g_level * 8;
      if(get_exp_new_level == struct.person_data[_player.id].g_exp) {
        struct.person_data[_player.id].g_level++;
        struct.person_data[_player.id].g_exp = 0;
      }
			struct.person_data[_player.id].g_money = struct.person_data[_player.id].g_money + zp_count;
			struct.person_sys[_player.id].fraction_ammo = 0;
      struct.person_data[_player.id].g_hungry = struct.person_data[_player.id].g_hungry - 2;
			func.updateData(_player, struct);
			func.updatePersonData(2, _player, struct);
			payday_get++;
		}
	});

	if(payday_get >= 1) {
		logger.console(`[A] System: PayDay; Status: ${payday_get} humans;`);
	} else {
		logger.console('[A] System: PayDay; Status: Not Get;');
	}
	logger.console('[OK] System: PayDay; Status: Complete;');
  configure.payday_counter++;
}

func.updatePersonData = function(type, player, struct) {
	if(parseInt(type) == 1) {
    mysql.connection.query('UPDATE persons SET g_warns = ?, g_online = 0, g_character_create = ?, g_character_style_1 = ?, g_character_style_2 = ?, g_character_style_3 = ?, g_character_head_color = ?, g_level = ?, g_exp = ?, g_money = ?, g_hungry = ?, g_wanted = ?, g_jail = ?, g_jail_camera = ?, g_jail_time = ?, g_victims = ?, g_respect = ?, g_drugs = ?, g_materials = ?, g_health = ?, g_armour = ?, g_job = ?, g_fraction = ?, g_fraction_clothes = ?, g_fraction_rang = ?, g_gang = ?, g_gang_clothes = ?, g_gang_rang = ? WHERE g_name = ?', [struct.person_data[player.id].g_warns, struct.person_data[player.id].g_character_create, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_data[player.id].g_character_head_color, struct.person_data[player.id].g_level, struct.person_data[player.id].g_exp, struct.person_data[player.id].g_money, struct.person_data[player.id].g_hungry, struct.person_data[player.id].g_wanted, struct.person_data[player.id].g_jail, struct.person_data[player.id].g_jail_camera, struct.person_data[player.id].g_jail_time, struct.person_data[player.id].g_victims, struct.person_data[player.id].g_respect, struct.person_data[player.id].g_zavisim, struct.person_data[player.id].g_drugs, struct.person_data[player.id].g_health, struct.person_data[player.id].g_armour, struct.person_data[player.id].g_job, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes, struct.person_data[player.id].g_fraction_rang, struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_clothes, struct.person_data[player.id].g_gang_rang, struct.person_data[player.id].g_name], function (error, results, fields) {
      console.log(error);
    });
    console.log('test1');
	} else if(parseInt(type) == 2) {
    mysql.connection.query('UPDATE persons SET g_character_create = ?, g_character_style_1 = ?, g_character_style_2 = ?, g_character_style_3 = ?, g_character_head_color = ?, g_level = ?, g_exp = ?, g_money = ?, g_hungry = ?, g_wanted = ?, g_jail = ?, g_jail_camera = ?, g_jail_time = ?, g_victims = ?, g_respect = ?, g_drugs = ?, g_materials = ?, g_health = ?, g_armour = ?, g_job = ?, g_fraction = ?, g_fraction_clothes = ?, g_fraction_rang = ?, g_gang = ?, g_gang_clothes = ?, g_gang_rang = ? WHERE g_name = ?', [struct.person_data[player.id].g_character_create, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_data[player.id].g_character_head_color, struct.person_data[player.id].g_level, struct.person_data[player.id].g_exp, struct.person_data[player.id].g_money, struct.person_data[player.id].g_money, struct.person_data[player.id].g_hungry, struct.person_data[player.id].g_wanted, struct.person_data[player.id].g_jail, struct.person_data[player.id].g_jail_camera, struct.person_data[player.id].g_jail_time, struct.person_data[player.id].g_victims, struct.person_data[player.id].g_respect, struct.person_data[player.id].g_zavisim, struct.person_data[player.id].g_drugs, struct.person_data[player.id].g_health, struct.person_data[player.id].g_armour, struct.person_data[player.id].g_job, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes, struct.person_data[player.id].g_fraction_rang, struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_clothes, struct.person_data[player.id].g_gang_rang, struct.person_data[player.id].g_name], function (error, results, fields) {

    });
  }
}

func.updateData = function(player) {
	let job_name, fraction_name, fraction_name_rang, gang_name, gang_name_rang;
	job_name = (struct.person_data[player.id].g_job == 1) ? "Таксист" : "-";
	fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
	fraction_name_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
	gang_name = gang.get_name(struct.person_data[player.id].g_gang);
	gang_name_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
	player.call('playerGUIStats', [JSON.stringify(struct.person_data[player.id])]);
	player.call('playerGUIStatsUpdate_1', [JSON.stringify(struct.person_data[player.id]), `${job_name}`, `${fraction_name}`, `${fraction_name_rang}`, `${gang_name}`, `${gang_name_rang}`]);
}

func.openDoors = function(player) {
	player.call("doorControl", [749848321, 453.0793, -983.1895, 30.83926, false, 0, 0, 0]); // door armory
	player.call("doorControl", [631614199, 461.8065, -1001.302, 25.06443, true, 0, 0, 0]); // jail door 3
	player.call("doorControl", [631614199, 461.8065, -997.6583, 25.06443, true, 0, 0, 0]); // jail door 1-1
	player.call("doorControl", [631614199, 461.8065, -994.4086, 25.06443, true, 0, 0, 0]); // jail door 1
	player.call("doorControl", [-1320876379, 446.5728, -980.0106, 30.8393, false, 0, 0, 0]); // captain
}

func.gangclothes = function(player, sex, gang, component) {
	if(gang == 1) {
		if(sex == 0) {
			player.setClothes(3, 14, 0, 0);
			player.setClothes(4, 64, 2, 0);
			player.setClothes(5, 0, 0, 0);
			player.setClothes(6, 31, 2, 0);
			player.setClothes(8, 15, 0, 0);
			player.setClothes(11, 143, 0, 0);
		} else if(sex == 1) {
			player.setClothes(3, 14, 0, 0);
			player.setClothes(4, 64, 2, 0);
			player.setClothes(5, 0, 0, 0);
			player.setClothes(6, 31, 2, 0);
			player.setClothes(8, 8, 0, 0);
			player.setClothes(11, 143, 0, 0);
		}
	} else if(gang == 2) {
		if(sex == 0) {
			player.setClothes(3, 14, 0, 0);
			player.setClothes(4, 27, 3, 0);
			player.setClothes(5, 0, 0, 0);
			player.setClothes(6, 12, 3, 0);
			player.setClothes(8, 15, 0, 0);
			player.setClothes(11, 143, 2, 0);
		} else if(sex == 1){
			player.setClothes(3, 1, 0, 0);
			player.setClothes(4, 10, 0, 0);
			player.setClothes(5, 40, 0, 0);
			player.setClothes(6, 35, 0, 0);
			player.setClothes(8, 15, 0, 0);
			player.setClothes(11, 143, 0, 0);
		}
	}
}

func.fractionclothes = function(player, sex, fraction, complect) {
	if(fraction == 1) {
		if(sex == 0) {
      if(complect == 0) {
        player.setClothes(3, 1, 0, 0);
        player.setClothes(4, 87, 5, 0);
        player.setClothes(6, 24, 0, 0);
        player.setClothes(8, 15, 2, 0);
        player.setClothes(11, 50, 3, 0);
      } else if(complect == 1) {
        player.setClothes(3, 5, 0, 0);
        player.setClothes(4, 87, 5, 0);
        player.setClothes(6, 24, 0, 0);
        player.setClothes(8, 15, 2, 0);
        player.setClothes(11, 208, 9, 0);
      } else if(complect == 2) {
        player.setClothes(3, 5, 0, 0);
        player.setClothes(4, 87, 5, 0);
        player.setClothes(6, 24, 0, 0);
        player.setClothes(8, 15, 2, 0);
        player.setClothes(11, 208, 10, 0);
      } else if(complect == 3) {
        player.setClothes(3, 5, 0, 0);
        player.setClothes(4, 87, 5, 0);
        player.setClothes(6, 24, 0, 0);
        player.setClothes(8, 15, 2, 0);
        player.setClothes(11, 209, 10, 0);
      }
		} else if(sex == 1) {
      player.setClothes(3, 0, 0, 0);
      player.setClothes(4, 35, 0, 0);
      player.setClothes(6, 51, 0, 0);
      player.setClothes(8, 58, 0, 0);
      player.setClothes(11, 55, 0, 0);
		}
	} else if(fraction == 2) {
  	if(sex == 0) {
      if(complect == 0) {
        player.setProp(0, 46, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 30, 0, 0);
        player.setClothes(4, 35, 0, 0);
        player.setClothes(6, 54, 0, 0);
        player.setClothes(7, 0, 0, 0);
        player.setClothes(8, 58, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 55, 0, 0);
        //player.setProps(0, 46, 0);
      } else if(complect == 1) {
        player.setProp(0, 121, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 19, 0, 0);
        player.setClothes(4, 35, 0, 0);
        player.setClothes(6, 24, 0, 0);
        player.setClothes(7, 0, 0, 0);
        player.setClothes(8, 58, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 55, 0, 0);
        //player.setProps(1, 7, 0);
        //player.setProps(6, 20, 0);
      } else if(complect == 2) {
        player.setProp(0, 121, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 1, 0, 0);
        player.setClothes(4, 25, 0, 0);
        player.setClothes(6, 21, 0, 0);
        player.setClothes(7, 38, 0, 0);
        player.setClothes(8, 4, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 115, 0, 0);
        //player.setProps(0, 12, 0);
        //player.setProps(6, 20, 0);
      } else if(complect == 3) {
        player.setProp(0, 121, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 0, 0, 0);
        player.setClothes(4, 35, 0, 0);
        player.setClothes(6, 21, 0, 0);
        player.setClothes(7, 38, 0, 0);
        player.setClothes(8, 57, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 13, 0, 0);
      } else if(complect == 4) {
        player.setProp(0, 121, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 11, 0, 0);
        player.setClothes(4, 35, 0, 0);
        player.setClothes(6, 21, 0, 0);
        player.setClothes(7, 37, 0, 0);
        player.setClothes(8, 15, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 26, 0, 0);
      } else if(complect == 5) {
        player.setProp(0, 121, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 0, 0, 0);
        player.setClothes(4, 35, 0, 0);
        player.setClothes(6, 21, 0, 0);
        player.setClothes(7, 0, 0, 0);
        player.setClothes(8, 57, 0, 0);
        player.setClothes(9, 0, 0, 0);
        player.setClothes(11, 55, 0, 0);
      } else if(complect == 6) {
        player.setProp(0, 115, 0);
        player.setProp(1, 0, 0);
        player.setClothes(1, 0, 0, 0);
        player.setClothes(3, 96, 0, 0);
        player.setClothes(4, 34, 0, 0);
        player.setClothes(6, 25, 0, 0);
        player.setClothes(7, 0, 0, 0);
        player.setClothes(8, 57, 0, 0);
        player.setClothes(9, 16, 0, 0);
        player.setClothes(11, 50, 0, 0);
      }
  	} else if(sex == 1) {
      player.setClothes(3, 0, 0, 0);
      player.setClothes(4, 35, 0, 0);
      player.setClothes(6, 51, 0, 0);
      player.setClothes(8, 58, 0, 0);
      player.setClothes(11, 55, 0, 0);
		}
	}
}

func.putgiveorganizations = function(organization, type, count) {

  /* 1-2 = +; 3-4 - - */

  if(parseInt(type) == 0) {
    let new_count1 = configure.warehouses[parseInt(organization)].materials + count;
    mysql.connection.query('UPDATE `warehouses` SET mats = ? WHERE id = ?', [new_count1, organization], function (error, results, fields) {

    });
    configure.warehouses[parseInt(organization)].materials = new_count1;
  } else if(parseInt(type) == 1) {
    let new_count2 = configure.warehouses[parseInt(organization)].bank + count;
    mysql.connection.query('UPDATE `warehouses` SET bank = ? WHERE id = ?', [new_count2, organization], function (error, results, fields) {

    });
    configure.warehouses[parseInt(organization)].bank = new_count2;
  } else if(parseInt(type) == 3) {
    let new_count3 = configure.warehouses[parseInt(organization)].materials - count;
    mysql.connection.query('UPDATE `warehouses` SET mats = ? WHERE id = ?', [new_count3, organization], function (error, results, fields) {

    });
    configure.warehouses[parseInt(organization)].materials = new_count3;
  } else if(parseInt(type) == 4) {
    let new_count4 = configure.warehouses[parseInt(organization)].bank - count;
    mysql.connection.query('UPDATE `warehouses` SET bank = ? WHERE id = ?', [new_count4, organization], function (error, results, fields) {

    });
    configure.warehouses[parseInt(organization)].bank = new_count4;
  }
}

func.deletespacesmessages = function(message) {
  let null_counter = 0;
  let get_message = new Array(message.length);
  for(let i = 0; i < message.length; i++) {
    if(null_counter != 3) {
      if(!message[i].indexOf(' ')) {
        null_counter++;
      } else {
        null_counter = 0;
      }
      get_message[i] = message[i];
      if(null_counter == 2) {
        if(!message[i].indexOf(' ')) {
          delete get_message[i-1];
          delete get_message[i];
          message = get_message.join('');
          null_counter = 3;
        } else {
          null_counter = 0;
        }
      }
    }
  }
  return message;
}
