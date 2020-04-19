/* INITIAL MODULES */

var fs = require('fs');

var md5 = require('md5');
var mysql = require('./modules/mysql.js');

/* INITIAL OUT-SIDE INCLUDES */

var configure = require('./configure.js');
var logger = require('./modules/logger.js');
var struct = require('./struct.js');
var chat = require('./modules/chat.js');
var fraction = require('./configs/fractions.js');
var gang = require('./configs/gangs.js');
var systems = require('./systems.js');

/* CONFIGS */
var vehicles_cfg = require('./configs/vehicles.js');

/* SET/CONTROL TIMERS ON FUNCTIONS */

//setInterval(systems.spawnVehicle, 30000);

setInterval(systems.spawnVehicle, 600000);

setInterval(systems.updateTab, 10000, struct, fraction, gang);

setInterval(systems.paydayHour, 3600000);

/* EVENTS */

try {

mp.events.add(
{
    playerJoin: (player) => {
			player.health = 100;
			player.armour = 100;
			player.dimension = player.id;
			player.model = "mp_m_freemode_01";
		},

		playerJoined: (player) => {
      struct.person_sys[player.id].auth_status = 0;
      player.spawn(new mp.Vector3(parseFloat(-2150.23583984375), parseFloat(-1221.0615234375), parseFloat(84.37535095214844)));
      player.call("freezePlayer", [1]);
      player.call('changePlayerCameraPosition', [-2147.23583984375, -1221.0615234375, 84.37535095214844, 0, 0, 296.892578125]);
			player.call("gameChat", [1]);
			configure.online++;
      if(configure.gamemodeloaded == 0) {
        player.call('showWrongForm', [2, 1]);
        player.kick();
      }
		},

		playerQuit: (player) => {
      struct.person_auth[player.id].flood_count = 0;
      for(let storage = 0; storage < configure.loaded_gangzones_count; storage++) {
        player.call('hiddenGangZone', [struct.person_sys[player.id].storage_blip[storage]]);
      }
			if(struct.person_sys[player.id].auth_status >= 1) {
				systems.updatePersonData(1, player, struct);
        if(struct.person_sys[player.id].person_car[struct.person_sys[player.id].person_car_active]) {
          struct.person_sys[player.id].person_car[struct.person_sys[player.id].person_car_active].destroy();
        }
				systems.resetData(player, struct);
			}
		},

		playerSpawn: (player) => {

		},

    playerCommand: (player, command) => {

    },

		playerDeath: (player, reason, killer) => {

			function resp_time(player, playerid, verif_name, struct) {
				if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
					player.health = 100;
					struct.person_sys[player.id].duehuman = 0;
          if(struct.person_data[player.id].g_jail == 1) {
            let camera_pos = "";
            if(struct.person_data[player.id].g_jail_camera == 1) {
              camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-994.399169921875), parseFloat(24.914871215820312));
            } else if(struct.person_data[player.id].g_jail_camera == 2) {
              camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-997.814208984375), parseFloat(24.914871215820312));
            } else if(struct.person_data[player.id].g_jail_camera == 3) {
              camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-1001.42724609375), parseFloat(24.914871215820312));
            } else {
              camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-994.399169921875), parseFloat(24.914871215820312));
              camera = 1;
            }
            player.position = camera_pos;
          } else {
            systems.spawnPosition(player);
          }
				}
			}

      /*
      mp.players.forEach(_player => {
        if(struct.person_data[_player.id].s_speclvl >= 1) {
          _player.call('listkill_add', [configure.gangzonestatuswar, configure.gangzonesfrags_grove, configure.gangzonesfrags_ballas, configure.gangzonestatustimer]);
        }
      });
      */

      if(struct.person_data[killer.id].g_fraction == 2 && struct.person_sys[killer.id].fraction_ready == 1) {
        if(struct.person_data[player.id].g_wanted >= 1) {
          camera = systems.getRandom(1, 3);
          let jail_time_set = 2000 * struct.person_data[player.id].g_wanted;
          struct.person_data[player.id].g_wanted = 0;
          struct.person_data[player.id].g_jail = 1;
          struct.person_data[player.id].g_jail_camera = parseInt(camera);
          struct.person_data[player.id].g_jail_time = jail_time_set;
          chat.local(player, 'FFFFFF', "Вы посажены в тюрьму за попытку бегства");
          chat.local(killer, 'FFFFFF', "Вы подстрелили гражданского, который был в розыске");
          systems.updateData(player);
        }
      }

      if(struct.person_sys[player.id].enter_gangzone_war == 1) {
        if(struct.person_data[killer.id].g_gang == 1 && struct.person_data[player.id].g_gang == 2) {
          configure.gangzonesfrags_grove++;
        } else if(struct.person_data[killer.id].g_gang == 2 && struct.person_data[player.id].g_gang == 1) {
          configure.gangzonesfrags_ballas++;
        }

        mp.players.forEach(_player => {
          if(struct.person_data[_player.id].g_gang >= 1) {
            _player.call('captureGangStart', [configure.gangzonestatuswar, configure.gangzonesfrags_grove, configure.gangzonesfrags_ballas, configure.gangzonestatustimer]);
          }
        });
      }

			setTimeout(resp_time, 60000, player, player.id, player.name, struct);
			chat.local(player, 'F4DF42', 'Вы умерли. Наслаждайтесь.');
			chat.local(player, 'F4DF42', 'Возрождение через 1 минуту!');
			struct.person_sys[player.id].duehuman = 1;
		},

    playerChat: (player, message) => {
			if(struct.person_sys[player.id].auth_status == 1) {
				if(struct.person_sys[player.id].duehuman != 1) {
          if(struct.person_auth[player.id].flood_message_count == 0) {
  					if(struct.person_sys[player.id].admin_alogin_auth == 1) {
  						chat.broadcastinrange(player, 1, player.position, 15, 'E5E5E5', `${player.name}[${player.id}]: (( ${message} ))`);
  					} else {
  						if(struct.person_data[player.id].g_sex == 0) {
  							chat.broadcastinrange(player, 1, player.position, 15, 'FFFFFF', `${player.name}[${player.id}] сказал: ${message}`);
  						} else if(struct.person_data[player.id].g_sex == 1) {
  							chat.broadcastinrange(player, 1, player.position, 15, 'FFFFFF', `${player.name}[${player.id}] сказала: ${message}`);
  						}
  					}
            struct.person_auth[player.id].flood_message_count++;
          } else {
            chat.local(player, 'FF8282', 'Не флуди');
          }
				} else {
					chat.local(player, 'FF8282', 'Вы мертвы');
				}
			} else {
				chat.local(player, 'FF8282', 'Вы не авторизованы. Пройдите процедуру авторизации!');
			}
		},

		playerStartEnterVehicle: (player, vehicle, seat) => {


		},

		playerEnterVehicle: (player, vehicle) => {
			if(player.vehicle && player.seat !== 0) {

        logger.console(`${player.name} sit in ${player.vehicle.model}`);

        if(player.vehicle['special_job'] == 1) {
          if(player.vehicle['special_job'] == 1 && struct.person_data[player.id].g_job == 1) {

          } else {
            chat.local(player, 'FF8282', 'Вы не работаете таксистом');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_job'] == 2) {
          if(player.vehicle['special_job'] == 2 && struct.person_data[player.id].g_job == 2) {

          } else {
            chat.local(player, 'FF8282', 'Вы не работаете водителем автобуса');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_fraction'] == 1) {
          if(player.vehicle['special_fraction'] == 1 && struct.person_data[player.id].g_fraction == 1) {

          } else {
            chat.local(player, 'FF8282', 'Вы не состоите в Армии Форта Занкундо');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_fraction'] == 2) {
          if(player.vehicle['special_fraction'] == 2 && struct.person_data[player.id].g_fraction == 2) {

          } else {
            chat.local(player, 'FF8282', 'Вы не состоите в полицейском департаменте');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_fraction'] == 3) {
          if(player.vehicle['special_fraction'] == 3 && struct.person_data[player.id].g_fraction == 3) {

          } else {
            chat.local(player, 'FF8282', 'Вы не состоите в новостях');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_gang'] == 1) {
          if(player.vehicle['special_gang'] == 1 && struct.person_data[player.id].g_gang == 1) {

          } else {
            chat.local(player, 'FF8282', 'Вы не состоите в The Grove Street Gang');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_gang'] == 2) {
          if(player.vehicle['special_gang'] == 2 && struct.person_data[player.id].g_gang == 2) {

          } else {
            chat.local(player, 'FF8282', 'Вы не состоите в The Ballas Gang');
            player.removeFromVehicle();
          }
        }

        if(player.vehicle['special_status'] == 1 && player.vehicle['special_status_owner'] != player.name) {
          if(player.vehicle['special_status_busy'] == false) {
            struct.person_sys[player.id].rent_money = player.vehicle['special_status_rent'];
            player.call('rentDialog', [`${struct.person_sys[player.id].rent_money}`]);
          } else {
            chat.local(player, 'FF8282', 'Этот транспорт уже арендован');
            player.removeFromVehicle();
          }
        }

				let get_car_name = vehicles_cfg.getVehicleName(parseInt(player.vehicle.model));
				player.call('updateSpeedometr_1', [`${get_car_name}`]);
					if(struct.person_sys[player.id].enter_garage >= 0) {
						if(player.vehicle.owner == player.name) {
              if(struct.person_sys[player.id].person_car_active == -1) {
								mysql.connection.query("SELECT * FROM houses WHERE owner = ?", [player.name], function(err, selecthouse) {
									player.position = new mp.Vector3(parseFloat(selecthouse[0].garage_enter_pos_x),parseFloat(selecthouse[0].garage_enter_pos_y),parseFloat(selecthouse[0].garage_enter_pos_z));
									struct.person_sys[player.id].enter_limit = 1;
									struct.person_sys[player.id].enter_garage = -1;
                  struct.person_sys[player.id].person_car_active = player.vehicle.selectid;
									chat.local(player, 'F4DF42', 'Вы покинули гараж!');
									function exitGarage() {
										player.vehicle.dimension = 0;
										player.dimension = 0;
									}
									setTimeout(exitGarage, 1000);
								});
              }
						} else {
						chat.local(player, 'F4DF42', 'Проваливай! Это не твоя машина!');
            player.removeFromVehicle();
					}
				}
			}
		},

		playerStartExitVehicle: (player, vehicle) => {

		},

		playerExitVehicle: (player) => {
			player.call('playerExitVehicle');
			player.call('disabledSpeedometr');
		},

		playerEnterCheckpoint: (player, checkpoint) => {
			if(configure.jobscheckpoints[player.id] == checkpoint) {
				if(struct.person_sys[player.id].job_enter == 2 && struct.person_sys[player.id].job_style == 2) {
					configure.jobscheckpoints[player.id].destroy();
					player.playScenario("WORLD_HUMAN_HAMMERING");
					function stop_job(playerid, verif_name) {
						if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
							player.stopAnimation();
							chat.local(player, '1BE636', 'Работа над данным стаком окончена!');
							chat.local(player, '1BE636', 'К вашей зарплате добавлено: +25$');
							struct.person_sys[player.id].job_action = 0;
							struct.person_sys[player.id].job_count = struct.person_sys[player.id].job_count + 25;
							let gen_pos_job = parseInt(systems.getRandom(0, 5));
							configure.jobscheckpoints[player.id] = mp.checkpoints.new(1, configure.jobscheckpoints_pos_2[gen_pos_job], 1,
							{
									visible: true,
									dimension: 0
							});
							chat.local(player, '1BE636', 'Приступайте к раздроблению и расчетам!');
							struct.person_sys[player.id].job_style = 1;
							configure.jobscheckpoints[player.id].setColor(66, 244, 149, 255);
							configure.jobscheckpoints[player.id].showFor(player);
						}
					}
					setTimeout(stop_job, 15000, player.id, player.name);
					struct.person_sys[player.id].job_action = 1;
					chat.local(player, '3BC0D4', 'Вы приступили к работе!');
				} else if(struct.person_sys[player.id].job_enter == 2 && struct.person_sys[player.id].job_style == 1) {
					configure.jobscheckpoints[player.id].destroy();
					player.playScenario("WORLD_HUMAN_CONST_DRILL");
					function stop_job(playerid, verif_name) {
						if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
							player.stopAnimation();
							player.playScenario("WORLD_HUMAN_CLIPBOARD");
							chat.local(player, '1BE636', 'Работа над дроблением окончена!');
							chat.local(player, '1BE636', 'Приступаем к расчетам');
							function stop_job2(playerid2, verif_name2) {
								if(struct.person_data[playerid2].g_online == 1 && struct.person_data[playerid2].g_name == verif_name2) {
									player.stopAnimation();
									chat.local(player, '1BE636', 'Работа над расчетами окончена!');
									chat.local(player, '1BE636', 'К вашей зарплате добавлено: +30$');
									struct.person_sys[player.id].job_action = 0;
									struct.person_sys[player.id].job_count = struct.person_sys[player.id].job_count + 30;
									let gen_pos_job = parseInt(systems.getRandom(0, 5));
									configure.jobscheckpoints[player.id] = mp.checkpoints.new(1, configure.jobscheckpoints_pos_1[gen_pos_job], 1,
									{
											visible: true,
											dimension: 0
									});
									chat.local(player, '1BE636', 'Приступайте к латанию досок!');
									struct.person_sys[player.id].job_style = 2;
									configure.jobscheckpoints[player.id].setColor(66, 244, 149, 255);
									configure.jobscheckpoints[player.id].showFor(player);
								}
							}
							setTimeout(stop_job2, 15000, player.id, player.name);
						}
					}
					setTimeout(stop_job, 15000, player.id, player.name);
					struct.person_sys[player.id].job_action = 1;
					chat.local(player, '3BC0D4', 'Вы приступили к работе!');
				}
			}
		},

    playerExitColshape: (player, shape) => {
      for(let i = 0; i < configure.gangzonecolshapes.length; i++) {
        if(configure.gangzonecolshapes[i] == shape) {
          if(configure.gangzonestatuswar == shape) {
            struct.person_sys[player.id].enter_gangzone_war = 0;
            //chat.local(player, 'FFFFFF', `Вы покинули территорию ${i}`);
          }
          struct.person_sys[player.id].enter_gangzone = 0;
        }
      }
    },

		playerEnterColshape: (player, shape) => {

      for(let i = 0; i < configure.gangzonecolshapes.length; i++) {
        if(configure.gangzonecolshapes[i] == shape) {
          if(configure.gangzonestatuswar == shape) {
            struct.person_sys[player.id].enter_gangzone_war = 1;
            //chat.local(player, 'FFFFFF', `Вы вошли на территорию ${i}`);
          }
          struct.person_sys[player.id].enter_gangzone = i;
        }
      }

			if(!player.vehicle) {

				if(struct.person_sys[player.id].job_enter == 1) {
					for(let i = 0; i < configure.jobs_1_colshapes.length; i++) {
						if(configure.jobs_1_colshapes[i] == shape) {
							if(configure.jobs_1_status[i] == 0) {
								player.playScenario("WORLD_HUMAN_WELDING");
								function stop_job(playerid, verif_name) {
									if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
										player.stopAnimation();
										chat.local(player, '1BE636', 'Работа над данным пролетом закончена!');
										chat.local(player, '1BE636', 'К вашей зарплате добавлено: +175$');
										struct.person_sys[player.id].job_action = 0;
										configure.jobs_1_markers[i].setColor(59,222,146,255);
										configure.jobs_1_status[i] = 2;
										struct.person_sys[player.id].job_count = struct.person_sys[player.id].job_count + 175;
									} else {
										configure.jobs_1_markers[i].setColor(59,222,146,255);
										configure.jobs_1_status[i] = 2;
									}
								}
								setTimeout(stop_job, 15000, player.id, player.name);
								struct.person_sys[player.id].job_action = 1;
								chat.local(player, '3BC0D4', 'Вы приступили к сварке пролета!');
								configure.jobs_1_markers[i].setColor(0, 0, 0, 0);
								configure.jobs_1_status[i] = 1;
							} else if(configure.jobs_1_status[i] == 1) {
								chat.local(player, 'FF8282', 'Пролет уже проходит сварку!');
							} else if(configure.jobs_1_status[i] == 2) {
								chat.local(player, 'FF8282', 'Этот пролет уже сварен, пройдите к другому!');
							}
						}
					}
				}

				if(configure.jobscolshapes[0] == shape) {
					if(struct.person_sys[player.id].job_enter == 0) {
						if(struct.person_data[player.id].g_fraction == 0 && struct.person_data[player.id].g_gang == 0) {
							chat.local(player, '1BE636', 'Вы устроились сварщиком на стройку!');
							chat.local(player, '1BE636', 'Инструкция по работе:');
							chat.local(player, '1BE636', 'Сварите нижнее пролеты, по завершению всех пролетов - поговорите с прорабом.');
							chat.local(player, '1BE636', '(( Пролеты обнуляются каждый PayDay ))');
							player.setClothes(3, 1, 0, 0);
							player.setClothes(4, 10, 0, 0);
							player.setClothes(5, 40, 0, 0);
							player.setClothes(6, 35, 0, 0);
							player.setClothes(8, 15, 0, 0);
							player.setClothes(11, 41, 0, 0);
							player.setProp(1, 24, 0);
							struct.person_sys[player.id].job_enter = 1;
              struct.person_sys[player.id].job_style = 1;
						} else {
							chat.local(player, 'FF8282', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
						}
					} else {
            if(struct.person_sys[player.id].job_style == 1) {
  						let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
  						let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
  						let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
  						for(let s1 = 1; s1 <= 11; s1++) {
  							player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
  						}
  						for(let s2 = 0; s2 <= 7; s2++) {
  							player.setProp(s2, props[s2].drawable, props[s2].texture);
  						}
  						player.setClothes(5, 0, 0, 0);
  						chat.local(player, 'F4DF42', 'Рабочий день завершен!');
  						chat.local(player, 'F4DF42', `Вы заработали ${struct.person_sys[player.id].job_count}$, приходите еще!`);
  						struct.person_data[player.id].g_money = struct.person_data[player.id].g_money + struct.person_sys[player.id].job_count;
  						systems.updateData(player);
  						struct.person_sys[player.id].job_count = 0;
  						struct.person_sys[player.id].job_enter = 0;
            } else {
              chat.local(player, 'FF8282', "Вы перепутали место, здесь нет вашего прораба.");
            }
					}
				} else if(configure.jobscolshapes[1] == shape) {
					if(struct.person_sys[player.id].job_enter == 0) {
						if(struct.person_data[player.id].g_fraction == 0 && struct.person_data[player.id].g_gang == 0) {
							chat.local(player, '1BE636', 'Вы устроились строителем на стройку!');
							chat.local(player, '1BE636', 'Инструкция по работе:');
							chat.local(player, '1BE636', 'Латайте испорченные доски и раздробляйте площадку, затем расчитайте план.');
							player.setClothes(3, 1, 0, 0);
							player.setClothes(4, 10, 0, 0);
							player.setClothes(5, 40, 0, 0);
							player.setClothes(6, 35, 0, 0);
							player.setClothes(8, 15, 0, 0);
							player.setClothes(11, 41, 0, 0);
							player.setProp(1, 24, 0);
							struct.person_sys[player.id].job_enter = 2;
              struct.person_sys[player.id].job_style = 2;
							let get_job_first = parseInt(systems.getRandom(0,2));
							if(get_job_first == 0) {
								let gen_pos_job = parseInt(systems.getRandom(0, 5));
								configure.jobscheckpoints[player.id] = mp.checkpoints.new(1, configure.jobscheckpoints_pos_1[gen_pos_job], 1,
								{
										visible: true,
										dimension: 0
								});
								chat.local(player, '1BE636', 'Начните с латания досок!');
							} else if(get_job_first == 1) {
								let gen_pos_job = parseInt(systems.getRandom(0, 5));
								configure.jobscheckpoints[player.id] = mp.checkpoints.new(1, configure.jobscheckpoints_pos_2[gen_pos_job], 1,
								{
										visible: true,
										dimension: 0
								});
								chat.local(player, '1BE636', 'Начните с дробления площадки и расчетам!');
							}
							configure.jobscheckpoints[player.id].setColor(66, 244, 149, 255);
							configure.jobscheckpoints[player.id].showFor(player);
              mp.players.forEach(_player => {
                if(_player.name != player.name) {
                  configure.jobscheckpoints[player.id].hideFor(_player);
                }
              });
						} else {
							chat.local(player, 'FF8282', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
						}
					} else {
            if(struct.person_sys[player.id].job_style == 2 || struct.person_sys[player.id].job_enter == 2) {
  						let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
  						let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
  						let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
  						for(let s1 = 1; s1 <= 11; s1++) {
  							player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
  						}
  						for(let s2 = 0; s2 <= 7; s2++) {
  							player.setProp(s2, props[s2].drawable, props[s2].texture);
  						}
  						player.setClothes(5, 0, 0, 0);
  						chat.local(player, 'F4DF42', 'Рабочий день завершен!');
  						chat.local(player, 'F4DF42', `Вы заработали ${struct.person_sys[player.id].job_count}$, приходите еще!`);
  						struct.person_data[player.id].g_money = struct.person_data[player.id].g_money + struct.person_sys[player.id].job_count;
  						systems.updateData(player);
  						struct.person_sys[player.id].job_count = 0;
  						struct.person_sys[player.id].job_enter = 0;
  						configure.jobscheckpoints[player.id].destroy();
            } else {
              chat.local(player, 'FF8282', "Вы перепутали место, здесь нет вашего прораба.");
            }
					}
				}

				if(struct.person_sys[player.id].enter_limit == 0) {
					for(let i = 0; i < configure.loaded_houses_count; i++) {
						if(shape == configure.housescolshapes[i]) {
							let house_info1 = "", house_info2 = "";
							let owner = (configure.housesowner[i] == "NONE") ? "Государство" : configure.housesowner[i];
							house_info1 = `<h1>Владелец дома: ${owner}</h1><h1>Стоимость дома: ${configure.housescoast[i]}$</h1>`;
							if(configure.housestate[i] == 0) {
								if(configure.housesgarage[i] >= 1) {
									house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div><div class="h_menu" id="h_menu_666">Приобрести дом</div><div class="h_menu" id="h_menu_exit">Закрыть</div>`;
								} else {
									house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div><div class="h_menu" id="h_menu_666">Приобрести дом</div><div class="h_menu" id="h_menu_exit">Закрыть</div>`;
								}
							} else if(configure.housestate[i] == 1) {
								if(configure.housesgarage[i] >= 1) {
									house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div><div class="h_menu" id="h_menu_exit">Закрыть</div>`;
								} else {
									house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div><div class="h_menu" id="h_menu_exit">Закрыть</div>`;
								}
							}
							player.call('showHouseMenu', [`${i}`, `${house_info1}`, `${house_info2}`]);
						} else if(shape == configure.housesgaragecolshapes[i]) {
									for(let car = 0; car < 7; car++) {
										if(struct.person_sys[player.id].person_car[car] == player.vehicle) {
											mysql.connection.query("SELECT * FROM cars WHERE owner = ? WHERE id = ?", [player.name], function(errcars, selectcars) {
												let max_car_pos = JSON.parse(selectcars[car].max_cars_pos);
												player.position = new mp.Vector3(parseFloat(max_car_pos[0].x), parseFloat(max_car_pos[0].y), parseFloat(max_car_pos[0].z));
										});
									}
								}
							}
					}
				} else {
					if(struct.person_sys[player.id].enter_limit == 1 && player.dimension >= 10000) {
						if(configure.housesrare[i] == 2) {
							if(configure.housesinterior[i] == 0) {
								player.position = new mp.Vector3(parseFloat(-169.286),parseFloat(486.4938),parseFloat(137.4436));
							} else if(configure.housesinterior[i] == 1) {
								player.position = new mp.Vector3(parseFloat(340.9412),parseFloat(437.1798),parseFloat(149.3925));
							}
						}
					} else {
						struct.person_sys[player.id].enter_limit = 0;
					}
				}

				/* OTHER MARKERS & COLSHAPES */

				if(configure.fractionscolshapes[0] == shape) {
					if(struct.person_sys[player.id].fraction_ready == 0 && struct.person_data[player.id].g_fraction == 1) {
						if(struct.person_data[player.id].g_sex == 0 || struct.person_data[player.id].g_sex == 1) {
							player.setClothes(3, 15, 0, 0);
							player.setClothes(4, 14, 0, 0);
							player.setClothes(5, 0, 0, 0);
							player.setClothes(6, 34, 0, 0);
							player.setClothes(8, 15, 0, 0);
							player.setClothes(11, 15, 0, 0);
              struct.person_sys[player.id].fraction_ready = 1;
							chat.local(player, '42F480', "Ваши вещи были сложены в гардеробную.");
							chat.local(player, '42F480', "Следуйте по коридору до ближайшей раздевалки.");
							chat.local(player, 'F4DF42', "Вы заступили на воинскую службу!");
						}
					} else if(struct.person_sys[player.id].fraction_ready == 1 && struct.person_data[player.id].g_fraction == 1) {
						let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
						let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
						let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
						for(let s1 = 1; s1 <= 11; s1++) {
							player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
						}
						for(let s2 = 0; s2 <= 7; s2++) {
							player.setProp(s2, props[s2].drawable, props[s2].texture);
						}
						struct.person_sys[player.id].fraction_ready = 0;
						chat.local(player, '42F480', "Ваши вещи были возвращены и вы их надели обратно.");
						chat.local(player, 'F4DF42', "Вы завершили на сегодня воинскую службу!");
					}
					player.removeWeapon();
				} else if(configure.fractionscolshapes[1] == shape) {
					if(struct.person_data[player.id].g_fraction == 1 && struct.person_sys[player.id].fraction_ready == 1) {
            systems.fractionclothes(player, struct.person_data[player.id].g_sex, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes);
						chat.local(player, '42F480', "Используйте команду (( /switchclothes )) для выбора другой одежды.");
						chat.local(player, 'F4DF42', "Вы переоделись в заготовленную экипировку.");
					} else {
						chat.local(player, 'FF8282', "У вас нет доступа к данному месту.");
					}
				} else if(configure.fractionscolshapes[2] == shape) {
					if(struct.person_data[player.id].g_fraction == 1 && struct.person_sys[player.id].fraction_ready == 1) {
						if(struct.person_sys[player.id].fraction_ammo == 0) {
							player.removeWeapon();
							player.giveWeapon(mp.joaat('WEAPON_PISTOL'), 24);
							player.giveWeapon(mp.joaat('WEAPON_CARBINERIFLE'), 90);
							chat.local(player, '42F480', "Вы повесили Carbine Riffle на спину и взяли на запас две обоймы.");
							chat.local(player, '42F480', "В том числе, вам был выдан травматический пистолет с одной обоймой.");
							chat.local(player, 'F4DF42', "Тем временем после сытного пойка и одевания бронежилета, вы готовы к службе!");
							struct.person_sys[player.id].fraction_ammo = 1;
							player.health = 100;
							player.armour = 100;
						} else {
							chat.local(player, 'FF8282', "Вы уже брали аммуницию. (( Ожидайте PayDay ))");
						}
					} else {
						chat.local(player, 'FF8282', "У вас нет доступа к данному месту.");
					}
				} else if(configure.fractionscolshapes[3] == shape) {
					if(struct.person_sys[player.id].fraction_ready == 0 && struct.person_data[player.id].g_fraction == 2) {
						if(struct.person_data[player.id].g_sex == 0 || struct.person_data[player.id].g_sex == 1) {
							struct.person_sys[player.id].fraction_ready = 1;
							chat.local(player, '42F480', "Следуйте по коридору до ближайшей раздевалки.");
							chat.local(player, 'F4DF42', "Вы заступили на службу!");
						}
					} else if(struct.person_sys[player.id].fraction_ready == 1 && struct.person_data[player.id].g_fraction == 1) {
						let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
						let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
						let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
						for(let s1 = 1; s1 <= 11; s1++) {
							player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
						}
						for(let s2 = 0; s2 <= 7; s2++) {
							player.setProp(s2, props[s2].drawable, props[s2].texture);
						}
						struct.person_sys[player.id].fraction_ready = 0;
						chat.local(player, '42F480', "Служебные вещи были возвращены и вы их надели обратно.");
						chat.local(player, 'F4DF42', "Вы завершили на сегодня воинскую службу!");
					} else {
						chat.local(player, 'F4DF42', "По поводу вступления в организацию, свяжитесь с текущим представителем фракции");
					}
					player.removeWeapon();
				} else if(configure.fractionscolshapes[4] == shape) {
					if(struct.person_data[player.id].g_fraction == 2 && struct.person_sys[player.id].fraction_ready == 1) {
            systems.fractionclothes(player, struct.person_data[player.id].g_sex, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes);
						chat.local(player, 'F4DF42', "Вы переоделись в заготовленную экипировку.");
					} else {
						chat.local(player, 'FF8282', "У вас нет доступа к данному месту.");
					}
				} else if(configure.fractionscolshapes[5] == shape) {
					if(struct.person_data[player.id].g_fraction == 2 && struct.person_sys[player.id].fraction_ready == 1) {
						player.removeWeapon();
            player.call('gFractionWarehouse', [2]);
						chat.local(player, 'F4DF42', "Тем временем вам был выдан сытный поек и бронежилет, вы готовы к службе!");
						struct.person_sys[player.id].fraction_ammo = 1;
						player.health = 100;
						player.armour = 100;
					} else {
						chat.local(player, 'FF8282', "У вас нет доступа к данному месту.");
					}
				}

				if(configure.gangscolshapes[0] == shape) {
					player.position = new mp.Vector3(parseFloat(1065.1268310546875), parseFloat(-3183.489013671875), parseFloat(-39.16352081298828));
					player.heading = 95.23133087158203;
				} else if(configure.gangscolshapes[1] == shape) {
					player.position = new mp.Vector3(parseFloat(-250.31787109375), parseFloat(-1529.1279296875), parseFloat(31.573999404907227));
					player.heading = 290.7838134765625;
				} else if(configure.gangscolshapes[2] == shape) {
					player.position = new mp.Vector3(parseFloat(128.39602661132812), parseFloat(-1296.847900390625), parseFloat(29.26953125));
					player.heading = 328.2509460449219;
				} else if(configure.gangscolshapes[3] == shape) {
					player.position = new mp.Vector3(parseFloat(129.78936767578125), parseFloat(-1300.586181640625), parseFloat(29.232744216918945));
					player.heading = 207.41488647460938;
				}

				if(configure.othercolshapes[0] == shape) {
					player.position = new mp.Vector3(parseFloat(116.91502380371094),parseFloat(-636.4628295898438),parseFloat(206.04660034179688));
					chat.local(player, '42F480', "Вы поднялись на один из этажей здания Мэрии!");
					player.dimension = 0;
				} else if(configure.othercolshapes[1] == shape) {
					player.position = new mp.Vector3(parseFloat(115.91376495361328),parseFloat(-639.36474609375),parseFloat(206.04660034179688));
					chat.local(player, '42F480', "Вы поднялись на один из этажей здания Мэрии!");
					player.dimension = 0;
				} else if(configure.othercolshapes[2] == shape) {
					player.position = new mp.Vector3(parseFloat(237.0175018310547),parseFloat(-407.22747802734375),parseFloat(47.92435836791992));
					chat.local(player, '42F480', "Вы покинули здание Мэрии!");
					player.dimension = 0;
				} else if(configure.othercolshapes[4] == shape) {
  				player.call("freezePlayer", [1]);
  				player.position = new mp.Vector3(parseFloat(429.7789611816406), parseFloat(-811.5325927734375), parseFloat(29.491127014160156));
  				player.heading = 355.8166809082031;
  				player.dimension = player.id+1;
  				player.call('storeView', [1]);
			  } else if(configure.othercolshapes[5] == shape || configure.othercolshapes[6] == shape || configure.othercolshapes[7] == shape || configure.othercolshapes[8] == shape || configure.othercolshapes[9] == shape) {
          if(struct.person_sys[player.id].enter_materials != 1) {
            struct.person_data[player.id].g_materials = struct.person_data[player.id].g_materials + 50;
            struct.person_sys[player.id].enter_materials = 1;
            chat.local(player, '1BE636', 'Вы украли материалов в количестве 50 штук!');
            systems.updateData(player, struct);
          }
			  } else if(configure.othercolshapes[11] == shape) {
          chat.local(player, 'FF8282', "Банк закрыт");
			  } else if(configure.othercolshapes[12] == shape) {
          if(struct.person_data[player.id].g_gang >= 1) {
            player.call('buyDrugs', [1]);
          } else {
            chat.local(player, 'FF8282', "Эй! Ты кто такой?");
          }
        }

      if(configure.workcolshapes[0] == shape) {
          if(struct.person_data[player.id].g_job >= 1) {
            chat.local(player, 'F4DF42', 'Рабочий день завершен');
            chat.local(player, 'F4DF42', 'Вы ушли с текущей работы по собственному желанию');
            struct.person_data[player.id].g_job = 0;
        } else if(struct.person_data[player.id].g_job == 0) {
          if(struct.person_data[player.id].g_fraction == 0 && struct.person_data[player.id].g_gang == 0) {
            chat.local(player, '1BE636', 'Вы устроились таксистом!');
            chat.local(player, '1BE636', 'Инструкция по работе:');
            chat.local(player, '1BE636', 'Зайдите на стоянку Downtown Cab Co и арендуйте такси, сумма аренды 500$');
            chat.local(player, '1BE636', 'Во время работы будьте вежливы с клиентом и следуйте его указаниям');
            struct.person_data[player.id].g_job = 1;
            systems.updateData(player, struct);
          } else {
            chat.local(player, 'FF8282', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
          }
        }
      } else if(configure.workcolshapes[1] == shape) {
        if(struct.person_data[player.id].g_job >= 1) {
          chat.local(player, 'F4DF42', 'Рабочий день завершен');
          chat.local(player, 'F4DF42', 'Вы ушли с текущей работы по собственному желанию');
          struct.person_data[player.id].g_job = 0;
        } else if(struct.person_data[player.id].g_job == 0) {
          if(struct.person_data[player.id].g_fraction == 0 && struct.person_data[player.id].g_gang == 0) {
            /*
            chat.local(player, '1BE636', 'Вы устроились водителем автобуса!');
            chat.local(player, '1BE636', 'Инструкция по работе:');
            chat.local(player, '1BE636', 'Возьмите свободный в аренду автобус для выполнения рейса');
            chat.local(player, '1BE636', 'За каждый пройденный рейс, вы получите по факту зарплату');
            struct.person_data[player.id].g_job = 2;
            systems.updateData(player, struct);
            */
            chat.local(player, '1BE636', 'Работа отключена администрацией проекта LSFIVEM.COM');
            chat.local(player, '1BE636', 'До ближайшего хот-фикс обновления, просим прощения за неудобства');
          } else {
            chat.local(player, 'FF8282', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
          }
        }
      }

      /* временно */
      for(let shop24 = 0; shop24 < 11; shop24++) {
        if(configure.businesscolshapes[shop24] == shape) {
          player.health = 100;
          struct.person_data[player.id].g_hungry = 100;
          chat.local(player, 'FFA500', 'Магазин закрыт из-за убытка, кое-что Вы получили на халяву от продавца:');
          chat.local(player, 'FFA500', ' - немного еды и воды;');
          chat.local(player, 'FFA500', ' - бинты, медикаменты.');
          systems.updateData(player, struct);
        }
      }
		}

		},

		clientData: (argbase, argall) => {
			let player = argbase;
			let args = JSON.parse(argall);

			switch (args[0]) {
        case 'registrationQuestions': {
          if(struct.person_auth[player.id].flood_count != 5) {
            let ret_json = JSON.stringify(configure.questions);
            player.call('registrationTest', [`${configure.loaded_register_question_count}`, `${ret_json}`]);
          } else {
            player.call('showWrongForm', [2, 2]);
            player.kick();
          }
          struct.person_auth[player.id].flood_count++;
        }
        break;
        case 'registrationCheckAnswers': {
          if(struct.person_auth[player.id].flood_count != 5) {
            let get_answer = 0;
            let get_answers = JSON.parse(args[1]);
            let show_unfull = 0;
            let show_wrong = 0;
            for(let i = 0; i < configure.loaded_register_question_count; i++) {
              if(get_answers[i] !== null) {
                get_answer = get_answers[i].split('_');
                if(configure.questions[i].true_answer == get_answer[1]) {

                } else {
                  show_wrong = 1;
                }
              } else {
                show_unfull = 1;
              }
            }

            if(show_unfull != 1) {
              if(show_wrong != 0) {
                player.call('registrationTestComplete', []);
              } else {
                player.call('showWrongForm', [3, 2]);
              }
            } else {
              player.call('showWrongForm', [3, 1]);
            }
          } else {
            player.call('showWrongForm', [2, 2]);
            player.kick();
          }
          struct.person_auth[player.id].flood_count++;
        }
        break;
				case 'camera':
				{
					if(args[1] === 1) {
						player.call('changePlayerCameraPosition', [3438.835205078125, 5463.55224609375, 45, 0, 0, 160]);
					} else if(args[1] === 2) {
						player.call('changePlayerCameraPosition', [403.2567443847656, -998.9674682617188, -99.0040283203125, 0, 0, 0]);
					} else if(args[1] === 3) {
						player.call('changePlayerCameraPosition', [403.04962158203125, -997.1903076171875, -98.40025177001953, 0, 0, 0]);
					} else if(args[1] === 4) {
						player.call('changePlayerCameraPosition', [403.0367126464844, -997.518310546875, -98.50803594970703, 0, 0, 0]);
					} else if(args[1] === 5) {
						player.call('changePlayerCameraPosition', [429.44696044921875, -808.9591064453125, 29.49493980407715, 0, 0, 160]);
					} else if(args[1] === 6) { // под вопросом
						player.call('changePlayerCameraPosition', [403.0367126464844, -997.518310546875, -98.50803594970703, 0, 0, 0]);
					} else if(args[1] === 999) {
						player.call('returnPlayerCamera');
					}
				}
				break;
				case 'chat':
				{
					player.call("gameChat", [args[1]]);
				}
				break;
        case 'alogin':
        {
          mysql.connection.query("SELECT * FROM `admins` WHERE `person` = ?", [player.name], function(err, results) {
            if(results[0]) {
              if(results[0].password != "NONE") {
                if(results[0].password == args[1]) {
                  struct.person_sys[player.id].admin_alogin_auth = 1;
                  struct.person_sys[player.id].admin_alogin_level = results[0].level;
                  chat.admin(player, 'FFE900', `<< ADM-CHAT >> [${struct.person_sys[player.id].admin_alogin_level} lvl] ${player.name}[${player.id}] авторизовался.`);
                } else {
                  chat.admin(player, 'FFE900', `<< ADM-CHAT >> [${struct.person_sys[player.id].admin_alogin_level} lvl] ${player.name}[${player.id}] ввел неверные данные при авторизации.`);
                  chat.local(player, 'FF8282', 'Вы ввели неверный для авторизации пароль');
                }
              } else {
                mysql.connection.query('UPDATE `admins` SET `password` = ? WHERE `person` = ?', [args[1], player.name], function (error2, results2) {
                });
                struct.person_sys[player.id].admin_alogin_auth = 1;
                struct.person_sys[player.id].admin_alogin_level = results[0].level;
                chat.admin(player, 'FFE900', `<< ADM-CHAT >> [${results[0].level} lvl] ${player.name}[${player.id}] придумал себе новый пароль.`);
                chat.local(player, 'FFE900', 'Поздравляем с назначением на должность администратора!');
                chat.local(player, 'FFE900', 'Внимательно выслушайте главного администратора и приступайте к обязанностям');
                chat.admin(player, 'FFE900', `<< ADM-CHAT >> [${struct.person_sys[player.id].admin_alogin_level} lvl] ${player.name}[${player.id}] авторизовался.`);
              }
            }
          });
        }
        break;
        case 'send_client_playerid':
        {
          let get_player = args[1];
          mp.players.forEach(_player => {
            if(_player.name == get_player) {
              get_player = _player;
            }
          });
          console.log(`SHOW ID: ${get_player.id}, ${player.id}`);
          player.call('setShowIDPlayerRadius', [get_player, player]);
        }
        break;
        case 'send_checkpoint_get':
        {
          if(parseInt(args[1]) == 0) {
            chat.local(player, 'BABABA', 'Подождите 10 секунд');
            player.call("freezePlayer", [1]);
            player.vehicle.engine = false;
            function freeze_wait(playerid, verif_name) {
              if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
                chat.local(player, 'BABABA', 'Вы можете продолжить свой путь');
                player.call("freezePlayer", [0]);
                player.vehicle.engine = true;
              }
            }
            setTimeout(freeze_wait, 10000, player.id, player.name);
            struct.person_sys[player.id].bus_checknumpoints++;
            systems.JobBus(player, 1, struct.person_sys[player.id].bus_checknumhelpoints, struct.person_sys[player.id].bus_checknumpoints);
            chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `Автобус подъехал к одной из остановок и ожидает пассажиров (( ${player.name} ))`);
          } else if(parseInt(args[1]) == 1) {
            struct.person_sys[player.id].bus_checknumhelpoints++;
            systems.JobBus(player, 1, struct.person_sys[player.id].bus_checknumhelpoints, struct.person_sys[player.id].bus_checknumpoints);
          } else if(parseInt(args[1]) == 10) {
            player.call('delMapPoint', []); player.call('delCheckPoint', []);
          } else if(parseInt(args[1]) == 11) {
            player.call('delMapPoint', []); player.call('delCheckPoint', []);
          }
        }
        break;
        case 'send_donate_codes': {
          if(args[1] && args[2]) {
            mysql.connection.query("SELECT * FROM `donate` WHERE `code_1` = ? AND `code_2` = ? AND `use` = ?", [args[1], args[2], 0], function(err, results) {
              if(results[0]) {
                struct.person_data[player.id].g_money = struct.person_data[player.id].g_money + results[0].money;
                mysql.connection.query("UPDATE `donate` SET `person_activate` = ?, `use` = ? WHERE `id` = ?", [player.name, 1, results[0].id], function(err, results) {

                });
                chat.local(player, '42F462', 'Большое спасибо за поддержку проекта!');
                chat.local(player, '42F462', 'С уважением Максим Кудрявцев и Александр Хабенский. Приятной игры!');
                systems.updateData(player, struct);
              } else {
                chat.local(player, 'FF8282', 'Данная связка донат-кодов ненайдена.');
              }
            });
          } else {
            chat.local(player, 'FF8282', 'Одно из полей является незаполненным. Попробуйте вновь.');
          }
        }
        break;
        case 'send_rent_car': {
          if(parseInt(args[1]) == 1) {
            if(struct.person_data[player.id].g_money >= struct.person_sys[player.id].rent_money) {
              struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - struct.person_sys[player.id].rent_money;
              struct.person_sys[player.id].rent_car = player.vehicle;
              if(player.vehicle['special_status_busy']) {
                player.vehicle['special_status_busy'] = true;
                player.vehicle['special_status_owner'] = player.name;
              }
              if(struct.person_sys[player.id].rent_car['special_job'] == 2) {
                chat.local(player, 'BABABA', 'Вы арендовали автобус и следуйте маршруту на карте');
                systems.JobBus(player, 1, 0, 0);
              }
              systems.updateData(player, struct);
            } else {
              chat.local(player, 'FF8282', "У вас недостаточно средств для аренды транспорта");
              player.removeFromVehicle();
            }
          } else if(parseInt(args[1]) == 2) {
            player.removeFromVehicle();
          }
        }
        break;
        case 'store_complect_1': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
              player.setClothes(1, 0, 0, 0);
              struct.person_sys[player.id].store_complect_1 = 0;
            } else if(parseInt(args[1]) >= 2) {
              player.setClothes(1, parseInt(args[1]), 0, 0);
              struct.person_sys[player.id].store_complect_1 = 100;
            }
          }
        }
        break;
				case 'store_complect_2': {
					if(parseInt(args[1]) != 0) {
						if(parseInt(args[1]) == 1) {
							let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
              if(struct.person_sys[player.id].store_complect_3 <= 99) {
                player.setClothes(11, clothes[11].drawable, clothes[11].palette, clothes[11].texture);
              }
							player.setClothes(3, clothes[3].drawable, clothes[3].palette, clothes[3].texture);
							player.setClothes(8, clothes[8].drawable, clothes[8].palette, clothes[8].texture);
							struct.person_sys[player.id].store_money = struct.person_sys[player.id].store_money + 25;
						} else if(parseInt(args[1]) == 2) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 0, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 0, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 3) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 1, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 1, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 4) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(8, 5, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 5, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 5) {
							player.setClothes(3, 8, 0, 0);
							player.setClothes(8, 8, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 8, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 6) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 9, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 9, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 7) {
							player.setClothes(3, 11, 0, 0);
							player.setClothes(8, 13, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 13, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 8) {
							player.setClothes(3, 11, 0, 0);
							player.setClothes(8, 16, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 16, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 9) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(8, 17, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 17, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 10) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 19, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 18, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 11) {
							player.setClothes(3, 15, 0, 0);
							player.setClothes(8, 24, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 22, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 12) {
							player.setClothes(3, 11, 0, 0);
							player.setClothes(8, 27, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 26, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 13) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 37, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 33, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 14) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 38, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 34, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 15) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(8, 40, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 36, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 16) {
							player.setClothes(3, 8, 0, 0);
							player.setClothes(8, 41, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 38, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 17) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(8, 42, struct.person_sys[player.id].store_complect_color, 0);
							player.setClothes(11, 39, struct.person_sys[player.id].store_complect_color, 0);
						}
						struct.person_sys[player.id].store_complect_2 = 100;
					}
				}
				break;
				case 'store_complect_3': {
					if(parseInt(args[1]) != 0) {
						if(parseInt(args[1]) == 1) {
							let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
              if(struct.person_sys[player.id].store_complect_2 <= 99) {
                player.setClothes(8, clothes[8].drawable, clothes[8].palette, clothes[8].texture);
              }
							player.setClothes(3, clothes[3].drawable, clothes[3].palette, clothes[3].texture);
							player.setClothes(11, clothes[11].drawable, clothes[11].palette, clothes[11].texture);
							struct.person_sys[player.id].store_money = struct.person_sys[player.id].store_money + 25;
						} else if(parseInt(args[1]) == 2) {
							player.setClothes(3, 1, 0, 0);
							player.setClothes(11, 3, struct.person_sys[player.id].store_complect_color, 0);
						} else if(parseInt(args[1]) == 3) {
							player.setClothes(3, 1, 0, 0);
							player.setClothes(11, 4, struct.person_sys[player.id].store_complect_color, 0);
						}
						struct.person_sys[player.id].store_complect_3 = 100;
					}
				}
				break;
        case 'store_complect_4': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
              player.setClothes(4, clothes[4].drawable, clothes[4].palette, clothes[4].texture);
              struct.person_sys[player.id].store_money = struct.person_sys[player.id].store_money + 25;
            } else if(parseInt(args[1]) >= 2) {
              if(args[1] == 11) {
                player.setClothes(4, 1, 0, 0);
              } else {
                player.setClothes(4, parseInt(args[1]), 0, 0);
              }
              struct.person_sys[player.id].store_complect_4 = 100;
            }
          }
        }
        break;
        case 'store_complect_5': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
              player.setClothes(6, clothes[6].drawable, clothes[6].palette, clothes[6].texture);
              struct.person_sys[player.id].store_money = struct.person_sys[player.id].store_money + 25;
            } else if(parseInt(args[1]) >= 2) {
              player.setClothes(6, parseInt(args[1]), 0, 0);
              struct.person_sys[player.id].store_complect_5 = 100;
            }
          }
        }
        break;
        case 'store_complect_6': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
              player.setProp(0, props[0].drawable, props[0].texture);
            } else if(parseInt(args[1]) >= 2) {
              player.setProp(0, parseInt(args[1]), struct.person_sys[player.id].store_complect_color);
              struct.person_sys[player.id].store_complect_6 = 50;
            }
          }
        }
        break;
        case 'store_complect_7': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
              player.setProp(1, props[0].drawable, props[1].texture);
            } else if(parseInt(args[1]) >= 2) {
              player.setProp(1, parseInt(args[1]), struct.person_sys[player.id].store_complect_color);
              struct.person_sys[player.id].store_complect_7 = 50;
            }
          }
        }
        break;
        case 'store_complect_8': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
              player.setProp(2, props[0].drawable, props[2].texture);
            } else if(parseInt(args[1]) >= 2) {
              player.setProp(2, parseInt(args[1]), struct.person_sys[player.id].store_complect_color);
              struct.person_sys[player.id].store_complect_8 = 50;
            }
          }
        }
        break;
        case 'store_complect_9': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
              player.setProp(6, 0, 0);
            } else if(parseInt(args[1]) >= 2) {
              player.setProp(6, parseInt(args[1]), struct.person_sys[player.id].store_complect_color);
              struct.person_sys[player.id].store_complect_9 = 50;
            }
          }
        }
        break;
        case 'store_complect_10': {
          if(parseInt(args[1]) != 0) {
            if(parseInt(args[1]) == 1) {
              let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
              player.setProp(7, 0, 0);
            } else if(parseInt(args[1]) >= 2) {
              player.setProp(7, parseInt(args[1]), struct.person_sys[player.id].store_complect_color);
              struct.person_sys[player.id].store_complect_10 = 50;
            }
          }
        }
        break;
				case 'store_complect_color': {
					struct.person_sys[player.id].store_complect_color = parseInt(args[1]);
				}
				break;
        case 'store_accept': {
          let struct1 = new Array(11), struct2 = new Array(2), struct3;
          for(let s1 = 0; s1 <= 11; s1++) {
            struct1[s1] = player.getClothes(s1);
          }
          for(let s2 = 0; s2 <= 7; s2++) {
            struct2[s2] = player.getProp(s2);
          }
          struct.person_data[player.id].g_character_style_1 = JSON.stringify(struct1);
          struct.person_data[player.id].g_character_style_2 = JSON.stringify(struct2);
          player.heading = 73.17794036865234;
          player.position = new mp.Vector3(parseFloat(427.3920593261719), parseFloat(-809.343994140625), parseFloat(29.497228622436523));
          chat.local(player, '2BE26B', "Вы бесплатно переоделись");
          chat.local(player, '2BE26B', "По скольку данный бизнес не имеет владельца");
          systems.updateData(player);
          player.call("freezePlayer", [0]);
          setTimeout(function(playerid, verif_name) {
            if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
              player.dimension = 0;
            }
          }, 1000, player.id, player.name);
        }
        break;
				case 'store_exit': {
          player.heading = 73.17794036865234;
          player.position = new mp.Vector3(parseFloat(427.3920593261719), parseFloat(-809.343994140625), parseFloat(29.497228622436523));
					chat.local(player, '2BE26B', "Вы покинули кабинку");
          player.call("freezePlayer", [0]);
          setTimeout(function(playerid, verif_name) {
            if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
              player.dimension = 0;
            }
          }, 1000, player.id, player.name);
          systems.loadCharacter(player);
				}
				break;
				case 'editor_person_data_blend': {
					if(args[1]) {
						if(args[2]) {
							if(args[3]) {
								if(args[4]) {

								} else {
									rgs[4] = 1;
								}
							} else {
								args[3] = 1;
							}
						} else {
							args[2] = 0;
						}
					} else {
						args[1] = 0;
					}
          /*
          let debug = [parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[4]), 0, 0, parseFloat(args[4])];
          debug = debug.join();
          console.log(debug);
          */
					player.setHeadBlend(parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[3]), parseFloat(args[1]), parseFloat(args[2]), parseFloat(args[4]), 0, 0, parseFloat(args[4]));
					// 0, 0, 0, 0 = 1 нолик - цвет кожи и последний
					struct.person_sys[player.id].bhead_data1 = args[1];
					struct.person_sys[player.id].bhead_data2 = args[2];
					struct.person_sys[player.id].bhead_data3 = args[3];
					struct.person_sys[player.id].bhead_data4 = args[4];
				}
				break;
				case 'editor_person_data_face': {
					player.setFaceFeature(parseInt(args[1]), parseFloat(args[2]));
				}
				break;
				case 'editor_person_data_hair': {
          if(struct.person_data[player.id].g_sex == 0) {
            if(parseInt(args[2]) == 23) {
              args[2] = 0;
            }
  					player.setClothes(parseInt(args[1]), parseInt(args[2]), 0, 0);
          } else if(struct.person_data[player.id].g_sex == 1) {
            if(parseInt(args[2]) == 24) {
              args[2] = 0;
            }
            player.setClothes(parseInt(args[1]), parseInt(args[2]), 0, 0);
          }
          player.setHairColor(parseInt(args[3]), parseInt(args[3]));
					struct.person_sys[player.id].hair_color = parseInt(args[3]);
				}
				break;
				case 'editor_person_data_other': {
					player.setFaceFeature(parseInt(args[1]), parseInt(args[2]));
          // player.outputChatBox("<style>@font-face { font-family: 'Helvetica Light'; src: url('http://lsfivem.com/fonts/HelveticaLight.ttf') format('truetype'); }</style><script>$('#chat_messages').css({'font-size': 18px; 'height':'300px', 'width':'45vw', 'margin-top':'0.0vh', 'font-family':'Helvetica Light'});</script>");
				}
				break;
        case 'register_person': {
          if(configure.registration) {
            mysql.connection.query("SELECT * FROM `persons` WHERE `g_name` = ?", [args[1]], function(err1, results) {
              if(results.length == 0) {
                mysql.connection.query("SELECT * FROM `banip` WHERE `ip` = ?", [player.ip], function(err2, results2) {
                  if(!results2[0]) {
                    let md5_pass = md5(args[2]);
                    mysql.connection.query('INSERT INTO persons SET g_name = ?, g_password = ?, g_date_reg = ?, g_sex = ?', [args[1], md5_pass, configure.date, args[3]], function (err3, results3) {
                      player.call('showSuccessForm', [0, 1]);
                    });
                  } else {
                    player.call('showWrongForm', [0, 7]);
                  }
                });
              } else {
                player.call('showWrongForm', [0, 6]);
              }
            });
          } else {
            player.call('showWrongForm', [0, 8]);
            player.kick();
          }
        }
        break;
				case 'select_person': {
          if(struct.person_auth[player.id].flood_count != 5) {
            mysql.connection.query("SELECT * FROM `banip` WHERE `ip` = ?", [player.ip], function(err2, results2) {
              if(!results2[0]) {
      					mysql.connection.query("SELECT * FROM persons WHERE g_name = ?", [args[1]], function(err, results) {
      						if(results.length >= 1)
      						{
                    let md5_pass = md5(args[2]);
                    if(results[0].g_password == md5_pass) {
                      systems.loadData(results[0], player, struct);
                      if(struct.person_sys[player.id].admin_alogin_auth == 1 || configure.auth == 1) {
                        if(struct.person_data[player.id].g_status == 0) {
                          player.outputChatBox("<style>@font-face { font-family: 'Helvetica Light'; src: url('http://lsfivem.com/fonts/HelveticaLight.ttf') format('truetype'); }</style><script>$('#chat_messages').css({'font-size': 18px; 'height':'300px', 'width':'45vw', 'margin-top':'0.0vh', 'font-family':'Helvetica Light'});</script>");
                          player.model = (results[0].g_sex == 0) ? "mp_m_freemode_01" : "mp_f_freemode_01";
                          let gen_randomp_clothes_4 = systems.getRandom(0, 2);
                          let gen_randomp_clothes_6 = systems.getRandom(0, 2);
                          let gen_randomp_clothes_8 = systems.getRandom(0, 2);
                          let gen_randomp_clothes_11 = systems.getRandom(0, 2);
                          if(results[0].g_sex == 0) {
                            player.setClothes(3, 0, 0, 0);
                            player.setClothes(4, 1, parseInt(gen_randomp_clothes_4), 0);
                            player.setClothes(6, 1, parseInt(gen_randomp_clothes_6), 0);
                            player.setClothes(8, 1, parseInt(gen_randomp_clothes_8), 0);
                            player.setClothes(11, 1, parseInt(gen_randomp_clothes_11), 0);
                          } else {
                            player.setClothes(3, 5, 0, 0);
                            player.setClothes(4, 1, parseInt(gen_randomp_clothes_4), 0);
                            player.setClothes(6, 1, parseInt(gen_randomp_clothes_6), 0);
                            player.setClothes(8, 1, parseInt(gen_randomp_clothes_8), 0);
                            player.setClothes(11, 1, parseInt(gen_randomp_clothes_11), 0);
                            player.setHeadBlend(27, 1, 27, 27, 1, 1, 0, 0, 1);
                          }
                          player.setHeadBlend(parseFloat(0), parseFloat(0), parseFloat(1), parseFloat(0), parseFloat(0), parseFloat(1), 0, 0, parseFloat(1));
                          if(results[0].g_character_create == 0) {
                            player.name = args[1];
                            player.dimension = player.id;
                            player.heading = 170;
                            player.position = new mp.Vector3(parseFloat(403.0166931152344), parseFloat(-996.7100830078125), parseFloat(-99.00025939941406));
                            player.call('createPerson', [results[0].g_sex]);
                          } else {
                            player.name = results[0].g_name;
                            player.dimension = 0;
                            struct.person_sys[player.id].auth_status = 1;
                            player.call('endPerson');
                            player.call("gameChat", [2]);
                            systems.loadCharacter(player);
                            chat.local(player, 'F0D829', 'Добро пожаловать на Los Santos Role Play');
                            chat.local(player, 'F0D829', 'Мы рады Вас видеть, вновь!');
                            player.call('voiceChatLoader', [`${player.id}`, `${player.name}`]);
                            systems.updateData(player);
                            systems.openDoors(player);
                            systems.loadMapGangZones(player);
                            struct.person_data[player.id].g_online = 1;
                            mysql.connection.query('UPDATE `persons` SET `g_online` = ? WHERE `g_name` = ?', [struct.person_data[player.id].g_online, struct.person_data[player.id].g_name], function (err3, res3) {

                            });
                            if(struct.person_data[player.id].g_gang >= 1) {
                              systems.gangclothes(player, struct.person_data[player.id].g_sex, struct.person_data[player.id].g_gang);
                            }
                            if(struct.person_data[player.id].g_jail == 1) {
                              let camera_pos = "";
                              if(parseInt(camera) == 1) {
                                camera_pos = new mp.Vector3(parseFloat(460.3734130859375, -994.399169921875, 24.914871215820312));
                              } else if(parseInt(camera) == 2) {
                                camera_pos = new mp.Vector3(parseFloat(460.3734130859375, -997.814208984375, 24.914871215820312));
                              } else if(parseInt(camera) == 3) {
                                camera_pos = new mp.Vector3(parseFloat(460.3734130859375, -1001.42724609375, 24.914871215820312));
                              } else {
                                camera_pos = new mp.Vector3(parseFloat(460.3734130859375, -994.399169921875, 24.914871215820312));
                                camera = 1;
                              }
                              player.position = camera_pos;
                            } else {
                              systems.spawnPosition(player);
                            }
                            player.call('setWantedLevel', [struct.person_data[player.id].g_wanted]);
                            player.call("freezePlayer", [0]);
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
                                struct.person_sys[player.id].enter_limit = 0;
                              }
                            });
                          }
                        } else {
                          player.call('showWrongForm', [1, 4]);
                        }
                      } else {
                        player.call('showWrongForm', [1, 3]);
                      }
                    } else {
                      player.call('showWrongForm', [1, 2]);
                    }
                  } else {
                    player.call('showWrongForm', [1, 1]);
                  }
                });
              } else {
                player.call('showWrongForm', [1, 7]);
                player.kick();
              }
            });
          } else {
            player.call('showWrongForm', [2, 3]);
            player.kick();
          }
          struct.person_auth[player.id].flood_count++;
				}
				break;
				case 'create_person':
				{
					player.dimension = 0;
					player.call('endPerson');
					player.call("gameChat", [2]);
					struct.person_sys[player.id].auth_status = 1;
					struct.person_data[player.id].g_name = player.name;
					let struct1 = new Array(11), struct2 = new Array(2), struct3;
					for(let s1 = 0; s1 <= 11; s1++) {
						struct1[s1] = player.getClothes(s1);
					}
					for(let s2 = 0; s2 <= 7; s2++) {
						struct2[s2] = player.getProp(s2);
					}
					struct.person_data[player.id].g_character_style_1 = JSON.stringify(struct1);
					struct.person_data[player.id].g_character_style_2 = JSON.stringify(struct2);
					let gen_blend = new Array(3);
					if(struct.person_sys[player.id].bhead_data1 && struct.person_sys[player.id].bhead_data2 && struct.person_sys[player.id].bhead_data3 && struct.person_sys[player.id].bhead_data4) {
						gen_blend[0] = struct.person_sys[player.id].bhead_data1;
						gen_blend[1] = struct.person_sys[player.id].bhead_data2;
						gen_blend[2] = struct.person_sys[player.id].bhead_data3;
						gen_blend[3] = struct.person_sys[player.id].bhead_data4;
					} else {
						gen_blend[0] = 1;
						gen_blend[1] = 1;
						gen_blend[2] = 1;
						gen_blend[3] = 1;
					}
					struct.person_data[player.id].g_character_style_3 = JSON.stringify(gen_blend);
					let getFaceFeature = new Array(18);
					for(let g = 0; g <= 18; g++) {
						getFaceFeature[g] = player.getFaceFeature(g);
					}
					struct.person_data[player.id].g_character_style_4 = JSON.stringify(getFaceFeature);
					chat.local(player, '42F4BC', 'Благодарим Вас за выбор нашего РП сервера!');
					chat.local(player, '42F4BC', 'Рекомендуем прочитать игровые правила на нашем форуме:');
					chat.local(player, '42F4BC', ' > http://forum.lsfivem.com [=>] Документация [=>] Игровые правила');
					chat.local(player, '42F4BC', 'Если у вас возникнет вопрос, обратитесь в службу поддержки:');
					chat.local(player, '42F4BC', ' > (( /mm [=>] Поддержка [=>] Вопрос/Проблема ))');
          chat.local(player, '42F4BC', 'Если по какой-либо причине, вы не получили ответ, то');
          chat.local(player, '42F4BC', ' > https://support.lsfivem.com [=>] Создать тикет');
					chat.local(player, '42F4BC', 'Ваш персонаж был успешно создан, приятной игры!');
          player.call('voiceChatLoader', [`${player.id}`, `${player.name}`]);
          player.call("freezePlayer", [0]);
					player.setHeadBlend(parseFloat(gen_blend[0]), parseFloat(gen_blend[1]), parseFloat(gen_blend[2]), parseFloat(gen_blend[0]), parseFloat(gen_blend[1]), parseFloat(gen_blend[3]), 0, 0, parseFloat(gen_blend[3]));
					systems.updateData(player);
					systems.openDoors(player);
					struct.person_data[player.id].g_online = 1;
          struct.person_data[player.id].g_character_create = 1;
					mysql.connection.query('UPDATE persons SET g_online = 1, g_character_create = ?, g_character_style_1 = ?, g_character_style_2 = ?, g_character_style_3 = ?, g_character_style_4 = ?, g_character_head_color = ? WHERE g_name = ?', [struct.person_data[player.id].g_character_create, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_data[player.id].g_character_style_4, struct.person_sys[player.id].hair_color, struct.person_data[player.id].g_name], function(err, result) {

					});
					struct.person_sys[player.id].enter_limit = 0;
					player.spawn(new mp.Vector3(parseFloat(-258.0207824707031), parseFloat(-977.0762329101562), parseFloat(31.22001075744629)));
          systems.loadMapGangZones(player);
				}
				break;
				case 'mainmenu':
					player.call("showMainMenu_click", [args[1], struct.person_data[player.id]]);
				break;
        case 'settings_character':
        {
          if(args[1]) {
            if(parseInt(args[1]) == 1) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setClothes(1, 0, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setClothes(1, 0, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 1, 1);
              }
            } else if(parseInt(args[1]) == 2) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setClothes(3, 15, 0, 0);
                  player.setClothes(8, 15, 0, 0);
                  player.setClothes(11, 15, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setClothes(3, 15, 0, 0);
                  player.setClothes(8, 15, 0, 0);
                  player.setClothes(11, 15, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 1, 8);
                systems.loadComponent(player, 1, 11);
              }
            } else if(parseInt(args[1]) == 3) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setClothes(4, 61, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setClothes(4, 15, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 1, 4);
              }
            } else if(parseInt(args[1]) == 4) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setClothes(6, 34, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setClothes(6, 35, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 1, 6);
              }
            } else if(parseInt(args[1]) == 5) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setProp(0, 121, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setProp(0, 120, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 2, 0);
              }
            } else if(parseInt(args[1]) == 6) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setProp(1, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setProp(1, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 2, 1);
              }
            } else if(parseInt(args[1]) == 7) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setProp(2, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setProp(2, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 2, 2);
              }
            } else if(parseInt(args[1]) == 8) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setProp(6, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setProp(6, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 2, 6);
              }
            } else if(parseInt(args[1]) == 9) {
              if(parseInt(args[2]) == 1) {
                if(struct.person_data[player.id].g_sex == 0) {
                  player.setProp(7, 0, 0);
                } else if(struct.person_data[player.id].g_sex == 1) {
                  player.setProp(7, 0, 0);
                }
              } else if(args[2] == 0) {
                systems.loadComponent(player, 2, 7);
              }
            }
          } else {
            chat.local(player, 'FF8282', 'Отсутствует определенный элемент.');
          }
        }
        break;
        case 'enter_house': {
					struct.person_sys[player.id].enter_house = parseInt(args[1]);
					struct.person_sys[player.id].enter_garage = -1;
					player.dimension = 10000 + parseInt(args[1]);
					if(configure.housesrare[parseInt(args[1])] == 0) {
						if(configure.housesinterior[parseInt(args[1])] == 0) {
							player.position = configure.housesinterior_rare0_pos0;
						} else if(configure.housesinterior[parseInt(args[1])] == 1) {
							player.position = configure.housesinterior_rare0_pos1;
						}
					} else if(configure.housesrare[parseInt(args[1])] == 2) {
						if(configure.housesinterior[parseInt(args[1])] == 0) {
							player.position = configure.housesinterior_rare2_pos0;
						} else if(configure.housesinterior[parseInt(args[1])] == 1) {
							player.position = configure.housesinterior_rare2_pos1;
						} else if(configure.housesinterior[parseInt(args[1])] == 2) {
							player.position = configure.housesinterior_rare2_pos2;
						}
					}
					chat.local(player, '42F480', "Вы вошли в дом! Для выхода из дома используйте команду (( /exit ))");
					chat.local(player, '42F480', `Похоже это дом под номером #${configure.housesnumber[args[1]]}`);
					struct.person_sys[player.id].enter_limit = 1;
				}
				break;
				case 'enter_garage': {
					struct.person_sys[player.id].enter_house = -1;
					struct.person_sys[player.id].enter_garage = parseInt(args[1]);
					player.dimension = 10000 + parseInt(args[1]);
					if(configure.housesgarage[args[1]] == 1) {
						player.position = new mp.Vector3(parseFloat(173.2903),parseFloat(-1003.6),parseFloat(-99,65707));
					} else if(configure.housesgarage[args[1]] == 2) {
						player.position = new mp.Vector3(parseFloat(197.8153),parseFloat(-1002.293),parseFloat(-99,65749));
					} else if(configure.housesgarage[args[1]] == 3) {
						player.position = new mp.Vector3(parseFloat(240.1851806640625),parseFloat(-1004.7271728515625),parseFloat(-98.99993896484375));
					}
					chat.local(player, '42F480', "Вы вошли в гараж! Для выхода из гаража используйте команду (( /exit ))");
					struct.person_sys[player.id].enter_limit = 1;
				}
				break;
				case 'buy_house': {
					mysql.connection.query("SELECT * FROM houses WHERE id = ?", [args[1]], function(err1, sel_buy_house) {
						if(sel_buy_house[0]) {
							if(struct.person_data[player.id].g_money >= sel_buy_house[0].coast) {
								mysql.connection.query("UPDATE `houses` SET owner = ?, state = ? WHERE id = ?", [struct.person_data[player.id].g_name, 1, args[1]], function(err2, results) {
									configure.housesblips[args[1]].color = 1;
									configure.housestate[args[1]] = 1;
									configure.housesowner[args[1]] = struct.person_data[player.id].g_name;
									struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - sel_buy_house[0].coast;
									systems.updateData(player);
									chat.local(player, '2BE26B', "Поздравляем с покупкой дома!");
								});
							} else {
								chat.local(player, 'FF8282', "У вас недостаточно средств для покупки недвижимости!");
							}
						} else {
							chat.local(player, 'FF8282', "Дом не найден! Обратитесь к разработчикам.");
						}
					});
				}
				break;
				case 'send_staff_message':
				{
					if(args[1]) {
						chat.usertostaff(player, args[1]);
					} else {
						chat.local(player, 'FF8282', 'Сообщение отсутствует. Попробуйте вновь.');
					}
				}
				break;
        case 'send_taxi_message':
        {
          if(args[1]) {
            configure.call_taxi_last['end'] = player;
            chat.usertotaxi(player, args[1]);
            chat.local(player, 'FCF767', 'Диспетчер: ваш вызов был доставлен свободным таксистам');
          } else {
            chat.local(player, 'FF8282', 'Сообщение отсутствует. Попробуйте вновь.');
          }
        }
        break;
        case 'send_police_message':
        {
          if(args[1]) {
            configure.call_police_last['end'] = player;
            chat.usertopolice(player, args[1]);
            chat.local(player, 'FCF767', 'Диспетчер: ваш вызов был доставлен в полицейский департамент');
          } else {
            chat.local(player, 'FF8282', 'Сообщение отсутствует. Попробуйте вновь.');
          }
        }
        break;
        case 'send_ad_message':
        {
          if(args[1]) {
            if(struct.person_data[player.id].g_money >= 250) {
              struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - 250;
              mysql.connection.query('INSERT INTO ads SET author = ?, message = ?, g_date_reg = ?', [player.name, args[1], configure.date], function (err, results) {

              });
              chat.local(player, '41C4F4', 'Ваше объявление будет проверено редактором в ближайшее время!');
              systems.updateData(player, struct);
            } else {
              chat.local(player, 'FF8282', "У вас недостаточно средств для аренды транспорта");
            }
          } else {
            chat.local(player, 'FF8282', 'Сообщение отсутствует. Попробуйте вновь.');
          }
        }
        break;
        case 'buy_drugs':
        {
          if(args[1]) {
            if(struct.person_data[player.id].g_money >= parseInt(args[1])) {
              struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - parseInt(args[1]);
              struct.person_data[player.id].g_drugs = struct.person_data[player.id].g_drugs + parseInt(args[1]);
              chat.local(player, '1BE636', `Вы приобрели ${args[1]} грамм наркотиков.`);
              systems.updateData(player, struct);
            } else {
              chat.local(player, 'FF8282', "У вас недостаточно средств для данной покупки");
            }
          } else {
            chat.local(player, 'FF8282', 'Количество отсутствует. Попробуйте вновь.');
          }
        }
        break;
        case 'get_fraction_gun':
        {
          if(args[1]) {
            if(struct.person_data[player.id].g_fraction == 2) {
              if(parseInt(args[1]) == 1) {
                player.giveWeapon(mp.joaat('weapon_heavypistol'), 14);
              } else if(parseInt(args[1]) == 2) {
                player.giveWeapon(mp.joaat('weapon_bullpuprifle_mk2'), 60);
              } else if(parseInt(args[1]) == 3) {
                player.giveWeapon(mp.joaat('weapon_smg_mk2'), 120);
              } else if(parseInt(args[1]) == 4) {
                player.giveWeapon(mp.joaat('weapon_heavysniper'), 10);
              } else if(parseInt(args[1]) == 5) {
                player.giveWeapon(mp.joaat('weapon_assaultshotgun'), 24);
              } else if(parseInt(args[1]) == 6) {
                player.giveWeapon(mp.joaat('weapon_carbinerifle_mk2'), 100);
              }
            }
          } else {
            chat.local(player, 'FF8282', 'Неизвестный тип получаемого оружия.');
          }
        }
        break;
        case 'weazel_ads_update':
        {
          mysql.connection.query("SELECT * FROM `ads` WHERE `status` = 0", [], function(err, selectads) {
            if(selectads[0]) {
              let ads = new Array(selectads.length);
              for(let i = 0; i < selectads.length; i++) {
                ads[i] = {};
                ads[i].id = selectads[i].id;
                ads[i].author = selectads[i].author;
                ads[i].message = selectads[i].message;
                ads[i].status = selectads[i].status;
                ads[i].editor = selectads[i].editor;
                ads[i].date = selectads[i].date;
              }
              let ret_json = JSON.stringify(ads);
              player.call('NPanel_data', [1, `${ret_json}`]);
            } else {
              player.call('NPanel_data', [0, 0]);
            }
          });
        }
        break;
        case 'weazel_ads_edit':
        {
          mysql.connection.query("SELECT * FROM `ads` WHERE `id` = ? AND `status` = 0", [args[1]], function(err, selectads) {
            if(selectads[0]) {
              let get_id = -1;
              mp.players.forEach(_player => {
                if(_player.name == args[2]) {
                  get_id = _player.id;
                }
              });
              chat.weazelnews(player, `Объявление: ${args[3]}. Прислал: ${args[2]}[${get_id}].`);
              chat.weazelnews(player, `&nbsp&nbsp&nbsp&nbsp&nbsp&nbspОтредактировал сотрудник Weazel News: ${player.name}[${player.id}].`);
              mysql.connection.query("UPDATE `ads` SET `status` = 1, `editor` = ? WHERE `id` = ?", [player.name, args[1]], function(err, results) {

              });
            }
          });
        }
        break;
        case 'weazel_ads_delete':
        {
          mysql.connection.query("SELECT * FROM `ads` WHERE `id` = ? AND `status` = 0", [args[1]], function(err, selectads) {
            if(selectads[0]) {
              mysql.connection.query("UPDATE `ads` SET `status` = 2, `editor` = ? WHERE `id` = ?", [player.name, args[1]], function(err, results) {

              });
            }
          });
        }
        break;
				case 'manageObject':
				{
					if(struct.person_sys[player.id].admin_sel_object_id != 0) {
						let get_model = configure.staffobjects[parseInt(struct.person_sys[player.id].admin_sel_object_id)].model;
						let get_pos = configure.staffobjects[parseInt(struct.person_sys[player.id].admin_sel_object_id)].position;
						let get_rotation = configure.staffobjects[parseInt(struct.person_sys[player.id].admin_sel_object_id)].rotation;
						if(parseInt(args[1]) == 1) {
							get_pos.x = get_pos.x + 1;
						} else if(parseInt(args[1]) == 2) {
							get_pos.x = get_pos.x - 1;
						} else if(parseInt(args[1]) == 3) {
							get_pos.y = get_pos.y + 1;
						} else if(parseInt(args[1]) == 4) {
							get_pos.y = get_pos.y - 1;
						} else if(parseInt(args[1]) == 5) {
							get_pos.z = get_pos.z + 1;
						} else if(parseInt(args[1]) == 6) {
							get_pos.z = get_pos.z - 1;
						}

						configure.staffobjects[parseInt(struct.person_sys[player.id].admin_sel_object_id)].destroy();

						function create_obj() {
							configure.staffobjects[parseInt(struct.person_sys[player.id].admin_sel_object_id)] = mp.objects.new(get_model, get_pos,
							{
									rotation: get_rotation,
									alpha: 255,
									dimension: player.dimension
							});
						}

						setTimeout(create_obj, 50);

					}
				}
				break;
				case 'voiceSend':
          console.log(`[1] ${player.name} send voice`);
          struct.person_sys[player.id].voice_active = 1;
          mp.players.forEach(_player => {
            let distance = mp.Vector3.Distance2D(player.position, _player.position);
            if(distance <= 50) {
              if(player.name != _player.name) {
                console.log(`[1] ${_player.name} get voice_1 - test: ${struct.person_sys[_player.id].voice_disabled}`);
                if(struct.person_sys[_player.id].voice_disabled == 0) {
                  console.log(`[1] ${_player.name} get_voice_2`);
                  struct.person_sys[_player.id].voice_listen = player.id;
                  player.call("voiceActive_caller", [`${_player.id}`,`${player.name}`]);
                  _player.call("voiceActive_passive", [`${player.id}`, `${player.name}`]);
                  _player.call('drawGameTextChat', [`${player.name}`, `[что-то говорит]`]);
                }
              }
            }
          });
				break;
        case 'voiceClose':
        console.log(`[2] OFF VOICE PUSH ${args[1]}`);
          let get_anyoneid = parseInt(args[1]);
          mp.players.forEach(_player => {
            if(_player.id == get_anyoneid) {
              struct.person_sys[_player.id].voice_active = 0;
            }
            if(struct.person_sys[_player.id].voice_listen == get_anyoneid) {
              console.log(`[2] OFF LISTENERS ${_player.name}`);
              struct.person_sys[_player.id].voice_listen = 0;
              _player.call("voiceCancel", [`${get_anyoneid}`]);
            }
          });
        break;
        case 'sendGangZone':
          //logger.console(`[player: ${player.name} - debug load gang local: ${args[2]} и ${args[1]}`);
          struct.person_sys[player.id].storage_blip[parseInt(args[2])] = args[1];
        break;
			}
		}
});

} catch(error) {
  console.log(`[WARN] FATAL ERROR events.js: ${error}`);
}
