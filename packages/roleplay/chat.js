"use strict";

	let chat = module.exports;

	var struct = require('./struct.js');

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
		if(type == 1) {
			if(struct.person_sys[player.id].timestamp == 1) {
				mp.players.broadcastInRange(position, 15, "!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
			} else {
				mp.players.broadcastInRange(position, 15, "!{" + color + "}" + message);
			}
		}
	}

	chat.fraction = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].timestamp == 1) {
			mp.players.forEach(_player => {
				if(struct.person_data[player.id].g_fraction == struct.person_data[_player.id].g_fraction) {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				}
			});
		} else {
			mp.players.forEach(_player => {
				if(struct.person_data[player.id].g_fraction == struct.person_data[_player.id].g_fraction) {
					_player.outputChatBox("!{" + color + "}" + message);
				}
			});
		}
	}

	chat.family = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].timestamp == 1) {
			mp.players.forEach(_player => {
				if(struct.person_data[player.id].g_gang == struct.person_data[_player.id].g_gang) {
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

	chat.admin = function(player, color, message) {
		var date = new Date();
		if(struct.person_sys[player.id].timestamp == 1) {
			mp.players.forEach(_player => {
				if(struct.login_data[_player.id].group_id >= 2) {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + message);
				}
			});
		} else {
			mp.players.forEach(_player => {
				if(struct.login_data[_player.id].group_id >= 2) {
					_player.outputChatBox("!{" + color + "}" + message);
				}
			});
		}
	}

	chat.usertostaff = function(player, message) {
		let color = "F95204";
		var date = new Date();
		if(struct.person_sys[player.id].timestamp == 1) {
			mp.players.forEach(_player => {
				if(struct.login_data[_player.id].group_id >= 1) {
					_player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + player.name + "[" + player.id + "] спрашивает: " + message);
				}
			});
			player.outputChatBox("!{" + color + "}" + "[" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] " + "Ваше сообщение было отправлено!");
		} else {
			mp.players.forEach(_player => {
				if(struct.login_data[_player.id].group_id >= 1) {
					_player.outputChatBox("!{" + color + "}" + player.name + "[" + player.id + "] спрашивает: " + message);
				}
			});
			player.outputChatBox("!{" + color + "}" + "Ваше сообщение было отправлено!");
		}
	}

	chat.oocadmin = function(player, message) {
		let color = "FFFFFF";
		var date = new Date();
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

	chat.sysadmin = function(player, message) {
		let color = "F46842";
		var date = new Date();
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
