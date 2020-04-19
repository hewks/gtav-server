"use strict";

	let chat = module.exports;

	var configure = require('../configure.js');
	var struct = require('../struct.js');
	var systems = require('../systems.js');

	chat.local = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].timestamp == 1) {
			player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
		} else {
			player.outputChatBox("!{" + color + "}" + message);
		}
	}

	chat.broadcastinrange = function(player, type, position, range, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(type == 1) {
				if(!player.vehicle) {
					if(struct.person_sys[player.id].job_action == 0) {
						/*
						let get_anim_num = systems.getRandom(1, 5);
						let time_anim = 1000;
						switch(parseInt(get_anim_num)) {
							case 1: { player.playAnimation("special_ped@baygor@monologue_3@monologue_3e", "trees_can_talk_4", 1, 1); time_anim = 2000; }; break;
							case 2: { player.playAnimation("special_ped@baygor@monologue_3@monologue_3f", "trees_can_talk_5", 1, 1); time_anim = 3800; }; break;
							case 3: { player.playAnimation("special_ped@baygor@monologue_3@monologue_3h", "trees_can_talk_7", 1, 1); time_anim = 1500; }; break;
							case 4: { player.playAnimation("special_ped@baygor@monologue_3@monologue_3i", "trees_can_talk_8", 1, 1); time_anim = 1800; }; break;
							case 5: { player.playAnimation("special_ped@baygor@monologue_3@monologue_3j", "trees_can_talk_9", 1, 1); time_anim = 5000; }; break;
						}
						player.call('clearTask', [time_anim]);
						*/
					}
				}
				mp.players.forEach(_player => {
					if(_player.id != player.id) {
						let distance = mp.Vector3.Distance2D(player.position, _player.position);
						if(distance <= 15) {
							let get_only_message = message.split(': ');
							_player.call('drawGameTextChat', [`${player.name}`, `${get_only_message[1]}`]);
						}
					}
				});
				if(struct.person_sys[player.id].timestamp == 1) {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				} else {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + message);
				}
			} else if(type == 2) {
				mp.players.forEach(_player => {
					if(_player.id != player.id) {
						let distance = mp.Vector3.Distance2D(player.position, _player.position);
						if(distance <= 15) {
							let get_only_message = message.split(': ');
							_player.call('drawGameTextChat', [`${player.name}`, `${get_only_message[1]}`]);
						}
					}
				});
				if(struct.person_sys[player.id].timestamp == 1) {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				} else {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + message);
				}
			} else if(type == 3) {
				if(struct.person_sys[player.id].timestamp == 1) {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				} else {
					mp.players.broadcastInRange(position, 15, "!{" + color + "}" + message);
				}
			}
		}
	}

	chat.workjob = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_job == struct.person_data[_player.id].g_job) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
					}
				});
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_job == struct.person_data[_player.id].g_job) {
						_player.outputChatBox("!{" + color + "}" + message);
					}
				});
			}
		}
	}

	chat.department = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_fraction == 1 || struct.person_data[_player.id].g_fraction == 2 && struct.person_sys[_player.id].fraction_ready == 1) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
					}
				});
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_fraction == 1 || struct.person_data[_player.id].g_fraction == 2 && struct.person_sys[_player.id].fraction_ready == 1) {
						_player.outputChatBox("!{" + color + "}" + message);
					}
				});
			}
		}
	}

	chat.fraction = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_fraction == struct.person_data[_player.id].g_fraction && struct.person_sys[_player.id].fraction_ready == 1) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
					}
				});
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_fraction == struct.person_data[_player.id].g_fraction && struct.person_sys[_player.id].fraction_ready == 1) {
						_player.outputChatBox("!{" + color + "}" + message);
					}
				});
			}
		}
	}

	chat.family = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_gang == struct.person_data[_player.id].g_gang || struct.person_data[player.id].g_fraction == 3 && struct.person_data[player.id].fraction == struct.person_data[_player.id].fraction) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
					}
				});
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[player.id].g_gang == struct.person_data[_player.id].g_gang) {
						_player.outputChatBox("!{" + color + "}" + message);
					}
				});
			}
		}
	}

	chat.government = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				});
			} else {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + message);
				});
			}
		}
	}

	chat.weazelnews = function(player, message) {
		let color = "1EFC3B";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				});
			} else {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + message);
				});
			}
		}
	}

	chat.admin = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_sys[_player.id].admin_alogin_auth == 1) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
					}
				});
			} else {
				mp.players.forEach(_player => {
					if(struct.person_sys[_player.id].admin_alogin_auth == 1) {
						_player.outputChatBox("!{" + color + "}" + message);
					}
				});
			}
		}
	}

	chat.usertostaff = function(player, message) {
		let color = "F95204";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_sys[_player.id].admin_alogin_level >= 1) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] спрашивает: " + message);
						_player.notify("Вам пришло сообщение в репорт!");
					}
				});
				player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + "Ваше сообщение было отправлено!");
			} else {
				mp.players.forEach(_player => {
					if(struct.person_sys[_player.id].admin_alogin_level >= 1) {
						_player.outputChatBox("!{" + color + "}" + player.name + "[" + player.id + "] спрашивает: " + message);
						_player.notify("Вам пришло сообщение в репорт!");
					}
				});
				player.outputChatBox("!{" + color + "}" + "Ваше сообщение было отправлено!");
			}
		}
	}

	chat.oocadmin = function(player, message) {
		let color = "FFFFFF";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				});
			} else {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + message);
				});
			}
		}
	}

	chat.sysadmin = function(player, message) {
		let color = "F46842";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				});
			} else {
				mp.players.forEach(_player => {
					_player.outputChatBox("!{" + color + "}" + message);
				});
			}
		}
	}

	chat.usertotaxi = function(player, message) {
		let color = "f4EE42";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_job == 1) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] докладывает: " + message);
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] Для принятия вызова используйте команду [ /accept taxi ]");
						_player.notify("Поступил вызов!");
					}
				});
				player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + "Ваше сообщение было отправлено!");
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_job == 1) {
						_player.outputChatBox("!{" + color + "}" + player.name + "[" + player.id + "] докладывает: " + message);
						_player.outputChatBox("!{" + color + "}" + player.name + "[" + player.id + "] Для принятия вызова используйте команду [ /accept taxi ]");
						_player.notify("Поступил вызов!");
					}
				});
			}
		}
	}

	chat.usertopolice = function(player, message) {
		let color = "339EE0";
		var date = new Date();
		if(struct.person_sys[player.id].admin_alogin_level >= 6 || message.indexOf('<') == -1 && message.indexOf('>') == -1 && message.indexOf("'") == -1 && message.indexOf(`"`) == -1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_fraction == 2) {
						_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] докладывает: " + message);
												_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] Для принятия вызова используйте команду [ /accept police ]");
						_player.notify("Поступил вызов!");
					}
				});
				player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + "Ваше сообщение было отправлено!");
			} else {
				mp.players.forEach(_player => {
					if(struct.person_data[_player.id].g_fraction == 2) {
						_player.outputChatBox("!{" + color + "}" + player.name + "[" + player.id + "] докладывает: " + message);
						_player.notify("Поступил вызов!");
					}
				});
			}
		}
	}
