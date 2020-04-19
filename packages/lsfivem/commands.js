  /* INITIAL MODULES */

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

/* Клиент-сайд команды */

try {

mp.events.addCommand('timestamp', (player) => {
  if(struct.person_sys[player.id].timestamp == 0) {
    struct.person_sys[player.id].timestamp = 1;
  } else {
    struct.person_sys[player.id].timestamp = 0;
  }
  chat.local(player, 'FFFFFF', " > временная метка установлена!");
});

mp.events.addCommand('voiceoff', (player) => {
  if(struct.person_sys[player.id].voice_disabled == 0) {
    struct.person_sys[player.id].voice_disabled = 1;
  } else {
    struct.person_sys[player.id].voice_disabled = 0;
  }
  chat.local(player, 'FFFFFF', " > голосовой чат по отношению к вам изменен!");
});

/* Обычные команды */

mp.events.addCommand('me', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} ${message}`);
    } else {
      chat.local(player, 'FF8282', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/me]: [сообщение]");
  }
});

mp.events.addCommand('b', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    message = systems.deletespacesmessages(message);
    chat.broadcastinrange(player, 2, player.position, 15, 'E5E5E5', `${player.name}[${player.id}]: (( ${message} ))`);
  } else {
    chat.local(player, 'FFFFFF', " > [/b]: [сообщение]");
  }
});

mp.events.addCommand('do', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${message} (( ${player.name} ))`);
    } else {
      chat.local(player, 'FF8282', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/do]: [сообщение]");
  }
});

mp.events.addCommand('try', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let get_int = parseInt(systems.getRandom(1,3));
      get_int = (get_int == 1) ? "!{42F450}[Удачно]" : "!{FF8282}[Неудачно]";
      chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} ${message} ${get_int}`);
    } else {
      chat.local(player, 'FF8282', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/me]: [сообщение]");
  }
});

mp.events.addCommand('todo', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let allmessage = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let messages = allmessage.split('*');
      if(messages.length >= 2) {
        chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', ` - '${messages[0]}' - сказал ${player.name}, ${messages[1]}`);
      } else {
        chat.local(player, 'FF8282', 'Неверное использование команды.');
        chat.local(player, 'FFFFFF', " > [/todo]: [сообщение]*[сообщение]");
      }
    } else {
      chat.local(player, 'FF8282', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/todo]: [сообщение]*[сообщение]");
  }
});

mp.events.addCommand('s', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    message = systems.deletespacesmessages(message);
    chat.broadcastinrange(player, 2, player.position, 15, 'E5E5E5', `${player.name}[${player.id}] кричит: ${message}`);
  } else {
    chat.local(player, 'FFFFFF', " > [/b]: [сообщение]");
  }
});

mp.events.addCommand('id', (player, _, find) => {
  if(arr1) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    message = systems.deletespacesmessages(message);
    chat.broadcastinrange(player, 2, player.position, 15, 'E5E5E5', `${player.name}[${player.id}] кричит: ${message}`);
  } else {
    chat.local(player, 'FFFFFF', " > [/id]: [Имя_Фамилия]");
  }
});

mp.events.addCommand('changename', (player, _, newname) => {
  if(newname) {
    chat.admin(player, 'CCC506', `<< REQUEST >> ${player.name}[${player.id}] просит сменить имя на ${newname} [${player.id}]`);
    configure.changename_last[player.id] = player;
    configure.changename_new_last[player.id] = newname;
  } else {
    chat.local(player, 'FFFFFF', " > [/changename]: [Имя_Фамилия]");
  }
});

mp.events.addCommand('mm', (player) => {
  player.call('showMainMenu', [1]);
  player.notify('~w~Для возврата используйте клавишу `BackSpace`~w~');
});

mp.events.addCommand('anim', (player, _, animName1, animName2) => {
  player.playAnimation(animName1, animName2, 1, 1);
});

mp.events.addCommand('scenario', (player, _, scenarioName) => {
  player.playScenario(scenarioName);
});

mp.events.addCommand('stop', (player, _, animName1, animName2) => {
  if(struct.person_sys[player.id].job_action == 0) {
    player.stopAnimation();
  }
});

mp.events.addCommand('alogin', (player) => {
  player.call('aLogin', []);
});

mp.events.addCommand('accept', (player, _, name, playerid = 0) => {
  if(name == "taxi") {
    if(struct.person_data[player.id].g_job == 1 && player.vehicle) {
      if(struct.person_sys[configure.call_taxi_last['end'].id].auth_status == 1) {
        systems.dispatcher(player, configure.call_taxi_last['end'], 0);
        chat.local(player, 'FFFFF', `Диспетчер: вы успешно приняли вызов от ${configure.call_taxi_last['end'].name} [${configure.call_taxi_last['end'].id}]`);
        chat.local(configure.call_taxi_last['end'], 'FCF767', `Диспетчер: ваш вызов был принят таксистом ${player.name} [${player.id}]`);
      }
    }
  } else if(name == "police") {
    if(struct.person_data[player.id].g_fraction == 2) {
      if(struct.person_sys[configure.call_police_last['end'].id].auth_status == 1) {
        systems.dispatcher(player, configure.call_police_last['end'], 0);
        chat.local(player, 'FFFFF', `Диспетчер: вы успешно приняли вызов от ${configure.call_police_last['end'].name} [${configure.call_police_last['end'].id}]`);
        chat.local(configure.call_police_last['end'], 'FCF767', `Диспетчер: ваш вызов был принят офицером ${player.name} [${player.id}]`);
      }
    }
  } else if(name == "changename") {
    if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 4) {
      if(configure.changename_last[playerid]) {
        chat.sysadmin(player, `Администратор ${player.name} сменил имя персонажу ${configure.changename_last[playerid].name} на ${configure.changename_new_last[playerid]}`);
        function kick_player() {
          mysql.connection.query('UPDATE `persons` SET `g_name` = ? WHERE `g_name` = ?', [configure.changename_new_last[playerid], configure.changename_last[playerid].name], function (error, results, fields) {

          });
          configure.changename_last[playerid].kick();
          configure.changename_last[playerid] = {};
          configure.changename_new_last[playerid] = "";
        }
        setTimeout(kick_player, 100);
      } else {
        chat.local(player, 'FF8282', 'Данный персонаж не подавал заявку на смену игрового имени');
      }
    }
  }
});

mp.events.addCommand('time', (player) => {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  chat.local(player, 'F4DF42', `Серверное время: ${hour} ч. ${min} м. ${sec} с.`);
  if(struct.person_data[player.id].g_jail == 1) {
    chat.local(player, 'F4DF42', `Время до выхода: ${struct.person_data[player.id].g_jail_time}`);
  }
});

mp.events.addCommand('showid', (player, _, id) => {
  let getPlayer = mp.players.at(parseInt(id));
  if(getPlayer) {
    let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
    if(distance <= 5) {
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} показал свою ID-card ${getPlayer.name}`);
      let me_rang = fraction.get_rang(struct.person_data[getPlayer.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      let fraction_name = fraction.get_name(struct.person_data[getPlayer.id].g_fraction);
      getPlayer.call('playerShowIDCard', [JSON.stringify(struct.person_data[player.id]), fraction_name, me_rang]);
    } else {
      chat.local(player, 'FF8282', 'Вы находитесь слишком далеко от этого игрока!');
    }
  } else {
    chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
  }
});

mp.events.addCommand('sms', (player, _, id, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  let getPlayer = mp.players.at(parseInt(id));
  if(getPlayer) {
    if(getPlayer != player) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.local(player, 'FFCA60', 'SMS отправлено ' + getPlayer.name + "[" + getPlayer.id + "]" +": " + message);
      chat.local(getPlayer, 'FFCA60', 'SMS от ' + player.name + "[" + player.id + "]" +": " + message);
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} отправляет смс-сообщение.`);
      getPlayer.notify('Новое сообщение!');
    } else {
      chat.local(player, 'FF8282', 'Нельзя отправить SMS самому себе! Не круто!');
    }
  } else {
    chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
  }
});

mp.events.addCommand('pay', (player, _, id, howmuch) => {
  let getPlayer = mp.players.at(parseInt(id));
  if(getPlayer) {
    if(getPlayer != player) {
      if(struct.person_data[player.id].g_money >= parseInt(howmuch) || parseInt(howmuch) != 0) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
        if(distance <= 5) {
          if(struct.person_data[player.id].g_money >= parseInt(howmuch)) {
            struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - parseInt(howmuch);
            struct.person_data[getPlayer.id].g_money = struct.person_data[getPlayer.id].g_money + parseInt(howmuch);
            chat.local(player, 'CECECE', `Вы передали ${howmuch}$ игроку ${getPlayer.name}`);
            chat.local(getPlayer, 'CECECE', `Вам передал ${player.name} деньги в сумме ${howmuch}$`);
            chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} передает некую денежную сумму ${getPlayer.name}.`);
            systems.updateData(player, struct);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'У вас не имеется такой суммы!');
          }
        } else {
          chat.local(player, 'FF8282', 'Вы находитесь слишком далеко от этого игрока!');
        }
      } else {
        chat.local(player, 'FF8282', 'У вас не имеется такой денежной суммы!');
      }
    } else {
      chat.local(player, 'FF8282', 'Нельзя дать денег самому себе! Не круто!');
    }
  } else {
    chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
  }
});

mp.events.addCommand('fixcars', (player) => {
  mysql.connection.query("SELECT * FROM houses WHERE owner = ?", [struct.person_data[player.id].g_name], function(err1, results1) {
    if(results1[0]) {
      mysql.connection.query("SELECT * FROM cars WHERE person = ?", [struct.person_data[player.id].g_name], function(err2, results2) {
        if(results2) {
          let max_car_pos = JSON.parse(results1[0].max_cars_pos);
          let get_results2_count = results2.length;
          if(max_car_pos[0].x != "NONE") {
            if(results1[0].garage != 0) {
              for(let i = 0; i < get_results2_count; i++) {
                if(struct.person_sys[player.id].person_summon_cars == 0) {
                  struct.person_sys[player.id].person_car[i] = mp.vehicles.new(mp.joaat(results2[i].car_name), new mp.Vector3(parseFloat(max_car_pos[i].x), parseFloat(max_car_pos[i].y), parseFloat(max_car_pos[i].z)),
                  {
                      heading: max_car_pos[i].r,
                      alpha: 255,
                      locked: false,
                      engine: false,
                      dimension: 10000 + results1[0].id
                  });
                  struct.person_sys[player.id].person_car[i].setColorRGB(results2[i].car_color_r, results2[i].car_color_g, results2[i].car_color_b, results2[i].car_color_r, results2[i].car_color_g, results2[i].car_color_b);
                  struct.person_sys[player.id].person_car[i].numberPlate = "LSFIVEM";
                  struct.person_sys[player.id].person_car[i].owner = player.name;
                  struct.person_sys[player.id].person_car[i].selectid = i;
                } else {
                  if(struct.person_sys[player.id].person_car[i]) {
                    struct.person_sys[player.id].person_car[i].destroy();
                  }
                }
              }
            } else {
              if(struct.person_sys[player.id].person_summon_cars == 0) {
              struct.person_sys[player.id].person_car[0] = mp.vehicles.new(mp.joaat(results2[0].car_name), new mp.Vector3(parseFloat(max_car_pos[0].x), parseFloat(max_car_pos[0].y), parseFloat(max_car_pos[0].z)),
              {
                  heading: max_car_pos[0].r,
                  alpha: 255,
                  locked: false,
                  engine: false,
                  dimension: 0
              });
              struct.person_sys[player.id].person_car[0].setColorRGB(results2[0].car_color_r, results2[0].car_color_g, results2[0].car_color_b, results2[0].car_color_r, results2[0].car_color_g, results2[0].car_color_b);
              struct.person_sys[player.id].person_car[0].numberPlate = "LSFIVEM";
              struct.person_sys[player.id].person_car[0].owner = player.name;
              struct.person_sys[player.id].person_car[0].selectid = 0;
              } else {
                struct.person_sys[player.id].person_car[0].destroy();
              }
            }
            if(struct.person_sys[player.id].person_summon_cars == 0) {
              struct.person_sys[player.id].person_summon_cars = 1;
              chat.local(player, 'FFFFFF', `Автомобили заспавнены!`);
            } else {
              struct.person_sys[player.id].person_summon_cars = 0;
              chat.local(player, 'FFFFFF', `Автомобили были все удалены, напишите еще раз команду!`);
            }
          } else {
            chat.local(player, 'FF8282', 'У данного дома отсутствует позиция Spawn. Свяжитесь с разработчиком.');
          }
        } else {
          chat.local(player, 'FF8282', 'У вас нет ни одной машины!');
        }
      });
    } else {
      chat.local(player, 'FF8282', 'Вы не имеете своего дома!');
    }
  });
});

mp.events.addCommand('exit', (player) => {
  if(struct.person_sys[player.id].enter_house >= 0) {
    mysql.connection.query('SELECT * FROM houses WHERE id = ?', [struct.person_sys[player.id].enter_house], function (error, results, fields) {
      player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
      player.dimension = 0;
      struct.person_sys[player.id].enter_limit = 1;
      struct.person_sys[player.id].enter_house = -1;
      chat.local(player, 'F4DF42', 'Вы покинули жилище!');
    });
  } else if(struct.person_sys[player.id].enter_garage >= 0) {
    mysql.connection.query('SELECT * FROM houses WHERE id = ?', [struct.person_sys[player.id].enter_garage], function (error, results, fields) {
      player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
      player.dimension = 0;
      struct.person_sys[player.id].enter_limit = 1;
      struct.person_sys[player.id].enter_garage = -1;
      chat.local(player, 'F4DF42', 'Вы покинули гараж!');
    });
  } else {
    chat.local(player, 'FF8282', 'Вы не находитесь в каком-либо доме!');
  }
});

mp.events.addCommand('lock', (player) => {
  let result = 0;
  mp.vehicles.forEach(_vehicle => {
    if(_vehicle == struct.person_sys[player.id].person_car[struct.person_sys[player.id].person_car_active]) {
      if(_vehicle.locked == false) {
        _vehicle.locked = true;
        chat.local(player, 'F4DF42', 'Вы закрыли свой транспорт');
      } else {
        _vehicle.locked = false;
        chat.local(player, 'F4DF42', 'Вы открыли свой транспорт');
      }
      result++;
    }
  });
  if(result == 0) {
    chat.local(player, 'FF8282', 'Вы не вызвали ни один свой автомобиль');
  }
});

mp.events.addCommand('call', (player) => {
  player.call('callerMenu', [0]);
  player.call("gameChat", [1]);
});

mp.events.addCommand('ad', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1 != "") {
    if(struct.person_data[player.id].g_money >= 250) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      message = systems.deletespacesmessages(message);
      struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - 250;
      mysql.connection.query('INSERT INTO ads SET author = ?, message = ?, date = ?', [player.name, message, configure.date], function (err, results) {
        console.log(err);
      });
      chat.local(player, '41C4F4', 'Ваше объявление будет проверено редактором в ближайшее время!');
      systems.putgiveorganizations(3, 1, 250);
      systems.updateData(player, struct);
    } else {
      chat.local(player, 'FF8282', "У вас недостаточно средств для аренды транспорта");
    }
  } else {
    chat.local(player, 'FF8282', 'Сообщение отсутствует. Попробуйте вновь.');
  }
});

/*
mp.events.addCommand('supports', (player) => {
  let counter_supports = 0;
  chat.local(player, 'FFFFFF', `Список поддержки онлайн:`);
  mp.players.forEach(_player => {
    if(struct.person_data[_player.id].s_group == 1) {
      chat.local(player, 'FFFFFF', `${_player.name} [${_player.id}]`);
      counter_supports++;
    }
  });
  chat.local(player, 'FFFFFF', `Всего в сети: ${counter_supports}`);
});
*/

mp.events.addCommand('admins', (player) => {
  let counter_admins = 0;
  chat.local(player, 'FFFFFF', `Список администрации онлайн:`);
  mp.players.forEach(_player => {
    if(struct.person_sys[_player.id].admin_alogin_auth == 1) {
      chat.local(player, 'FFFFFF', `${_player.name} [${_player.id}] [${struct.person_sys[_player.id].admin_alogin_level} lvl]`);
      counter_admins++;
    }
  });
  chat.local(player, 'FFFFFF', `Всего в сети: ${counter_admins}`);
});

/* Команды во время какой-либо работы */

mp.events.addCommand('w', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_job == 1 || struct.person_data[player.id].g_job == 2) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    chat.workjob(player, 'F44295', `[W] ${player.name}[${player.id}]: ${message}`);
    chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} что-то сообщает по телеграмму.`);
  }
});

/* Команды фракций и банд */

mp.events.addCommand('invite', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 19 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
        if(distance <= 5) {
          if(struct.person_data[getPlayer.id].g_fraction <= 0 || struct.person_data[getPlayer.id].g_gang <= 0) {
            let fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
            let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            chat.local(player, '49D4ED', `Вы пригласили ${getPlayer.name} во фракцию ${fraction_name}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} пригласил Вас во фракцию ${fraction_name}`);
            struct.person_data[getPlayer.id].g_fraction = struct.person_data[player.id].g_fraction;
            struct.person_data[getPlayer.id].g_fraction_rang = 1;
            struct.person_data[getPlayer.id].g_job = 0;
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', "Данный игрок уже состоит во фракции или же банде.");
          }
        } else {
          chat.local(player, 'FF8282', 'Данный игрок находиться слишком далеко!');
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
        if(distance <= 5) {
          if(struct.person_data[getPlayer.id].g_fraction <= 0 || struct.person_data[getPlayer.id].g_gang <= 0) {
            let fraction_name = gang.get_name(struct.person_data[player.id].g_gang);
            let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
            chat.local(player, '49D4ED', `Вы пригласили ${getPlayer.name} в банду ${fraction_name}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} пригласил Вас в банду ${fraction_name}`);
            struct.person_data[getPlayer.id].g_gang = struct.person_data[player.id].g_gang;
            struct.person_data[getPlayer.id].g_gang_rang = 1;
            struct.person_data[getPlayer.id].g_job = 0;
            systems.gangclothes(getPlayer, struct.person_data[getPlayer.id].g_sex, struct.person_data[getPlayer.id].g_gang);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
          }
        } else {
          chat.local(player, 'FF8282', 'Данный игрок находиться слишком далеко!');
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('uninvite', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 19 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_fraction == struct.person_data[player.id].g_fraction) {
          let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
          let fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из фракции ${fraction_name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} выгнал Вас из фракции ${fraction_name}`);
          struct.person_data[getPlayer.id].g_fraction = 0;
          struct.person_data[getPlayer.id].g_fraction_rang = 0;
          systems.updateData(getPlayer, struct);
          systems.loadCharacter(getPlayer);
          getPlayer.removeAllWeapons();
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_gang == struct.person_data[player.id].g_gang) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          let fraction_name = gang.get_name(struct.person_data[player.id].g_gang);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из банды ${fraction_name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} выгнал Вас из банды ${fraction_name}`);
          struct.person_data[getPlayer.id].g_gang = 0;
          struct.person_data[getPlayer.id].g_gang_rang = 0;
          systems.updateData(getPlayer, struct);
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('giverang', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 24 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_fraction == struct.person_data[player.id].g_fraction) {
          if(struct.person_data[getPlayer.id].g_fraction_rang < struct.person_data[player.id].g_fraction_rang-1) {
            struct.person_data[getPlayer.id].g_fraction_rang = struct.person_data[getPlayer.id].g_fraction_rang + 1;
            let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            let to_rang = fraction.get_rang(struct.person_data[getPlayer.id].g_fraction, struct.person_data[getPlayer.id].g_fraction_rang);
            chat.local(player, '49D4ED', `Вы повысили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} взвел вас в новое звание ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Ошибка! Достигнут предел для вашего звания!');
          }
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_gang == struct.person_data[player.id].g_gang) {
          if(struct.person_data[getPlayer.id].g_gang_rang < struct.person_data[player.id].g_gang_rang-1) {
            struct.person_data[getPlayer.id].g_gang_rang = struct.person_data[getPlayer.id].g_gang_rang + 1;
            let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
            let to_rang = gang.get_rang(struct.person_data[getPlayer.id].g_gang, struct.person_data[getPlayer.id].g_gang_rang);
            chat.local(player, '49D4ED', `Вы взвели ${getPlayer.name} в новый авторитет ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} взвел вас в новый авторитет ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Ошибка! Достигнут предел для вашего звания!');
          }
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('unrang', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 24 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_fraction_rang != struct.person_data[player.id].g_fraction_rang) {
          if(struct.person_data[getPlayer.id].g_fraction_rang != 1) {
            struct.person_data[getPlayer.id].g_fraction_rang = struct.person_data[getPlayer.id].g_fraction_rang - 1;
            let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            let to_rang = fraction.get_rang(struct.person_data[getPlayer.id].g_fraction, struct.person_data[getPlayer.id].g_fraction_rang);
            chat.local(player, '49D4ED', `Вы понизили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} понизил вас в звании до ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Игрок имеет уже 1 ранг, понизить ниже нельзя. Используйте другую команду.');
          }
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Достигнут предел по отношению к вашему званию!');
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        if(struct.person_data[getPlayer.id].g_rang != struct.person_data[player.id].g_rang) {
          if(struct.person_data[getPlayer.id].g_gang_rang != 1) {
            struct.person_data[getPlayer.id].g_gang_rang = struct.person_data[getPlayer.id].g_gang_rang - 1;
            let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
            let to_rang = gang.get_rang(struct.person_data[getPlayer.id].g_gang, struct.person_data[getPlayer.id].g_gang_rang);
            chat.local(player, '49D4ED', `Вы понизили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} понизил вас в звании до ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Игрок имеет уже 1 ранг, понизить ниже нельзя. Используйте другую команду.');
          }
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Достигнут предел по отношению к вашему званию!');
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('gov', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 25 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 12) {
    if(struct.person_sys[player.id].fraction_ready == 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      chat.government(player, '3783FC', '--------===[ ГОСУДАРСТВЕННАЯ ВОЛНА ]===-------');
      chat.government(player, 'FFFFFF', `[${fraction_name}] ${rang} ${player.name}[${player.id}]: ${message}`);
      chat.government(player, '3783FC', '=========================================');
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} сообщает на государственную волну.`);
    } else {
      chat.local(player, 'FF8282', 'Необходимо быть на службе.');
    }
  }
});

mp.events.addCommand('f', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_gang >= 1 || struct.person_data[player.id].g_fraction == 3) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    let rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
    chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}]: ${message}`);
    chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} отправляет сообщение по телеграмму.`);
  }
});

mp.events.addCommand('fb', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_gang >= 1 || struct.person_data[player.id].g_fraction == 3) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    let rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
    chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}]: (( ${message} ))`);
  }
});

mp.events.addCommand('d', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_fraction == 1 || struct.person_data[player.id].g_fraction == 2) {
    if(struct.person_sys[player.id].fraction_ready == 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      chat.department(player, 'FF517A', `${fraction_name} ${rang} ${player.name}[${player.id}]: ${message}`);
      chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} что-то сообщает по волне департамента.`);
    } else {
      chat.local(player, 'FF8282', 'Необходимо быть на службе.');
    }
  }
});

mp.events.addCommand('r', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_fraction == 1 || struct.person_data[player.id].g_fraction == 2) {
    if(struct.person_sys[player.id].fraction_ready == 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      chat.fraction(player, '95BCF9', `${rang} ${player.name}[${player.id}]: ${message}`);
      chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} что-то сообщает по рации.`);
    } else {
      chat.local(player, 'FF8282', 'Необходимо быть на службе.');
    }
  }
});

mp.events.addCommand('rb', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_fraction == 1 || struct.person_data[player.id].g_fraction == 2) {
    if(struct.person_sys[player.id].fraction_ready == 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      chat.fraction(player, '95BCF9', `${rang} ${player.name}[${player.id}]: (( ${message} ))`);
    } else {
      chat.local(player, 'FF8282', 'Необходимо быть на службе.');
    }
  }
});

mp.events.addCommand('members', (player) => {
  let counter_members = 0;
  if(struct.person_data[player.id].g_fraction >= 1) {
    chat.local(player, 'FFFFFF', `Список членов организации онлайн:`);
    mp.players.forEach(_player => {
      if(struct.person_data[_player.id].g_fraction == struct.person_data[player.id].g_fraction) {
        let rang = fraction.get_rang(struct.person_data[_player.id].g_fraction, struct.person_data[_player.id].g_fraction_rang);
        chat.local(player, 'FFFFFF', `${_player.name} [${_player.id}] [${rang}]`);
        counter_members++;
        }
      });
    chat.local(player, 'FFFFFF', `Всего в сети: ${counter_members}`);
  } else if(struct.person_data[player.id].g_gang >= 1) {
    chat.local(player, 'FFFFFF', `Список членов банды онлайн:`);
    mp.players.forEach(_player => {
      if(struct.person_data[_player.id].g_gang == struct.person_data[player.id].g_gang) {
        let rang = gang.get_rang(struct.person_data[_player.id].g_gang, struct.person_data[_player.id].g_gang_rang);
        chat.local(player, 'FFFFFF', `${_player.name} [${_player.id}] [${rang}]`);
        counter_members++;
      }
    });
    chat.local(player, 'FFFFFF', `Всего в сети: ${counter_members}`);
  }
});

mp.events.addCommand('switch', (player, _, id, clothesid) => {
  if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 24 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      if(struct.person_data[getPlayer.id].g_fraction == 1 && parseInt(clothesid) >= 0 && parseInt(clothesid) <= 7 && struct.person_data[getPlayer.id].g_sex == 0) {
        struct.person_data[getPlayer.id].g_fraction_clothes = parseInt(clothesid);
        chat.fraction(player, 'F4D742', `${rang} ${player.name}[${player.id}] выдал комплект #${clothesid}, сотруднику ${getPlayer.name}`);
      } else if(struct.person_data[getPlayer.id].g_fraction == 2 && parseInt(clothesid) >= 0 && parseInt(clothesid) <= 6 && struct.person_data[getPlayer.id].g_sex == 0) {
        struct.person_data[getPlayer.id].g_fraction_clothes = parseInt(clothesid);
        chat.fraction(player, 'F4D742', `${rang} ${player.name}[${player.id}] выдал комплект #${clothesid}, сотруднику ${getPlayer.name}`);
      } else {
        chat.local(player, 'FF8282', 'Ошибка в установке одежды! Либо такая одежда не найдена, либо запрещена для вашей фракции!');
      }
    }
  }
});

mp.events.addCommand('makegun', (player, _, weaponName) => {
  if(struct.person_data[player.id].g_gang >= 1) {
    let make_gun_name, weapon_gun_ammo, make_gun_req_mats;
    weaponName.toLowerCase();
    if(weaponName == "colt") {
      make_gun_name = "weapon_pistol";
      weapon_gun_ammo = 24;
      make_gun_req_mats = 15;
    } else if(weaponName == "revolver") {
      make_gun_name = "weapon_revolver";
      weapon_gun_ammo = 6;
      make_gun_req_mats = 20;
    } else if(weaponName == "minismg") {
      make_gun_name = "weapon_minismg";
      weapon_gun_ammo = 20;
      make_gun_req_mats = 30;
    } else if(weaponName == "microsmg") {
      make_gun_name = "weapon_microsmg";
      weapon_gun_ammo = 20;
      make_gun_req_mats = 30;
    } else if(weaponName == "ak47") {
      make_gun_name = "weapon_assaultrifle";
      weapon_gun_ammo = 30;
      make_gun_req_mats = 45;
    } else {
      make_gun_name = "NONE";
    }
    if(make_gun_name != "NONE") {
      if(struct.person_data[player.id].g_materials >= make_gun_req_mats) {
        struct.person_data[player.id].g_materials = struct.person_data[player.id].g_materials - make_gun_req_mats;
        player.giveWeapon(mp.joaat(`${make_gun_name}`), parseInt(weapon_gun_ammo));
        chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} скрафтил себе оружие из материалов.`);
      } else {
        chat.local(player, 'FF8282', 'У вас недостаточно метериалов для крафта данного оружия.');
      }
    } else {
      chat.local(player, 'FF8282', 'Вы указали неизвестное для крафта оружие.');
    }
  }
});

mp.events.addCommand('sellgun', (player, _, id, weaponName, pay) => {
  if(struct.person_data[player.id].g_gang >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer && getPlayer != player) {
      let make_gun_name, weapon_gun_ammo, make_gun_req_mats;
      weaponName.toLowerCase();
      if(weaponName == "colt") {
        make_gun_name = "weapon_pistol";
        weapon_gun_ammo = 24;
        make_gun_req_mats = 15;
      } else if(weaponName == "revolver") {
        make_gun_name = "weapon_revolver";
        weapon_gun_ammo = 6;
        make_gun_req_mats = 20;
      } else if(weaponName == "minismg") {
        make_gun_name = "weapon_minismg";
        weapon_gun_ammo = 20;
        make_gun_req_mats = 30;
      } else if(weaponName == "microsmg") {
        make_gun_name = "weapon_microsmg";
        weapon_gun_ammo = 20;
        make_gun_req_mats = 30;
      } else if(weaponName == "ak47") {
        make_gun_name = "weapon_assaultrifle";
        weapon_gun_ammo = 30;
        make_gun_req_mats = 45;
      } else {
        make_gun_name = "NONE";
      }
      if(make_gun_name != "NONE") {
        if(parseInt(pay) >= 1 && parseInt(pay) <= 5000) {
          if(struct.person_data[player.id].g_materials >= make_gun_req_mats) {
            chat.local(player, 'FF8282', `${player.name} собирается продать вам ${weaponName}. Если Вы согласны, введите команду (( /accept gun ))`);
            //struct.person_data[player.id].g_materials = struct.person_data[player.id].g_materials - make_gun_req_mats;
            //getPlayer.giveWeapon(mp.joaat(`${make_gun_name}`), parseInt(weapon_gun_ammo));
            //chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} скрафтил оружие из материалов и передал его ${getPlayer.name}.`);
          } else {
            chat.local(player, 'FF8282', 'У вас недостаточно метериалов для крафта данного оружия.');
          }
        } else {
          chat.local(player, 'FF8282', 'Сумма должна быть не быть меньше одного и больше пяти тысяч.');
        }
      } else {
        chat.local(player, 'FF8282', 'Вы указали неизвестное для крафта оружие.');
      }
    }
  }
});

mp.events.addCommand('usedrugs', (player, _, gramm) => {
  if(parseInt(gramm) <= 5 && parseInt(gramm) != 0) {
    if(struct.person_data[player.id].g_drugs >= parseInt(gramm)) {
      let kaif = 0;
      if(parseInt(gramm) == 1) {
        kaif = 0.2;
      } else if(parseInt(gramm) == 2) {
        kaif = 0.4;
      } else if(parseInt(gramm) == 3) {
        kaif = 0.6;
      } else if(parseInt(gramm) == 4) {
        kaif = 0.8;
      } else if(parseInt(gramm) == 5) {
        kaif = 0.9;
      }
      player.call('shakeDrugs', [kaif]);
      struct.person_data[player.id].g_drugs = struct.person_data[player.id].g_drugs - parseInt(gramm);
      let sethp_new = parseInt(gramm) * 20;
      player.health = player.health + sethp_new;
      chat.local(player, 'FFFFFF', `Вы пополнили свое здоровье на ${sethp_new}`);
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} употребил наркотик.`);
      systems.updateData(player, struct);
    } else {
      chat.local(player, 'FF8282', 'У вас недостаточно наркотиков для данной дозировки.');
    }
  } else {
    chat.local(player, 'FF8282', 'Нельзя употребить больше пяти грамм.');
  }
});

mp.events.addCommand('capture', (player) => {
  if(struct.person_data[player.id].g_gang >= 1) {
    if(struct.person_data[player.id].g_gang_rang >= 4) {
      if(configure.gangzones[struct.person_sys[player.id].enter_gangzone].owner != struct.person_data[player.id].g_gang) {
        if(configure.gangzonestatusnow == 0) {
          if(struct.person_sys[player.id].enter_gangzone != 0) {
            if(configure.gangzonescapturehour == 0) {
              configure.gangzonestatustimer = 0;
              configure.gangzonestatustimer_min = 0;
              configure.gangzonestatustimer_sec = 0;
              configure.gangzonestatusnowid = parseInt(struct.person_sys[player.id].enter_gangzone);
              mp.players.forEach(_player => {
                if(struct.person_data[player.id].g_gang >= 1) {
                  _player.call('captureGangStart', [struct.person_sys[_player.id].storage_blip[parseInt(struct.person_sys[player.id].enter_gangzone)], 0, 0, configure.gangzonestatustimer]);
                  struct.person_sys[_player.id].enter_gangzone_war = 1;
                  configure.gangzonestatuswar = configure.gangzonecolshapes[parseInt(struct.person_sys[player.id].enter_gangzone)];
                  if(struct.person_data[player.id].g_gang == 1) {
                    chat.local(_player, '00FF2E', `The Grove Street Gang объявили войну за территорию. Оппозиция The Ballas Gang`);
                  } else if(struct.person_data[_player.id].g_gang == 2) {
                    chat.local(_player, 'E500FF', `The Ballas Gang объявили войну за территорию. Оппозиция The Grove Street Gang`);
                  }
                }
              });
              configure.gangzonestatusnow = 1;
              configure.gangzonescapturehour = 1;
              } else {
              chat.local(player, 'FF8282', 'В этом часу уже состоялась битва!');
              }
            } else {
            chat.local(player, 'FF8282', 'Вы не находитесь ни на одной территории!');
            }
          } else {
          chat.local(player, 'FF8282', 'Уже идет битва за территорию, попробуйте позднее!');
          }
        } else {
          chat.local(player, 'FF8282', 'Эта территория уже принадлежит вашей банде!');
        }
      } else {
        chat.local(player, 'FF8282', 'Объявить войну может заместитель или же лидер!');
      }
    }
});

mp.events.addCommand('warehouse', (player, _, clothesid) => {
  if(struct.person_data[player.id].g_fraction >= 1 || struct.person_data[player.id].g_gang >= 1) {
    chat.local(player, '169EAB', '--------===[ ДАННЫЕ ОРГАНИЗАЦИИ ]===-------');
    if(struct.person_data[player.id].g_fraction == 1 || struct.person_data[player.id].g_fraction == 2) {
      chat.local(player, 'FFFFFF', `На складе оружия: ${configure.warehouses[struct.person_data[player.id].g_fraction].materials} шт.`);
    } else if(struct.person_data[player.id].g_gang == 1 || struct.person_data[player.id].g_gang == 2) {
      chat.local(player, 'FFFFFF', `На складе материалов: ${configure.warehouses[struct.person_data[player.id].g_gang+3].materials} шт.`);
    }
    if(struct.person_data[player.id].g_fraction == 1 || struct.person_data[player.id].g_fraction == 2 || struct.person_data[player.id].g_fraction == 3) {
      chat.local(player, 'FFFFFF', `На счету организации: ${configure.warehouses[struct.person_data[player.id].g_fraction].bank}$`);
    } else if(struct.person_data[player.id].g_gang == 1 || struct.person_data[player.id].g_gang == 2) {
      chat.local(player, 'FFFFFF', `На счету банды: ${configure.warehouses[struct.person_data[player.id].g_gang+3].bank}$`);
    }
    chat.local(player, '169EAB', '======================================');
  }
});

mp.events.addCommand('get', (player, _, name) => {
  if(name == "materials" || name == "mats") {
    let get_dist_grove = mp.Vector3.Distance2D(new mp.Vector3(parseFloat(1058.040771484375), parseFloat(-3195.215087890625), parseFloat(-39.16131591796875)), player.position);
    let get_dist_ballas = mp.Vector3.Distance2D(new mp.Vector3(parseFloat(116.97295379638672), parseFloat(-1285.0384521484375), parseFloat(28.270048141479492)), player.position);
    if(struct.person_data[player.id].g_gang == 1 && parseInt(get_dist_grove) <= 30 || struct.person_data[player.id].g_gang == 2 && parseInt(get_dist_ballas) <= 30) {
      if(configure.warehouses[struct.person_data[player.id].g_gang+3].materials >= 45) {
        if(struct.person_data[player.id].g_gang == 1 && configure.warelock_grove == 0 || struct.person_data[player.id].g_gang == 2 && configure.warelock_ballas == 0) {
          struct.person_data[player.id].g_materials = struct.person_data[player.id].g_materials + 50;
          systems.updateData(player, struct);
          systems.putgiveorganizations(struct.person_data[player.id].g_gang+3, 3, 50);
          chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} взял несколько материалов со склада.`);
        } else {
          chat.local(player, 'FF8282', 'Склад закрыт');
        }
      } else {
        chat.local(player, 'FF8282', 'На складе недостаточно материалов');
      }
    } else {
      chat.local(player, 'FF8282', 'Вы находитесь слишком далеко от своего склада');
    }
  }
});

mp.events.addCommand('put', (player, _, name, count) => {
  if(name == "materials" || name == "mats") {
    let get_dist_grove = mp.Vector3.Distance2D(new mp.Vector3(parseFloat(1058.040771484375), parseFloat(-3195.215087890625), parseFloat(-39.16131591796875)), player.position);
    let get_dist_ballas = mp.Vector3.Distance2D(new mp.Vector3(parseFloat(116.97295379638672), parseFloat(-1285.0384521484375), parseFloat(28.270048141479492)), player.position);
    if(struct.person_data[player.id].g_gang == 1 && parseInt(get_dist_grove) <= 30 || struct.person_data[player.id].g_gang == 2 && parseInt(get_dist_ballas) <= 30) {
      if(struct.person_data[player.id].g_materials >= parseInt(count)) {
        struct.person_data[player.id].g_materials = struct.person_data[player.id].g_materials - parseInt(count);
        systems.updateData(player, struct);
        systems.putgiveorganizations(struct.person_data[player.id].g_gang+3, 0, parseInt(count));
        chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} положил несколько материалов на склад.`);
      } else {
        chat.local(player, 'FF8282', 'У вас недостаточно материалов');
      }
    } else {
      chat.local(player, 'FF8282', 'Вы находитесь слишком далеко от своего склада');
    }
  }
});

mp.events.addCommand('warelock', (player, _, name, count) => {
  if(struct.person_data[player.id].g_gang >= 1 && struct.person_data[player.id].g_gang_rang >= 4) {
    if(struct.person_data[player.id].g_gang == 1) {
      let rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
      if(configure.warelock_grove == 0) {
        configure.warelock_grove = 1;
        chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}] закрыл склад с материалами.`);
      } else {
        configure.warelock_grove = 0;
        chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}] открыл склад с материалами.`);
      }
    } else if(struct.person_data[player.id].g_gang == 2) {
      if(configure.warelock_ballas == 0) {
        configure.warelock_ballas = 1;
        chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}] закрыл склад с материалами.`);
      } else {
        configure.warelock_ballas = 0;
        chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}] открыл склад с материалами.`);
      }
    }
  }
});

mp.events.addCommand('play', (player, _, name, count) => {
  player.call('webPlayer', [0]);
});

/* NEWS */
mp.events.addCommand('npanel', (player) => {
  if(struct.person_data[player.id].g_fraction == 3) {
    player.call('nMenu', [0]);
  }
});

  /* LSPD */

mp.events.addCommand('mdc', (player) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    player.call('showMDC', 1);
  }
});

mp.events.addCommand('m', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_data[player.id].g_fraction == 2) {
    if(player.vehicle) {
      console.log(player.vehicle.model);
      if(player.vehicle.model == 2046537925 || player.vehicle.model == 2321795001 || player.vehicle.model == 2667966721) {
        let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
        let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
        chat.broadcastinrange(player, 3, player.position, 15, 'F4E842', `${me_rang} ${player.name}[${player.id}] сообщает: ${message}`);
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Необходимо быть в служебном транспорте!');
      }
    } else {
    }
  }
});

mp.events.addCommand('cuff', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.id);
        if(distance <= 5) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          chat.local(player, '49D4ED', `Вы одели наручники на ${getPlayer.name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} одел на Вас наручники для вашего же блага`);
          getPlayer.call("freezePlayer", [1]);
          chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} одел наручники на ${getPlayer.name}.`);
        } else {
          chat.local(player, 'FF8282', 'Игрок далеко');
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('uncuff', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(getPlayer != player) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.id);
        if(distance <= 5) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          chat.local(player, '49D4ED', `Вы сняли наручники с ${getPlayer.name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} снял с Вас наручники`);
          getPlayer.call("freezePlayer", [0]);
          chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} снял наручники с ${getPlayer.name}.`);
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('su', (player, _, id, reason1, reason2 = "", reason3 = "") => {
  if(struct.person_data[player.id].g_fraction == 2) {
    if(id && reason1) {
      if(struct.person_sys[player.id].fraction_ready == 1) {
        let getPlayer = mp.players.at(parseInt(id));
        if(getPlayer) {
          if(struct.person_data[getPlayer.id].g_wanted <= 4) {
            let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            let reason = reason1 + reason2 + reason3;
            struct.person_data[getPlayer.id].g_wanted = struct.person_data[getPlayer.id].g_wanted + 1;
            var query = mysql.connection.query('INSERT INTO `suspects` SET `officer` = ?, `suspect` = ?, `reason` = ?, `wanted` = ?', [player.name, getPlayer.name, reason, struct.person_data[getPlayer.id].g_wanted], function (error, results, fields) {

            });
            getPlayer.call('setWantedLevel', [struct.person_data[getPlayer.id].g_wanted]);
            chat.fraction(player, 'F4D742', `${rang} ${player.name}[${player.id}] объявил в розыск ${getPlayer.name}. Статья: ${reason}`);
            chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} зашел в базу данных полиции.`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Уже максимальный розыск');
          }
        }
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Одно из важных полей незаполнено');
    }
  }
});

mp.events.addCommand('clear', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(struct.person_sys[player.id].fraction_ready == 1) {
        let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
        struct.person_data[getPlayer.id].g_wanted = 0;
        var query = mysql.connection.query('DELETE FROM suspects WHERE suspect = ?', [getPlayer.name], function (error, results, fields) {

        });
        getPlayer.call('setWantedLevel', [0]);
        chat.fraction(player, 'F4D742', `${rang} ${player.name}[${player.id}] снял розыск с ${getPlayer.name}`);
        chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} зашел в базу данных полиции.`);
        systems.updateData(getPlayer, struct);
      }
    }
  }
});

mp.events.addCommand('frisk', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(struct.person_sys[player.id].fraction_ready == 1) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.id);
        if(distance <= 5) {
          chat.local(player, 'FFFFFF', `Наркотиков: ${struct.person_data[getPlayer.id].g_drugs}; Материалов: ${struct.person_data[getPlayer.id].g_materials};`);
          chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} обыскал ${getPlayer.name}.`);
          systems.updateData(getPlayer, struct);
        } else {
          chat.local(player, 'FF8282', 'Игрок далеко');
        }
      }
    }
  }
});

mp.events.addCommand('take', (player, _, id) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(struct.person_sys[player.id].fraction_ready == 1) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.id);
        if(distance <= 5) {
          struct.person_data[getPlayer.id].g_drugs = 0;
          struct.person_data[getPlayer.id].g_materials = 0;
          getPlayer.removeWeapon();
          chat.broadcastinrange(player, 3, player.position, 15, 'E894DB', `${player.name} забрал запрещенные предметы ${getPlayer.name}.`);
          systems.updateData(getPlayer, struct);
        } else {
          chat.local(player, 'FF8282', 'Игрок далеко');
        }
      }
    }
  }
});

mp.events.addCommand('arrest', (player, _, camera) => {
  if(struct.person_data[player.id].g_fraction == 2) {
    if(struct.person_sys[player.id].fraction_ready == 1 && parseInt(camera) != 0) {
      let distance = mp.Vector3.Distance2D(player.position, new mp.Vector3(parseFloat(463.635498046875), parseFloat(-997.509521484375), parseFloat(24.914867401123047)));
      let camera_pos = "";
      if(distance <= 10) {
        if(parseInt(camera) == 1) {
          camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-994.399169921875), parseFloat(24.914871215820312));
        } else if(parseInt(camera) == 2) {
          camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-997.814208984375), parseFloat(24.914871215820312));
        } else if(parseInt(camera) == 3) {
          camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-1001.42724609375), parseFloat(24.914871215820312));
        } else {
          camera_pos = new mp.Vector3(parseFloat(460.3734130859375), parseFloat(-994.399169921875), parseFloat(24.914871215820312));
          camera = 1;
        }
        mp.players.forEach(_player => {
          let distance2 = mp.Vector3.Distance2D(player.position, _player.position);
          if(distance2 <= 2 && struct.person_data[_player.id].g_wanted >= 1) {
            let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            chat.fraction(player, 'F4D742', `${rang} ${player.name}[${player.id}] арестовал ${_player.name}`);
            chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} открыл дверь камеры и провел ${_player.name}.`);
            let jail_time_set = 900 * struct.person_data[_player.id].g_wanted;
            struct.person_data[_player.id].g_wanted = 0;
            struct.person_data[_player.id].g_jail = 1;
            struct.person_data[_player.id].g_jail_camera = parseInt(camera);
            struct.person_data[_player.id].g_jail_time = jail_time_set;
            _player.position = camera_pos;
            _player.heading = 270;
            _player.call('setWantedLevel', [0]);
            _player.call("freezePlayer", [0]);
            _player.removeWeapon();
            systems.updateData(_player, struct);
          }
        });
      }
    }
    /*
    [camera1]: X: 460.3734130859375; Y: -994.399169921875; Z: 24.914871215820312; [heading:271.10662841796875]
    [camera2]: X: 460.3734130859375; Y: -997.814208984375; Z: 24.914854049682617; [heading:270.963623046875]
    [camera3]: X: 460.3734130859375; Y: -1001.42724609375; Z: 24.91486930847168; [heading:267.86077880859375]
    */


  }
});

/* Команды администрации */

/* I уровень */

mp.events.addCommand('pm', (player, _, id, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1 || struct.person_data[player.id].s_group == 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(id) {
      if(getPlayer) {
        if(getPlayer != player) {
          let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
          chat.local(player, '169EAB', "Вы дали ответ " + getPlayer.name + "[" + getPlayer.id + "]" +": " + message);
          chat.local(getPlayer, '169EAB', player.name + "[" + player.id + "]" +" ответил вам: " + message);
          chat.admin(player, '169EAB', `${player.name}[${player.id}] дал ответ игроку ${getPlayer.name}[${getPlayer.id}]: ${message}`);
        } else {
          chat.local(player, 'FF8282', 'Нельзя отправить сообщение самому себе! Не круто!');
        }
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  }
});

mp.events.addCommand('a', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    chat.admin(player, 'FFE900', `<< ADM-CHAT >> ${player.name}[${player.id}]: ${message}`);
  }
});

mp.events.addCommand('ooc', (player, _, arr1, arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if(arr1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.oocadmin(player, `<< Администратор ${player.name}[${player.id}]: ${message} >>`);
    } else {
      chat.local(player, 'FFFFFF', " > [/ooc]: [сообщение]");
    }
  }
});

mp.events.addCommand('fixcar', (player) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if (player.vehicle) {
      player.vehicle.repair();
      chat.local(player, 'FFFFFF', "Вы починили машину");
    } else {
      chat.local(player, 'FF8282', 'Вы не в машине. Необходимо быть в ней!');
    }
  }
});

mp.events.addCommand('re', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(struct.person_sys[getPlayer.id].auth_status >= 1) {
        if(struct.person_sys[player.id].spec != 1) {
        let get_pos = getPlayer.position;
        let timer;
        function spec_now(getPlayerid, verif_name) {
          if(struct.person_data[getPlayerid].g_online == 1 && struct.person_data[getPlayerid].g_name == verif_name) {
            if(struct.person_sys[getPlayer.id].auth_status >= 1) {
              if(struct.person_sys[player.id].spec) {
                get_pos = getPlayer.position;
                player.position = new mp.Vector3(get_pos.x,get_pos.y,get_pos.z+4);
              } else {
                clearInterval(timer);
                timer = "";
              }
            } else {
              clearInterval(timer);
              timer = "";
            }
          } else {
            clearInterval(timer);
            timer = "";
          }
        }
        timer = setInterval(spec_now, 1000, getPlayer.id, getPlayer.name);
        player.alpha = 0;
        struct.person_sys[player.id].spec = 1;
        struct.person_sys[player.id].admin_save_pos_x = player.position.x;
        struct.person_sys[player.id].admin_save_pos_y = player.position.y;
        struct.person_sys[player.id].admin_save_pos_z = player.position.z+3;
        chat.local(player, 'FFFFFF', `Слежка начата`);
        chat.local(player, 'FFFFFF', `Данные игрока: [IP: ${getPlayer.ip}]`);
        player.call("freezePlayer", [1]);
        } else {
          chat.local(player, 'FF8282', 'Вы уже следите! Отключите слежку командой /reoff');
        }
      }  else {
        chat.local(player, 'FF8282', 'Данный игрок не авторизован!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('reoff', (player) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    struct.person_sys[player.id].spec = 0;
    chat.local(player, 'FFFFFF', `Останавливаем слежку`);
    player.call("freezePlayer", [0]);
    player.alpha = 255;
    player.position = new mp.Vector3(parseFloat(struct.person_sys[player.id].admin_save_pos_x), parseFloat(struct.person_sys[player.id].admin_save_pos_y), parseFloat(struct.person_sys[player.id].admin_save_pos_z));
  }
});

mp.events.addCommand('freeze', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(struct.person_sys[getPlayer.id].freeze == 0) {
        chat.local(player, '49D4ED', `Вы заморозили игрока ${getPlayer.name}`);
        chat.local(getPlayer, '49D4ED', `${player.name} заморозил Вас, ожидайте инструкций!`);
        struct.person_sys[getPlayer.id].freeze = 1;
        getPlayer.call("freezePlayer", [1]);
      } else {
        chat.local(player, '49D4ED', `Вы разморозили игрока ${getPlayer.name}`);
        chat.local(getPlayer, '49D4ED', `${player.name} разморозил Вас, приятной игры!`);
        struct.person_sys[getPlayer.id].freeze = 0;
        getPlayer.call("freezePlayer", [2]);
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('slap', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      chat.admin(player, '169EAB', `${player.name}[${player.id}] дал поджопник игроку ${getPlayer.name}[${getPlayer.id}]`);
      getPlayer.position = new mp.Vector3(parseFloat(getPlayer.position.x), parseFloat(getPlayer.position.y), parseFloat(getPlayer.position.z+5));
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('kick', (player, _, id, reason) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(reason) {
        if(struct.person_sys[getPlayer.id].auth_status >= 1) {
          let person_name = getPlayer.name;
          chat.sysadmin(player, `Администратор ${player.name} кикнул персонажа ${person_name}. Причина: ${reason}`);
          function kick_player() {
            getPlayer.kick();
          }
          setTimeout(kick_player, 100);
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Персонаж не залогинен!');
        }
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Укажите причину кика!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('warn', (player, _, id, reason) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(reason) {
        if(struct.person_sys[getPlayer.id].auth_status >= 1) {
          let person_name = getPlayer.name;
          if(struct.person_data[getPlayer.id].warns == 2) {
            chat.sysadmin(player, `Администратор ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
            struct.person_data[getPlayer.id].g_warns = struct.person_data[getPlayer.id].g_warns + 1;
            struct.person_data[getPlayer.id].status = 1;
            function kick_player() {
              getPlayer.kick();
            }
            setTimeout(kick_player, 100);
          } else {
            chat.sysadmin(player, `Администратор ${player.name} выдал варн персонажу ${person_name}. Причина: ${reason}`);
            struct.person_data[getPlayer.id].g_warns = struct.person_data[getPlayer.id].g_warns + 1;
            function kick_player() {
              getPlayer.kick();
            }
            setTimeout(kick_player, 100);
          }
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Персонаж не залогинен!');
        }
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Укажите причину варна!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('goto', (player, _, playerID) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if (playerID && playerID.trim().length > 0) {
    let sourcePlayer = mp.players.at(parseInt(playerID));
    if (sourcePlayer) {
      player.position = sourcePlayer.position;
      player.dimension = sourcePlayer.dimension;
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else {
      chat.local(player, 'FFFFFF', " > [/goto]: [номер игрока]");
    }
  }
});

mp.events.addCommand('tpcor', (player, _, x, y ,z) => {
  if(struct.person_data[player.id].s_group >= 2) {
    if (parseFloat(x) && parseFloat(y) && parseFloat(z)) {
      player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
    } else {
      chat.local(player, 'FFFFFF', " > [/tpcor]: [x] [y] [z]");
    }
  }
});

mp.events.addCommand('tphouse', (player, _, houseid) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if (parseInt(houseid)) {
      mysql.connection.query('SELECT * FROM houses WHERE id = ?', [houseid], function (error, results, fields) {
        if(results[0]) {
          player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Выбранный вами дом, не найден!');
        }
      });
    } else {
      chat.local(player, 'FFFFFF', " > [/tphouse]: [houseid]");
    }
  }
});

mp.events.addCommand('tpbusiness', (player, _, businessid) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if (parseInt(businessid)) {
      mysql.connection.query('SELECT * FROM business WHERE id = ?', [businessid], function (error, results, fields) {
        if(results[0]) {
          player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Выбранный вами бизнес, не найден!');
        }
      });
    } else {
      chat.local(player, 'FFFFFF', " > [/tpbusiness]: [businesseid]");
    }
  }
});

mp.events.addCommand('tplist', (player, _, tpid) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    if(tpid == parseInt(1)) {
      player.position = new mp.Vector3(parseFloat(-241.57424926757812),parseFloat(-991.5530395507812),parseFloat(29.2882022857666));
      player.dimension = 0;
    } else if(tpid == parseInt(2)) {
      player.position = new mp.Vector3(parseFloat(160.35104370117188),parseFloat(-996.084716796875),parseFloat(29.354534149169922));
      player.dimension = 0;
    } else if(tpid == parseInt(3)) {
      player.position = new mp.Vector3(parseFloat(-1872.684326171875),parseFloat(-707.1394653320312),parseFloat(9.098420143127441));
      player.dimension = 0;
    } else if(tpid == parseInt(4)) {
      player.position = new mp.Vector3(parseFloat(172.40875244140625),parseFloat(7044.51708984375),parseFloat(1.382189154624939));
      player.dimension = 0;
    } else if(tpid == parseInt(5)) {
      player.position = new mp.Vector3(parseFloat(426.9664001464844),parseFloat(-978.3213500976562),parseFloat(30.709915161132812));
      player.dimension = 0;
    } else if(tpid == parseInt(5)) {
      player.position = new mp.Vector3(parseFloat(-1285.7744140625),parseFloat(2525.108642578125),parseFloat(19.783733367919922));
      player.dimension = 0;
    } else if(tpid == parseInt(6)) {
      player.position = new mp.Vector3(parseFloat(501.69091796875),parseFloat(5604.61767578125),parseFloat(797.9100341796875));
      player.dimension = 0;
    } else if(tpid == parseInt(7)) {
      player.position = new mp.Vector3(parseFloat(413.2132568359375),parseFloat(-997.9463500976562),parseFloat(-99));
      player.dimension = 0;
    } else if(tpid == parseInt(8)) {
      player.position = new mp.Vector3(parseFloat(-1285.6182861328125),parseFloat(2524.10400390625),parseFloat(19.84907341003418));
      player.dimension = 0;
    } else if(tpid == parseInt(9)) {
      player.position = new mp.Vector3(parseFloat(99.48639678955078),parseFloat(-1937.491455078125),parseFloat(20.803720474243164));
      player.dimension = 0;
    } else if(tpid == parseInt(10)) {
      player.position = new mp.Vector3(parseFloat(918.9596557617188),parseFloat(-182.6803741455078),parseFloat(74.02716827392578));
      player.dimension = 0;
    } else if(tpid == parseInt(11)) {
      player.position = new mp.Vector3(parseFloat(-197.21827697753906),parseFloat(-1495.889892578125),parseFloat(31.819419860839844));
      player.dimension = 0;
    } else if(tpid == parseInt(12)) {
      player.position = new mp.Vector3(parseFloat(140.25904846191406),parseFloat(-1307.90673828125),parseFloat(29.01184844970703));
      player.dimension = 0;
    } else if(tpid == parseInt(13)) {
      player.position = new mp.Vector3(parseFloat(432.19244384765625), parseFloat(-669.2177734375), parseFloat(29.135507583618164));
      player.dimension = 0;
    }
    else {
      player.outputChatBox('Неизвестная локация');
    }
  }
});


mp.events.addCommand('setclothes', (player, _, arr1, arr2, arr3) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    player.setClothes(parseInt(arr1), parseInt(arr2), parseInt(arr3), 0);
  }
});

mp.events.addCommand('setclothes2', (player, _, arr1, arr2, arr3) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    player.setClothes(0, parseInt(arr1), parseInt(arr2), parseInt(arr3));
  }
});

mp.events.addCommand('setprops', (player, _, arr1, arr2, arr3) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    player.setProp(parseInt(arr1), parseInt(arr2), parseInt(arr3));
  }
});

/* II */

mp.events.addCommand('ban', (player, _, id, reason) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(reason) {
        if(struct.person_sys[getPlayer.id].auth_status >= 1) {
          let person_name = getPlayer.name;
          chat.sysadmin(player, `Администратор ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
          struct.person_data[getPlayer.id].status = 1;
          function kick_player() {
            getPlayer.kick();
          }
          setTimeout(kick_player, 100);
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Персонаж не залогинен!');
        }
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Укажите причину варна!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('takegun', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 2) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(reason) {
        if(struct.person_sys[getPlayer.id].auth_status >= 1) {
          chat.local(player, '49D4ED', `Вы забрали оружие у ${getPlayer.name}`);
          chat.local(getPlayer, '49D4ED', `${player.name} отобрал у вас оружие, ожидайте инструкций!`);
          getPlayer.removeWeapon();
        } else {
          chat.local(player, 'FF8282', 'Ошибка! Персонаж не залогинен!');
        }
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Укажите причину варна!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('veh', (player, _, vehName) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 2) {
    if (vehName && vehName.trim().length > 0) {
      console.log(`${player.name} create vehicle is name ${vehName}`);
      let pos = player.position;
      pos.x += 2;
      configure.createvehicle_count++;
      configure.createvehicle[configure.createvehicle_count] = mp.vehicles.new(mp.joaat(vehName), pos,
      {
          heading: 0,
          alpha: 255,
          locked: false,
          engine: true,
          dimension: player.dimension
      });
      configure.createvehicle[configure.createvehicle_count].numberPlate = "[[ADMIN]";
    } else {
      chat.local(player, 'FFFFFF', " > [/veh]: [имя транспорта]");
    }
  }
});

mp.events.addCommand('destroyveh', (player, _,) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 2) {
    if(player.vehicle) {
      let adm_car_delete = 0;
      for(let i = 0; i <= configure.createvehicle_count; i++) {
        if(configure.createvehicle[i] == player.vehicle) {
          player.vehicle.destroy();
          chat.local(player, 'FFFFFF', "Машина уничтожена!");
          adm_car_delete++;
        }
      }
      if(adm_car_delete == 0) {
        chat.local(player, 'FF8282', 'Невозможно уничтожить данный транспорт');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Необходимо быть за рулем автомобиля!');
    }
  }
});

/* III */

mp.events.addCommand('banip', (player, _, ip) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    mysql.connection.query('SELECT * FROM `banip` WHERE `ip` = ?', [ip], function (error, results, fields) {
      if(!results[0]) {
        mysql.connection.query('INSERT INTO `banip` SET `ip` = ?, `date` = ?', [ip, configure.date], function (error2, results2, fields2) {
          chat.local(player, 'FFFFFF', `IP адрес ${ip} заблокирован для регистрации и авторизации!`);
        });
      } else {
        chat.local(player, 'FF8282', 'Этот IP адрес уже заблокирован');
      }
    });
  }
});

mp.events.addCommand('givegun', (player, _, id, weaponName, ammo) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      getPlayer.giveWeapon(mp.joaat(`${weaponName}`), parseInt(ammo));
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('sethp', (player, _, id, hp) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      getPlayer.health = parseInt(hp);
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('setarmour', (player, _, id, armour) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      getPlayer.armour = parseInt(armour);
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('gethere', (player, _, playerID) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
  if (playerID && playerID.trim().length > 0) {
    let sourcePlayer = mp.players.at(parseInt(playerID));
    if (sourcePlayer) {
      let playerPos = player.position;
      playerPos.x += 1;
      sourcePlayer.position = playerPos;
      chat.local(sourcePlayer, 'FFFFFF', "Вы были телепортированы администратором LSFIVEM");
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else {
      chat.local(player, 'FFFFFF', " > [/gethere]: [номер игрока]");
    }
  }
});

mp.events.addCommand('createobj', (player, _, model) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    let get_pos = player.position;
    let get_heading = player.heading;
    if(model && configure.staffobjects_count <= 998) {
      configure.staffobjects_count++;
      configure.staffobjects[configure.staffobjects_count] = mp.objects.new(mp.joaat(model), get_pos,
      {
          rotation: get_heading,
          alpha: 255,
          dimension: player.dimension
      });
      console.log(configure.staffobjects[configure.staffobjects_count].position);
      chat.local(player, 'FFFFFF', `Объект под номером ${configure.staffobjects_count} был создан!`);
      chat.local(player, 'FFFFFF', `Для выбора объекта, введите (( /selectobj номер_объекта ))`);
    } else {
    }
  }
});

mp.events.addCommand('selectobj', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    if(parseInt(id) != 0) {
      struct.person_sys[player.id].admin_sel_object_id = parseInt(id);
      chat.local(player, 'FFFFFF', `Объект под номером ${id} был выбран!`);
      chat.local(player, 'FFFFFF', `Для отключения редактирования, введите (( /selectobj 0 ))`);
      player.call('controlObject', [1]);
    } else {
      player.call('controlObject', [0]);
      chat.local(player, 'FFFFFF', `Редактирование было отключено. Для повторного использования (( /selectobj id ))`);
    }
  }
});

mp.events.addCommand('delobj', (player, _, num) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    if(num && configure.staffobjects[configure.staffobjects_count]) {
      configure.staffobjects[configure.staffobjects_count].destroy();
      chat.local(player, 'FFFFFF', `Объект под номером ${num} был уничтожен!`);
    } else {
    }
  }
});

/* IV */

mp.events.addCommand('uval', (player, _, id, reason) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      if(reason) {
        let get_fraction = struct.person_data[getPlayer.id].g_fraction;
        let get_gang = struct.person_data[getPlayer.id].g_gang;
        let get_fraction_name = "";
        let get_gang_name = "";
        let type_fg = 0;
        if(get_fraction >= 1) {
          type_fg = 1;
        } else if(get_gang >= 1) {
          type_fg = 2;
        } else {
          type_fg = 0;
        }
        if(type_fg == 1) {
          let fraction_name = fraction.get_name(struct.person_data[getPlayer.id].g_fraction);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из фракции ${fraction_name} по причине: ${reason}`);
          chat.local(getPlayer, '49D4ED', `${player.name} исключил вас из фракции ${fraction_name} по причине: ${reason}`);
          struct.person_data[getPlayer.id].g_fraction = 0;
          struct.person_data[getPlayer.id].g_fraction_rang = 0;
          systems.updateData(getPlayer, struct);
        } else if(type_fg == 2) {
          let gang_name = gang.get_name(struct.person_data[getPlayer.id].g_gang);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из банды ${gang_name} по причине: ${reason}`);
          chat.local(getPlayer, '49D4ED', `${player.name} исключил вас из банды ${gang_name} по причине: ${reason}`);
          struct.person_data[getPlayer.id].g_gang = 0;
          struct.person_data[getPlayer.id].g_gang_rang = 0;
          if(configure.gangzonestatusnow == 1) {
            player.call('captureGangStop', [struct.person_sys[_player.id].storage_blip[parseInt(configure.gangzonestatusnowid)], type_fg]);
          }
          systems.updateData(getPlayer, struct);
        } else {
          chat.local(player, 'FF8282', 'Игрок не состоит не в какой банде или же фракции!');
        }
        struct.person_sys[getPlayer.id].fraction_ready = 0;
        systems.loadCharacter(getPlayer);
        systems.spawnPosition(getPlayer);
        getPlayer.removeAllWeapons();
      } else {
        chat.local(player, 'FF8282', 'Ошибка! Укажите причину!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

mp.events.addCommand('makeleader', (player, _, id, fractionid) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 4) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      let option_rang = 1;
      let option_gang = 0;
      if(struct.person_sys[getPlayer.id].auth_status >= 1) {
        if(struct.person_data[getPlayer.id].g_fraction == 0 && struct.person_data[getPlayer.id].g_gang == 0) {
          if(parseInt(fractionid) == 1 || parseInt(fractionid) == 2 || parseInt(fractionid) == 3) {
            if(parseInt(fractionid) == 1) {
              option_rang = 28;
            } else if(parseInt(fractionid) == 2) {
              option_rang = 18;
            } else if(parseInt(fractionid) == 3) {
              option_rang = 5;
            }
            struct.person_data[getPlayer.id].g_fraction = parseInt(fractionid);
            struct.person_data[getPlayer.id].g_fraction_rang = parseInt(option_rang);
            let fraction_name = fraction.get_name(struct.person_data[getPlayer.id].g_fraction);
            chat.local(player, 'FFFFFF', "Вы назначили " + getPlayer.name + " контроллировать фракцию " + fraction_name);
            chat.local(getPlayer, 'FFFFFF', "Администратор " + player.name + " назначил Вас контроллировать фракцию " + fraction_name);
            getPlayer.dimension = 0;
            systems.spawnPosition(getPlayer);
            systems.updateData(getPlayer, struct);
          } else if(parseInt(fractionid) == 4 || parseInt(fractionid) == 5) {
            option_rang = 5;
            if(parseInt(fractionid) == 4) {
              option_gang = 1;
            } else if(parseInt(fractionid) == 5) {
              option_gang = 2;
            }
            struct.person_data[getPlayer.id].g_gang = parseInt(option_gang);
            struct.person_data[getPlayer.id].g_gang_rang = parseInt(option_rang);
            let gang_name = gang.get_name(struct.person_data[getPlayer.id].g_gang);
            chat.local(player, 'FFFFFF', "Вы назначили " + getPlayer.name + " контроллировать банду " + gang_name);
            chat.local(getPlayer, 'FFFFFF', "Администратор " + player.name + " назначил Вас контроллировать банду " + gang_name);
            getPlayer.dimension = 0;
            systems.gangclothes(getPlayer, struct.person_data[getPlayer.id].g_sex, option_gang);
            systems.spawnPosition(getPlayer);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF8282', 'Выбранная вами фракция отсутствует!');
          }
        } else {
          chat.local(player, 'FF8282', 'Данный игрок уже состоит в какой-либо фракции или же банде!');
          chat.local(player, 'FF8282', 'Используйте команду: /uval [id] [причина]');
        }
      } else {
        chat.local(player, 'FF8282', 'Данный игрок не авторизован!');
      }
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

/* V */

mp.events.addCommand('setweather', (player, _, weathername) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 5) {
    mp.world.weather = weathername;
  }
});

mp.events.addCommand('settime', (player, _, time) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 5) {
    mp.world.time.hour = parseInt(time);
    mp.world.time.minute = parseInt(time);
    mp.world.time.second = parseInt(time);
  }
});

mp.events.addCommand('makeadmin', (player, _, username) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 5) {
    mysql.connection.query('SELECT * FROM `admins` WHERE `person` = ?', [username], function (error, results) {
      if(!results[0]) {
        mysql.connection.query('INSERT INTO `admins` SET `person` = ?, `password` = ?, `level` = 1', [username, "NONE"], function (error2, results2) {
          chat.admin(player, 'FFE900', `${player.name}[${player.id}] назначил нового администратора с именем ${username}`);
        });
      } else {
        chat.local(player, 'FF8282', 'Данный персонаж уже является администратором');
      }
    });
  }
});

mp.events.addCommand('unadmin', (player, _, username) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 5) {
    mysql.connection.query('SELECT * FROM `admins` WHERE `person` = ?', [username], function (error, results) {
      if(!results[0]) {
        mysql.connection.query('DELETE FROM `admins` WHERE `person` = ?', [username], function (error2, results2) {
          chat.admin(player, 'FFE900', `${player.name}[${player.id}] снял администратора с именем ${username}`);
        });
      } else {
        chat.local(player, 'FF8282', 'Данный администратор не найден в базе');
      }
    });
  }
});

mp.events.addCommand('reperson', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      getPlayer.call("gameChat", [1]);
      getPlayer.call("freezePlayer", [1]);
      chat.sysadmin(player, `Администратор ${player.name} отправил ${getPlayer.name} на пересоздание персонажа`);
      let gen_randomp_clothes_4 = systems.getRandom(0, 2);
      let gen_randomp_clothes_6 = systems.getRandom(0, 2);
      let gen_randomp_clothes_8 = systems.getRandom(0, 2);
      let gen_randomp_clothes_11 = systems.getRandom(0, 2);
      if(struct.person_data[getPlayer.id].g_sex == 0) {
        getPlayer.setClothes(3, 0, 0, 0);
        getPlayer.setClothes(4, 1, parseInt(gen_randomp_clothes_4), 0);
        getPlayer.setClothes(6, 1, parseInt(gen_randomp_clothes_6), 0);
        getPlayer.setClothes(8, 1, parseInt(gen_randomp_clothes_8), 0);
        getPlayer.setClothes(11, 1, parseInt(gen_randomp_clothes_11), 0);
      } else {
        getPlayer.setClothes(3, 5, 0, 0);
        getPlayer.setClothes(4, 1, parseInt(gen_randomp_clothes_4), 0);
        getPlayer.setClothes(6, 1, parseInt(gen_randomp_clothes_6), 0);
        getPlayer.setClothes(8, 1, parseInt(gen_randomp_clothes_8), 0);
        getPlayer.setClothes(11, 1, parseInt(gen_randomp_clothes_11), 0);
        getPlayer.setHeadBlend(27, 1, 27, 27, 1, 1, 0, 0, 1);
      }
      getPlayer.setHeadBlend(parseFloat(0), parseFloat(0), parseFloat(1), parseFloat(0), parseFloat(0), parseFloat(1), 0, 0, parseFloat(1));
      getPlayer.dimension = getPlayer.id;
      getPlayer.heading = 170;
      getPlayer.position = new mp.Vector3(parseFloat(403.0166931152344), parseFloat(-996.7100830078125), parseFloat(-99.00025939941406));
      getPlayer.call('createPerson', [struct.person_data[getPlayer.id].g_sex]);
    } else {
      chat.local(player, 'FF8282', 'Ошибка! Выбранный вами игрок, не найден!');
    }
  }
});

/* VI */

mp.events.addCommand('getpos', (player, _, namepos) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 3) {
    let get_pos = player.position;
    let get_heading = player.heading;
    chat.local(player, 'FFFFFF', "[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
    chat.local(player, 'FFFFFF', "Позиция успешно сохрана!");
    logger.write(`[${namepos}] - new mp.Vector3(parseFloat(${get_pos.x}), parseFloat(${get_pos.y}), parseFloat(${get_pos.z})); => heading: ${get_heading}`);
    if(player.vehicle) {
      logger.write(`[${namepos}] - heading vehicle: ${player.vehicle.heading}`);
    }
  }
});

mp.events.addCommand('spawncars', (player) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    systems.spawnVehicle();
    player.outputChatBox('СпавнКарс!');
  }
});

mp.events.addCommand('payday', (player) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    systems.paydayHour();
    player.outputChatBox('Выдан!');
  }
});

mp.events.addCommand('spawn', (player) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 1) {
    systems.spawnPosition(player);
  }
});

mp.events.addCommand('skin', (player, _, skinName) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if (skinName && skinName.trim().length > 0) {
      player.model = mp.joaat(skinName);
    } else {
      chat.local(player, 'FFFFFF', " > [/skin]: [имя модели]");
    }
  }
});

mp.events.addCommand('changesystem', (player, _, typesrv) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(typesrv) == 1) {
      if(configure.registration == 0) {
        chat.local(player, 'FFFFFF', "Регистрация открыта!");
        configure.registration = 1;
      } else {
        chat.local(player, 'FFFFFF', "Регистрация закрыта!");
        configure.registration = 0;
      }
    } else if(parseInt(typesrv) == 2) {
      if(configure.auth == 0) {
        chat.local(player, 'FFFFFF', "Авторизация открыта!");
        configure.auth = 1;
      } else {
        chat.local(player, 'FFFFFF', "Авторизация закрыта!");
        configure.auth = 0;
      }
    } else {
      chat.local(player, 'FF8282', 'Неизвестный тип');
    }
  }
});

mp.events.addCommand('saveall', (player, _, namepos) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    mp.players.forEach(_player => {
      if(struct.person_sys[_player.id].auth_status >= 1) {
        systems.updatePersonData(2, player, struct);
      }
    });
    player.outputChatBox('Сохранено!');
  }
});

mp.events.addCommand('givemoney', (player, _, id) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    let getPlayer = mp.players.at(parseInt(id));
    if(getPlayer) {
      updateData(player, struct);
      player.outputChatBox(`Выдано игроку ${getPlayer.name}`);
    } else {

    }
  }
});

mp.events.addCommand('addhouse', (player, _, rare, coast, interior, garage, max_cars) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(rare) >= 0 && parseInt(coast) >= 0 && parseInt(interior) >= 0 && parseInt(garage) >= 0 && max_cars >= 1) {
      let get_id = 0;
      let get_count = 0;
      mysql.connection.query('SELECT COUNT(*) AS count FROM houses', [], function (error1, results, fields) {
        get_count = results[0].count;
        let array_max_cars = new Array(parseInt(max_cars));
        let array_gen = {x: 'NONE', y: 'NONE', z: 'NONE'};
        for(let i = 0; i < max_cars; i++) {
          array_max_cars[i] = array_gen;
        }
        let max_cars_pos = JSON.stringify(array_max_cars);
        var query = mysql.connection.query('INSERT INTO houses SET pos_x = ?, pos_y = ?, pos_z = ?, pos_heading = ?, rare = ?, coast = ?, interior = ?, garage = ?, garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ?, max_cars_count = ?, max_cars_pos = ?', [player.position.x, player.position.y, player.position.z, player.heading, rare, coast, interior, garage, 0, 0, 0, 0, max_cars, max_cars_pos], function (error2, results2) {
        });
        configure.housesblips[get_count] = mp.blips.new(40, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)),
        {
            name: "house",
            scale: 1,
            color: 2,
            drawDistance: 100,
            shortRange: 100,
            rotation: 0,
            dimension: 0,
        });
        configure.housesmarkers[get_count] = mp.markers.new(0, new mp.Vector3(parseFloat(player.position.x), parseFloat(player.position.y), parseFloat(player.position.z)), 1,
        {
            direction: new mp.Vector3(0,0,0),
            rotation: new mp.Vector3(0,0,0),
            visible: true,
            dimension: 0
        });
        configure.housesmarkers[get_count].setColor(255, 247, 0, 255);
        configure.housescolshapes[get_count] = mp.colshapes.newRectangle(player.position.x, player.position.y, 1, 1);
        configure.housesnumber[get_count] = get_count;
        configure.housestate[get_count] = 0;
        configure.housesrare[get_count] = parseInt(rare);
        configure.housesowner[get_count] = "NONE";
        configure.housescoast[get_count] = parseInt(coast);
        configure.housesinterior[get_count] = parseInt(interior);
        configure.housesgarage[get_count] = parseInt(garage);
        chat.local(player, 'FFFFFF', "Дом установлен!");
        if(parseInt(garage) >= 1) {
          chat.local(player, 'FFFFFF', "Для установки точки выезда/въезда в гараж используйте: /sethousegarage");
        }
        //logger.write("[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
      });
    } else {
      chat.local(player, 'FFFFFF', "Для установки дома, необходимо выбрать следующее параметры:");
      chat.local(player, 'FFFFFF', "Классы домов: 0 [H], 1 [M], 2 [R], 3 [A]");
      chat.local(player, 'FFFFFF', "[/addhouse]: [rare] [coast] [interior] [garage] [max_cars]");
    }
  }
});

mp.events.addCommand('sethousegarage', (player, _, house) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(house) >= 1) {
      let get_house;
      mysql.connection.query('SELECT * FROM houses WHERE id = ?', [house], function (error, results, fields) {
        get_house = results[0];
        if(get_house) {
          var query = mysql.connection.query('UPDATE `houses` SET garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ? WHERE id = ?', [player.position.x, player.position.y, player.position.z, player.heading, house], function (error2, results2) {

          });
          chat.local(player, 'FFFFFF', `Позиция гаража въезда/выезда для дома #${house} установлена!`);
        } else {
          chat.local(player, 'FFFFFF', `Дом не найден в базе данных!`);
        }
      });
    } else {
      chat.local(player, 'FFFFFF', "[/sethousegarage]: [house]");
    }
  }
});

mp.events.addCommand('sethousecarpos', (player, _, house, cell) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(house) >= 0 && parseInt(cell) >= 0) {
      let get_house;
      mysql.connection.query('SELECT * FROM houses WHERE id = ?', [house], function (error1, results) {
        get_house = results[0];
        if(get_house.garage == 0) {
          if(get_house) {
            let array_max_cars = new Array(parseInt(get_house.max_cars_count));
              for(let i = 0; i < get_house.max_cars_count; i++) {
              if(parseInt(cell) == i) {
                array_max_cars[i] = {x: player.position.x, y: player.position.y, z: player.position.z, r: player.heading};
              } else {
                let get_array_max_cars = JSON.parse(get_house.max_cars_pos);
                array_max_cars[i] = get_array_max_cars[i];
              }
            }
            let max_cars_pos = JSON.stringify(array_max_cars);
            var query = mysql.connection.query('UPDATE `houses` SET max_cars_pos = ? WHERE id = ?', [max_cars_pos,house], function (error2, results2) {

            });
            chat.local(player, 'FFFFFF', `Позиция автомобилей для дома #${house} и ячейки #${cell} установлена!`);
          } else {
            chat.local(player, 'FFFFFF', `Дом не найден в базе данных!`);
          }
        } else {
          chat.local(player, 'FFFFFF', `Для данного класса с гаражем уже стоит фиксированная позиция!`);
        }
      });
        //logger.write("[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
    } else {
      chat.local(player, 'FFFFFF', "[/sethousecarpos]: [house] [cell]");
    }
  }
});

mp.events.addCommand('addgangzone', (player, _, distance) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(distance) != 0 && distance) {
      var query = mysql.connection.query('INSERT INTO gangzones SET coord_one = ?, coord_two = ?, coord_three = ?, distance = ?, owner = 1', [player.position.x, player.position.y, player.position.z, distance], function (error, results, fields) {

      });
      let hashes = new Array(10);
      hashes[0] = "0x1DB03C7D3DC49006"; // set alpha
      hashes[1] = "0xDC0EBFC7730AA226"; // set sprite
      hashes[2] = "0x71925FF3194E84CE"; // set color
      hashes[3] = "0x4925D19C5D509CE1"; // set display
      hashes[4] = "0x90260EB52E59F0F5"; // set short
      mysql.connection.query('SELECT * FROM gangzones', [], function (error2, results2, fields2) {

        player.call('addGangZone', [results2.length-1, hashes, player.position.x, player.position.y, player.position.z, distance, 2]);
        configure.gangzones[results2.length-1].x = player.position.x;
        configure.gangzones[results2.length-1].y = player.position.y;
        configure.gangzones[results2.length-1].z = player.position.z;
        configure.gangzones[results2.length-1].distance = parseInt(distance);
        configure.gangzones[results2.length-1].owner = 1;
        configure.loaded_gangzones_count++;
      });
      chat.local(player, 'FFFFFF', `Территория создана! Ее созданный номер: ${configure.loaded_gangzones_count}`);
    } else {
      chat.local(player, 'FFFFFF', `Не указана дистанция квадрата`);
    }
  }
});

mp.events.addCommand('setgangzone', (player, _, gangid, distance) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(gangid) != 0 && distance) {
      var query = mysql.connection.query('UPDATE `gangzones` SET coord_one = ?, coord_two = ?, coord_three = ?, distance = ? WHERE id = ?', [player.position.x, player.position.y, player.position.z, distance, gangid], function (error, results) {

      });
      let hashes = new Array(10);
      hashes[0] = "0x466CCEBC4B294723"; // set position blip
      hashes[1] = "0x067D86058370B7EB"; // set scale blip
      configure.gangzones[parseInt(gangid)].x = player.position.x;
      configure.gangzones[parseInt(gangid)].y = player.position.y;
      configure.gangzones[parseInt(gangid)].z = player.position.z;
      configure.gangzones[parseInt(gangid)].distance = parseInt(distance);
      mp.players.forEach(_player => {
        _player.call('setGangZone', [hashes, struct.person_sys[_player.id].storage_blip[parseInt(gangid)], player.position.x, player.position.y, player.position.z]);
      });
      chat.local(player, 'FFFFFF', `Вы изменили территорию с номером ${gangid}!`);
    } else {
      chat.local(player, 'FFFFFF', "[/setgangzone]: [gangid] [distance]");
    }
  }
});

mp.events.addCommand('transgangzone', (player, _, gangid, type, znak, len, distance) => {
  if(struct.person_sys[player.id].admin_alogin_auth == 1 && struct.person_sys[player.id].admin_alogin_level >= 6) {
    if(parseInt(gangid) != 0 && type && znak && len) {
      // x = 1, y = 2
      mysql.connection.query('SELECT * FROM gangzones WHERE id = ?', [gangid], function (error, results) {
        get_gangzone = results[0];
        if(get_gangzone) {
          if(!distance) {
            distance = configure.gangzones[parseInt(gangid)].distance;
          }
          console.log(distance);
          let set_new_pos = new Array(3);
          if(parseInt(type) == 1) {
            if(parseInt(znak) == 1) {
              set_new_pos[0] = configure.gangzones[parseInt(gangid)].x + parseFloat(len);
              set_new_pos[1] = configure.gangzones[parseInt(gangid)].y;
            } else if(parseInt(znak) == 2) {
              set_new_pos[0] = configure.gangzones[parseInt(gangid)].x - parseFloat(len);
              set_new_pos[1] = configure.gangzones[parseInt(gangid)].y;
            }
          } else if(parseInt(type) == 2) {
            if(parseInt(znak) == 1) {
              set_new_pos[0] = configure.gangzones[parseInt(gangid)].x;
              set_new_pos[1] = configure.gangzones[parseInt(gangid)].y + parseFloat(len);
            } else if(parseInt(znak) == 2) {
              set_new_pos[0] = configure.gangzones[parseInt(gangid)].x;
              set_new_pos[1] = configure.gangzones[parseInt(gangid)].y - parseFloat(len);
            }
          }
          var query = mysql.connection.query('UPDATE `gangzones` SET coord_one = ?, coord_two = ?, distance = ? WHERE id = ?', [set_new_pos[0], set_new_pos[1], distance, gangid], function (error2, results2) {

          });
          let hashes = new Array(10);
          hashes[0] = "0x466CCEBC4B294723"; // set position blip
          hashes[1] = "0x067D86058370B7EB"; // set scale blip
          configure.gangzones[parseInt(gangid)].x = set_new_pos[0];
          configure.gangzones[parseInt(gangid)].y = set_new_pos[1];
          configure.gangzones[parseInt(gangid)].distance = parseFloat(distance);
          mp.players.forEach(_player => {
            _player.call('setGangZone', [hashes, struct.person_sys[_player.id].storage_blip[parseInt(gangid)], set_new_pos[0], set_new_pos[1], configure.gangzones[parseInt(gangid)].z, distance]);
          });
          chat.local(player, 'FFFFFF', `GangZone changed!`);
        } else {
          chat.local(player, 'FFFFFF', "Зона ненайдена попробуйте другую");
        }
      });
    } else {
      chat.local(player, 'FFFFFF', "[/transgangzone]: [gangid] [type] [znak] [len]");
    }
  }
});

mp.events.addCommand('resetZones', (player) => {
  for(let storage = 0; storage < configure.loaded_gangzones_count; storage++) {
    player.call('hiddenGangZone', [struct.person_sys[player.id].storage_blip[storage]]);
  }
  getWeaponAmmo
});

mp.events.addCommand('test2', (player) => {
  player.call('addCheckPoint', [1, new mp.Vector3(parseFloat(398.268310546875), parseFloat(-671.4325561523438), parseFloat(29)), 1]);
  player.call('addMapPoint', [1, new mp.Vector3(parseFloat(404.268310546875), parseFloat(-671.4325561523438), parseFloat(29))]);
});

} catch(error) {
  console.log(`[WARN] FATAL ERROR commands.js: ${error}`);
}
