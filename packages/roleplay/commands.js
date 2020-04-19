  /* INITIAL MODULES */

var md5 = require('md5');
var mysql = require('./mysql.js');

/* INITIAL OUT-SIDE INCLUDES */

var configure = require('./configure.js');
var logger = require('./logger.js');
var struct = require('./struct.js');
var chat = require('./chat.js');
var fraction = require('./fractions.js');
var gang = require('./gangs.js');
var systems = require('./systems.js');

/* Клиент-сайд команды */

mp.events.addCommand('timestamp', (player) => {
  if(struct.person_sys[player.id].timestamp == 0) {
    struct.person_sys[player.id].timestamp = 1;
  } else {
    struct.person_sys[player.id].timestamp = 0;
  }
  chat.local(player, 'FFFFFF', " > временная метка установлена!");
});

/* Обычные команды */

mp.events.addCommand('me', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} ${message}`);
    } else {
      chat.local(player, 'FF0000', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/me]: [сообщение]");
  }
});

mp.events.addCommand('b', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
    chat.broadcastinrange(player, 1, player.position, 15, 'E5E5E5', `${player.name}[${player.id}]: (( ${message} ))`);
  } else {
    chat.local(player, 'FFFFFF', " > [/b]: [сообщение]");
  }
});

mp.events.addCommand('do', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
  if(arr1) {
    if(struct.person_sys[player.id].duehuman != 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${message} (( ${player.name} ))`);
    } else {
      chat.local(player, 'FF0000', 'Вы мертвы.');
    }
  } else {
    chat.local(player, 'FFFFFF', " > [/do]: [сообщение]");
  }
});

mp.events.addCommand('mm', (player) => {
  player.call('showMainMenu', [1]);
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

mp.events.addCommand('time', (player) => {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  chat.local(player, 'F4DF42', `Серверное время: ${hour} ч. ${min} м.`);
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
      chat.local(player, 'FF0000', 'Вы находитесь слишком далеко от этого игрока!');
    }
  } else {
    chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
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
    } else {
      chat.local(player, 'FF0000', 'Нельзя отправить SMS самому себе! Не круто!');
    }
  } else {
    chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
  }
});

mp.events.addCommand('pay', (player, _, id, howmuch) => {
  let getPlayer = mp.players.at(parseInt(id));
  if(getPlayer) {
    if(getPlayer != player) {
      if(struct.person_data[player.id].g_money >= parseInt(howmuch) || parseInt(howmuch) != 0) {
        let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
        if(distance <= 5) {
          struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - parseInt(howmuch);
          struct.person_data[getPlayer.id].g_money = struct.person_data[getPlayer.id].g_money + parseInt(howmuch);
          chat.local(player, 'CECECE', `Вы передали ${howmuch}$ игроку ${getPlayer.name}`);
          chat.local(getPlayer, 'CECECE', `Вам передал ${player.name} деньги в сумме ${howmuch}$`);
          chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} передает некую денежную сумму ${getPlayer.name}.`);
          systems.updateData(player, struct);
          systems.updateData(getPlayer, struct);
        } else {
          chat.local(player, 'FF0000', 'Вы находитесь слишком далеко от этого игрока!');
        }
      } else {
        chat.local(player, 'FF0000', 'У вас не имеется такой денежной суммы!');
      }
    } else {
      chat.local(player, 'FF0000', 'Нельзя дать денег самому себе! Не круто!');
    }
  } else {
    chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
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
                } else {
                  if(struct.person_sys[player.id].person_car[i]) {
                    struct.person_sys[player.id].person_car[i].destroy();
                  }
                }
              }
            } else {
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
            }
            if(struct.person_sys[player.id].person_summon_cars == 0) {
              struct.person_sys[player.id].person_summon_cars = 1;
              chat.local(player, 'FFFFFF', `Автомобили заспавнены!`);
            } else {
              struct.person_sys[player.id].person_summon_cars = 0;
              chat.local(player, 'FFFFFF', `Автомобили были все удалены, напишите еще раз команду!`);
            }
          } else {
            chat.local(player, 'FF0000', 'У данного дома отсутствует позиция Spawn. Свяжитесь с разработчиком.');
          }
        } else {
          chat.local(player, 'FF0000', 'У вас нет ни одной машины!');
        }
      });
    } else {
      chat.local(player, 'FF0000', 'Вы не имеете своего дома!');
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
    chat.local(player, 'FF0000', 'Вы не находитесь в каком-либо доме!');
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
              let fraction_name = fraction.get_rang(struct.person_data[player.id].g_fraction);
              let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
              chat.local(player, '49D4ED', `Вы пригласили ${getPlayer.name} во фракцию ${fraction_name}`);
              chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} пригласил Вас во фракцию ${fraction_name}`);
              struct.person_data[getPlayer.id].g_fraction = struct.person_data[player.id].g_fraction;
              struct.person_data[getPlayer.id].g_fraction_rang = 1;
              struct.person_data[getPlayer.id].g_job = 0;
              systems.updateData(getPlayer, struct);
            } else {
              chat.local(player, 'FF0000', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
            }
          } else {
            chat.local(player, 'FF0000', 'Данный игрок находиться слишком далеко!');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let distance = mp.Vector3.Distance2D(player.position, getPlayer.position);
          if(distance <= 5) {
            if(struct.person_data[getPlayer.id].g_fraction <= 0 || struct.person_data[getPlayer.id].g_gang <= 0) {
              let fraction_name = gang.get_rang(struct.person_data[player.id].g_gang);
              let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
              chat.local(player, '49D4ED', `Вы пригласили ${getPlayer.name} в банду ${fraction_name}`);
              chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} пригласил Вас в банду ${fraction_name}`);
              struct.person_data[getPlayer.id].g_gang = struct.person_data[player.id].g_gang;
              struct.person_data[getPlayer.id].g_gang_rang = 1;
              struct.person_data[getPlayer.id].g_job = 0;
              systems.updateData(getPlayer, struct);
            } else {
              chat.local(player, 'FF0000', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
            }
          } else {
            chat.local(player, 'FF0000', 'Данный игрок находиться слишком далеко!');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('uninvite', (player, _, id) => {
    if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 19 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
          let fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из фракции ${fraction_name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} выгнал Вас из фракции ${fraction_name}`);
          struct.person_data[getPlayer.id].g_fraction = 0;
          struct.person_data[getPlayer.id].g_fraction_rang = 0;
          systems.updateData(getPlayer, struct);
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          let fraction_name = gang.get_name(struct.person_data[player.id].g_gang);
          chat.local(player, '49D4ED', `Вы исключили ${getPlayer.name} из банды ${fraction_name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} выгнал Вас из банды ${fraction_name}`);
          struct.person_data[getPlayer.id].g_gang = 0;
          struct.person_data[getPlayer.id].g_gang_rang = 0;
          systems.updateData(getPlayer, struct);
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('giverang', (player, _, id) => {
    if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 24 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          if(struct.person_data[getPlayer.id].g_fraction_rang <= struct.person_data[player.id].g_fraction_rang-1) {
            struct.person_data[getPlayer.id].g_fraction_rang = struct.person_data[getPlayer.id].g_fraction_rang + 1;
            let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            let to_rang = fraction.get_rang(struct.person_data[getPlayer.id].g_fraction, struct.person_data[getPlayer.id].g_fraction_rang);
            chat.local(player, '49D4ED', `Вы повысили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} взвел вас в новое звание ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Достигнут предел для вашего звания!');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          if(struct.person_data[getPlayer.id].g_fraction_rang <= struct.person_data[player.id].g_fraction_rang-1) {
            truct.person_data[getPlayer.id].g_gang_rang = struct.person_data[getPlayer.id].g_gang_rang + 1;
            let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
            let to_rang = gang.get_rang(struct.person_data[getPlayer.id].g_gang, struct.person_data[getPlayer.id].g_gang_rang);
            chat.local(player, '49D4ED', `Вы взвели ${getPlayer.name} в новый авторитет ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} взвел вас в новый авторитет ${to_rang}`);
            struct.person_data[getPlayer.id].g_gang_rang = struct.person_data[getPlayer.id].g_gang_rang + 1;
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Достигнут предел для вашего звания!');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('unrang', (player, _, id) => {
    if(struct.person_data[player.id].g_fraction == 1 && struct.person_data[player.id].g_fraction_rang >= 24 || struct.person_data[player.id].g_fraction == 2 && struct.person_data[player.id].g_fraction_rang >= 14) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          if(struct.person_data[getPlayer.id].g_fraction_rang == 1) {
            struct.person_data[getPlayer.id].g_fraction_rang = struct.person_data[getPlayer.id].g_fraction_rang - 1;
            let me_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
            let to_rang = fraction.get_rang(struct.person_data[getPlayer.id].g_fraction, struct.person_data[getPlayer.id].g_fraction_rang);
            chat.local(player, '49D4ED', `Вы понизили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} понизил вас в звании до ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Игрок имеет уже 1 ранг, понизить ниже нельзя. Используйте другую команду.');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    } else if(struct.person_data[player.id].g_gang == 1 && struct.person_data[player.id].g_gang_rang >= 4 || struct.person_data[player.id].g_gang == 2 && struct.person_data[player.id].g_gang_rang >= 4) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          if(struct.person_data[getPlayer.id].g_gang_rang == 1) {
            struct.person_data[getPlayer.id].g_gang_rang = struct.person_data[getPlayer.id].g_gang_rang - 1;
            let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
            let to_rang = gang.get_rang(struct.person_data[getPlayer.id].g_gang, struct.person_data[getPlayer.id].g_gang_rang);
            chat.local(player, '49D4ED', `Вы понизили ${getPlayer.name} до звания ${to_rang}`);
            chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} понизил вас в звании до ${to_rang}`);
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Игрок имеет уже 1 ранг, понизить ниже нельзя. Используйте другую команду.');
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('f', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
    if(struct.person_data[player.id].g_gang >= 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
      chat.family(player, '49EDED', `${rang} ${player.name}[${player.id}]: ${message}`);
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} отправляет сообщение по телеграму.`);
    }
  });

  mp.events.addCommand('r', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
    if(struct.person_data[player.id].g_fraction >= 1) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      let rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
      chat.fraction(player, '95BCF9', `${rang} ${player.name}[${player.id}]: ${message}`);
      chat.broadcastinrange(player, 1, player.position, 15, 'E894DB', `${player.name} что-то сообщает по рации.`);
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
      chat.local(player, 'FFFFFF', `Список челнов банды онлайн:`);
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

  mp.events.addCommand('switchclothes', (player, _, clothesid) => {
    if(struct.person_data[player.id].g_fraction) {
      if(struct.person_data[player.id].g_fraction == 1 && parseInt(clothesid) >= 0 && parseInt(clothesid) <= 3) {
        struct.person_data[player.id].g_fraction_clothes = parseInt(clothesid);
        chat.local(player, 'FFFFFF', `Одежда под номером #${clothesid} установлена!`);
      } else if(struct.person_data[player.id].g_fraction == 2 && parseInt(clothesid) == 0) {
        struct.person_data[player.id].g_fraction_clothes = parseInt(clothesid);
        chat.local(player, 'FFFFFF', `Одежда под номером #${clothesid} установлена!`);
      } else {
        chat.local(player, 'FF0000', 'Ошибка в установке одежды! Либо такая одежда не найдена, либо запрещена для вашей фракции!');
      }
    }
  });

  /* LSPD */

  mp.events.addCommand('mdc', (player) => {
    if(struct.person_data[player.id].g_fraction == 1) {
      //player.call('showMDC', 1);
    }
  });

  mp.events.addCommand('cuff', (player, _, id) => {
    if(struct.person_data[player.id].g_fraction == 1) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          chat.local(player, '49D4ED', `Вы одели наручники на ${getPlayer.name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} одел на Вас наручники для вашего же блага`);
          getPlayer.call("freezePlayer", [1]);
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('uncuff', (player, _, id) => {
    if(struct.person_data[player.id].g_fraction == 1) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let me_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
          chat.local(player, '49D4ED', `Вы сняли наручники с ${getPlayer.name}`);
          chat.local(getPlayer, '49D4ED', `${me_rang} ${player.name} снял с Вас наручники`);
          getPlayer.call("freezePlayer", [0]);
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('su', (player, _, username, wantedlvl, reason1, reason2 = "", reason3 = "") => {
    if(struct.person_data[player.id].g_fraction == 1) {
      if(username && reason1 && wantedlvl) {
        let reason = reason1 + reason2 + reason3;
        var query = mysql.connection.query('INSERT INTO suspects SET officer = ?, suspect = ?, reason = ?, wanted = ?', [player.name, username, reason, wantedlvl], function (error, results, fields) {
          chat.local(player, '49D4ED', `Вы добавили в базу ${username} по причине ${reason}`);
        });
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Вы не заполнили имя, причины или же степень розыска!');
      }
    }
  });

  mp.events.addCommand('unsu', (player, _, username) => {
    if(struct.person_data[player.id].g_fraction == 1) {
      if(username) {
        var query = mysql.connection.query('DELETE FROM suspects WHERE suspect = ?', [username], function (error, results, fields) {
          chat.local(player, '49D4ED', `Вы удалили с базы ${username}`);
        });
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Вы не заполнили имя!');
      }
    }
  });

  mp.events.addCommand('arrest', (player, _, username) => {
    if(struct.person_data[player.id].g_fraction == 1) {
      /*
      [camera1]: X: 460.3734130859375; Y: -994.399169921875; Z: 24.914871215820312; [heading:271.10662841796875]
      [camera2]: X: 459.9751281738281; Y: -997.814208984375; Z: 24.914854049682617; [heading:270.963623046875]
      [camera3]: X: 460.3231506347656; Y: -1001.42724609375; Z: 24.91486930847168; [heading:267.86077880859375]
      */
    }
  });

  /* Команды персонала */

  mp.events.addCommand('pm', (player, _, id, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
    if(struct.login_data[player.id].group_id >= 1) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(getPlayer != player) {
          let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
          chat.local(player, '169EAB', "Вы дали ответ " + getPlayer.name + "[" + getPlayer.id + "]" +": " + message);
          chat.local(getPlayer, '169EAB', player.name + "[" + player.id + "]" +" ответил вам: " + message);
        } else {
          chat.local(player, 'FF0000', 'Нельзя отправить сообщение самому себе! Не круто!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('a', (player, _, arr1 = "", arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
    if(struct.login_data[player.id].group_id >= 2) {
      let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
      chat.admin(player, 'FFE900', `<< ADM-CHAT >> ${player.name}[${player.id}]: ${message}`);
    }
  });

  mp.events.addCommand('ooc', (player, _, arr1, arr2 = "", arr3 = "", arr4 = "", arr5 = "", arr6 = "", arr7 = "", arr8 = "", arr9 = "", arr10 = "", arr11 = "", arr12 = "", arr13 = "", arr14 = "", arr15 = "") => {
    if(struct.login_data[player.id].group_id >= 2) {
      if(arr1) {
        let message = arr1 + " " + arr2 + " " + arr3 + " " + arr4 + " " + arr5 + " " + arr6 + " " + arr7 + " " + arr8 + " " + arr9 + " " + arr10 + " " + arr11 + " " + arr12 + " " + arr13 + " " + arr14 + " " + arr15;
        if(struct.login_data[player.id].group_id == 2) {
          chat.oocadmin(player, `<< Сотрудник ${player.name}[${player.id}]: ${message} >>`);
        } else if(struct.login_data[player.id].group_id == 3) {
          chat.oocadmin(player, `<< Администратор ${player.name}[${player.id}]: ${message} >>`);
        }
      } else {
        chat.local(player, 'FFFFFF', " > [/ooc]: [сообщение]");
      }
    }
  });

  mp.events.addCommand('giveweapon', (player, _, id, weaponName, ammo) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        player.giveWeapon(mp.joaat(`${weaponName}`), parseInt(ammo));
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('sethp', (player, _, id, hp) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        getPlayer.health = parseInt(hp);
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('setarmour', (player, _, id, armour) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        getPlayer.armour = parseInt(armour);
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('veh', (player, _, vehName) => {
    if(struct.login_data[player.id].group_id >= 2) {
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
        configure.createvehicle[configure.createvehicle_count].numberPlate = "STAFF";
      } else {
        chat.local(player, 'FFFFFF', " > [/veh]: [имя транспорта]");
      }
    }
  });

  mp.events.addCommand('destroyveh', (player, _,) => {
    if(struct.login_data[player.id].group_id >= 2) {
      if(player.vehicle) {
        console.log(`${player.name} destroy car`);
        for(let i = 0; i <= configure.createvehicle_count; i++) {
          if(configure.createvehicle[i] == player.vehicle) {
            player.vehicle.destroy();
            chat.local(player, 'FFFFFF', "Машина уничтожена!");
          }
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Необходимо быть за рулем автомобиля!');
      }
    }
  });

  mp.events.addCommand('fixcar', (player) => {
    if(struct.login_data[player.id].group_id >= 2) {
      if (player.vehicle) {
        player.vehicle.repair();
      } else {
        chat.local(player, 'FF0000', 'Вы не в машине. Необходимо быть в ней!');
      }
    }
  });

  mp.events.addCommand('goto', (player, _, playerID) => {
    if(struct.login_data[player.id].group_id >= 2) {
      if (playerID && playerID.trim().length > 0) {
      let sourcePlayer = mp.players.at(parseInt(playerID));
      if (sourcePlayer) {
        let playerPos = sourcePlayer.position;
        playerPos.x += 1;
        player.position = playerPos;
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
        }
      } else {
        chat.local(player, 'FFFFFF', " > [/goto]: [номер игрока]");
      }
    }
  });

  mp.events.addCommand('gethere', (player, _, playerID) => {
    if(struct.login_data[player.id].group_id >= 2) {
    if (playerID && playerID.trim().length > 0) {
      let sourcePlayer = mp.players.at(parseInt(playerID));
      if (sourcePlayer) {
        let playerPos = player.position;
        playerPos.x += 1;
        sourcePlayer.position = playerPos;
        chat.local(sourcePlayer, 'FFFFFF', "Вы были телепортированы администратором LSFIVEM");
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
        }
      } else {
        chat.local(player, 'FFFFFF', " > [/gethere]: [номер игрока]");
      }
    }
  });

  mp.events.addCommand('tpcor', (player, _, x, y ,z) => {
    if(struct.login_data[player.id].group_id >= 2) {
      if (parseFloat(x) && parseFloat(y) && parseFloat(z)) {
        player.position = new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z));
      } else {
        chat.local(player, 'FFFFFF', " > [/tpcor]: [x] [y] [z]");
      }
    }
  });

  mp.events.addCommand('tphouse', (player, _, houseid) => {
    if(struct.login_data[player.id].group_id >= 2) {
      if (parseFloat(houseid)) {
        mysql.connection.query('SELECT * FROM houses WHERE id = ?', [houseid], function (error, results, fields) {
          if(results[0]) {
            player.position = new mp.Vector3(parseFloat(results[0].pos_x),parseFloat(results[0].pos_y),parseFloat(results[0].pos_z));
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Выбранный вами дом, не найден!');
          }
        });
      } else {
        chat.local(player, 'FFFFFF', " > [/tphouse]: [houseid]");
      }
    }
  });

  mp.events.addCommand('tplist', (player, _, tpid) => {
    if(struct.login_data[player.id].group_id >= 2) {
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
      }
      else {
        player.outputChatBox('Неизвестная локация');
      }
    }
  });

  mp.events.addCommand('setclothes', (player, _, arr1, arr2, arr3) => {
    if(struct.login_data[player.id].group_id >= 2) {
      player.setClothes(parseInt(arr1), parseInt(arr2), parseInt(arr3), 0);
    }
  });

  mp.events.addCommand('setprops', (player, _, arr1, arr2, arr3) => {
    if(struct.login_data[player.id].group_id >= 2) {
      player.setProp(parseInt(arr1), parseInt(arr2), parseInt(arr3));
    }
  });

  mp.events.addCommand('re', (player, _, id) => {
    if(struct.login_data[player.id].group_id >= 2) {
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
                  player.position = new mp.Vector3(get_pos.x,get_pos.y,get_pos.z+10);
                } else {
                  clearInterval(timer);
                  timer = "";
                  chat.local(player, 'FFFFFF', `Слежка отключена`);
                  player.position = new mp.Vector3(parseFloat(struct.person_sys[player.id].admin_save_pos_x),parseFloat(struct.person_sys[player.id].admin_save_pos_y),parseFloat(struct.person_sys[player.id].admin_save_pos_z));
                }
              } else {
                clearInterval(timer);
                timer = "";
                chat.local(player, 'FFFFFF', `Слежка отключена`);
                player.position = new mp.Vector3(parseFloat(struct.person_sys[player.id].admin_save_pos_x),parseFloat(struct.person_sys[player.id].admin_save_pos_y),parseFloat(struct.person_sys[player.id].admin_save_pos_z));
              }
            } else {
              clearInterval(timer);
              timer = "";
              chat.local(player, 'FFFFFF', `Слежка отключена`);
              player.position = new mp.Vector3(parseFloat(struct.person_sys[player.id].admin_save_pos_x),parseFloat(struct.person_sys[player.id].admin_save_pos_y),parseFloat(struct.person_sys[player.id].admin_save_pos_z));
            }
          }
          timer = setInterval(spec_now, 1000, getPlayer.id, getPlayer.name);
          player.alpha = 0;
          struct.person_sys[player.id].spec = 1;
          struct.person_sys[player.id].admin_save_pos_x = player.position.x;
          struct.person_sys[player.id].admin_save_pos_y = player.position.y;
          struct.person_sys[player.id].admin_save_pos_z = player.position.z+3;
          chat.local(player, 'FFFFFF', `Слежка начата`);
          player.call("freezePlayer", [1]);
          } else {
            chat.local(player, 'FF0000', 'Вы уже следите! Отключите слежку командой /reoff');
          }
        }  else {
          chat.local(player, 'FF0000', 'Данный игрок не авторизован!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('reoff', (player) => {
    if(struct.login_data[player.id].group_id >= 2) {
      struct.person_sys[player.id].spec = 0;
      chat.local(player, 'FFFFFF', `Останавливаем слежку`);
      player.call("freezePlayer", [0]);
      player.alpha = 255;
    }
  });

  mp.events.addCommand('kick', (player, _, id, reason) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(reason) {
          if(struct.person_sys[getPlayer.id].auth_status >= 1) {
            let person_name = getPlayer.name;
            if(struct.login_data[player.id].group_id == 2) {
                chat.sysadmin(player, `Сотрудник ${player.name} кикнул персонажа ${person_name}. Причина: ${reason}`);
              } else if(struct.login_data[player.id].group_id == 3) {
                chat.sysadmin(player, `Администратор ${player.name} кикнул персонажа ${person_name}. Причина: ${reason}`);
              }
              function kick_player() {
                getPlayer.kick();
              }
              setTimeout(kick_player, 1000);
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Персонаж не залогинен!');
          }
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Укажите причину варна!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('warnperson', (player, _, id, reason) => {

    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(reason) {
          if(struct.person_sys[getPlayer.id].auth_status >= 1) {
            let person_name = getPlayer.name;
            if(struct.person_data[getPlayer.id].warns == 2) {
              if(struct.login_data[player.id].group_id == 2) {
                chat.sysadmin(player, `Сотрудник ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
              } else if(struct.login_data[player.id].group_id == 3) {
                chat.sysadmin(player, `Администратор ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
              }
              struct.person_data[getPlayer.id].warns = struct.person_data[getPlayer.id].warns + 1;
              struct.person_data[getPlayer.id].status = 0;
              function kick_player() {
                getPlayer.kick();
              }
              setTimeout(kick_player, 1000);
              chat.local(player, 'FFFFFF', `Бан выдан`);
            } else {
              if(struct.login_data[player.id].group_id == 2) {
                chat.sysadmin(player, `Сотрудник ${player.name} выдал варн персонажу ${person_name}. Причина: ${reason}`);
              } else if(struct.login_data[player.id].group_id == 3) {
                chat.sysadmin(player, `Администратор ${player.name} выдал варн персонажу ${person_name}. Причина: ${reason}`);
              }
              struct.person_data[getPlayer.id].warns = struct.person_data[getPlayer.id].warns + 1;
              getPlayer.kick();
            }
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Персонаж не залогинен!');
          }
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Укажите причину варна!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('banperson', (player, _, id, reason) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(reason) {
          if(struct.person_sys[getPlayer.id].auth_status >= 1) {
            let person_name = getPlayer.name;
            if(struct.login_data[player.id].group_id == 2) {
              chat.sysadmin(player, `Сотрудник ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
            } else if(struct.login_data[player.id].group_id == 3) {
              chat.sysadmin(player, `Администратор ${player.name} заблокировал персонажа ${person_name}. Причина: ${reason}`);
            }
            struct.person_data[getPlayer.id].status = 0;
            function kick_player() {
              getPlayer.kick();
            }
            setTimeout(kick_player, 1000);
          } else {
            chat.local(player, 'FF0000', 'Ошибка! Персонаж не залогинен!');
          }
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Укажите причину варна!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('banacc', (player, _, id, reason) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        if(reason) {
          let account_name = struct.login_data[getPlayer.id].login;
          if(struct.login_data[player.id].group_id == 2) {
            chat.sysadmin(player, `Сотрудник ${player.name} заблокировал аккаунт ${account_name}. Причина: ${reason}`);
          } else if(struct.login_data[player.id].group_id == 3) {
            chat.sysadmin(player, `Администратор ${player.name} заблокировал аккаунт ${account_name}. Причина: ${reason}`);
          }
          struct.login_data[getPlayer.id].banned = 1;
          function fkick() {
            getPlayer.kick();
          }
          setTimeout(fkick, 1000);
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Укажите причину варна!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('uval', (player, _, id, reason) => {
    if(struct.login_data[player.id].group_id >= 2) {
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
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Игрок не состоит не в какой банде или же фракции!');
          }
        } else {
          chat.local(player, 'FF0000', 'Ошибка! Укажите причину!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('makeleader', (player, _, id, fractionid) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let getPlayer = mp.players.at(parseInt(id));
      if(getPlayer) {
        let option_rang = 1;
        let option_gang = 0;
        if(struct.person_sys[getPlayer.id].auth_status >= 1) {
          if(parseInt(fractionid) == 1 || parseInt(fractionid) == 2) {
            if(parseInt(fractionid) == 1) {
              option_rang = 28;
            } else if(parseInt(fractionid) == 2) {
              option_rang = 17;
            }
            struct.person_data[getPlayer.id].g_fraction = parseInt(fractionid);
            struct.person_data[getPlayer.id].g_fraction_rang = parseInt(option_rang);
            let fraction_name = fraction.get_name(struct.person_data[getPlayer.id].g_fraction);
            chat.local(player, 'FFFFFF', "Вы назначили " + getPlayer.name + " контроллировать фракцию " + fraction_name);
            chat.local(getPlayer, 'FFFFFF', "Администратор " + player.name + " назначил Вас контроллировать фракцию " + fraction_name);
            getPlayer.dimension = 0;
            if(struct.person_data[getPlayer.id].g_fraction == 1) {
              getPlayer.spawn(new mp.Vector3(parseFloat(-2360.62060546875),parseFloat(3249.447265625),parseFloat(32.81074523925781)));
            } else if(struct.person_data[getPlayer.id].g_fraction == 2) {
              getPlayer.spawn(new mp.Vector3(parseFloat(457.596435546875),parseFloat(-990.7761840820312),parseFloat(30.689599990844727)));
            }
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
            /*
            if(struct.person_data[getPlayer.id].g_fraction == 1) {
              getPlayer.spawn(new mp.Vector3(parseFloat(-2360.62060546875),parseFloat(3249.447265625),parseFloat(32.81074523925781)));
            } else if(struct.person_data[getPlayer.id].g_fraction == 2) {
              getPlayer.spawn(new mp.Vector3(parseFloat(457.596435546875),parseFloat(-990.7761840820312),parseFloat(30.689599990844727)));
            }
            */
            systems.updateData(getPlayer, struct);
          } else {
            chat.local(player, 'FF0000', 'Выбранная вами фракция отсутствует!');
          }
        } else {
          chat.local(player, 'FF0000', 'Данный игрок не авторизован!');
        }
      } else {
        chat.local(player, 'FF0000', 'Ошибка! Выбранный вами игрок, не найден!');
      }
    }
  });

  mp.events.addCommand('getpos', (player, _, namepos) => {
    if(struct.login_data[player.id].group_id >= 2) {
      let get_pos = player.position;
      let get_heading = player.heading;
      chat.local(player, 'FFFFFF', "[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + ";");
      chat.local(player, 'FFFFFF', "Позиция успешно сохрана!");
      logger.write("[" + namepos + "]: " + "X: " + get_pos.x + "; Y: " + get_pos.y + "; Z: " + get_pos.z + "; [heading:" + get_heading + "]");
    }
  });

  /* Команды администратора */

  mp.events.addCommand('spawncars', (player) => {
    if(struct.login_data[player.id].group_id >= 3) {
      systems.spawnVehicle();
      player.outputChatBox('СпавнКарс!');
    }
  });

  mp.events.addCommand('saveall', (player) => {
    if(struct.login_data[player.id].group_id >= 3) {
      player.outputChatBox('Сохранено!');
    }
  });

  mp.events.addCommand('payday', (player) => {
    if(struct.login_data[player.id].group_id >= 3) {
      systems.paydayHour();
      player.outputChatBox('Выдан!');
    }
  });

  mp.events.addCommand('spawn', (player) => {
    if(struct.login_data[player.id].group_id >= 3) {
      player.spawn(new mp.Vector3(parseFloat(-258.0207824707031), parseFloat(-977.0762329101562), parseFloat(31.22001075744629)));
    }
  });

  mp.events.addCommand('skin', (player, _, skinName) => {
    if(struct.login_data[player.id].group_id >= 3) {
      if (skinName && skinName.trim().length > 0) {
        player.model = mp.joaat(skinName);
      } else {
        chat.local(player, 'FFFFFF', " > [/skin]: [имя модели]");
      }
    }
  });

  mp.events.addCommand('setweather', (player, _, weathername) => {
    if(struct.login_data[player.id].group_id >= 3) {
      mp.world.weather = weathername;
    }
  });

  mp.events.addCommand('settime', (player, _, time) => {
    if(struct.login_data[player.id].group_id >= 3) {
      mp.world.time.hour = parseInt(time);
      mp.world.time.minute = parseInt(time);
      mp.world.time.second = parseInt(time);
    }
  });

  mp.events.addCommand('setped', (player, _, shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) => {
    if(struct.login_data[player.id].group_id >= 3) {
      player.call('setHeadBlendData', parseInt(shapeFirstID), parseInt(shapeSecondID), parseInt(shapeThirdID), parseInt(skinFirstID), parseInt(skinSecondID), parseInt(skinThirdID), parseFloat(shapeMix), parseFloat(skinMix), parseFloat(thirdMix), isParent);
    }
  });

  mp.events.addCommand('saveall', (player, _, namepos) => {
    if(struct.login_data[player.id].group_id >= 3) {
      mp.players.forEach(_player => {
        if(struct.person_sys[_player.id].auth_status >= 1) {
          systems.updatePersonData(2, player, struct);
        }
      });
      player.outputChatBox('Сохранено!');
    }
  });

  mp.events.addCommand('addhouse', (player, _, rare, coast, interior, garage, max_cars) => {
    if(struct.login_data[player.id].group_id >= 3) {
      if(parseInt(rare) >= 0 && parseInt(coast) >= 0 && parseInt(interior) >= 0 && parseInt(garage) >= 0 && max_cars >= 1) {
        let get_id = 0;
        let get_count = 0;
        mysql.connection.query('SELECT COUNT(*) AS count FROM houses', [], function (error, results, fields) {
          get_count = results[0].count;
          let array_max_cars = new Array(parseInt(max_cars));
          let array_gen = {x: 'NONE', y: 'NONE', z: 'NONE'};
          for(let i = 0; i < max_cars; i++) {
            array_max_cars[i] = array_gen;
          }
          let max_cars_pos = JSON.stringify(array_max_cars);
          var query = mysql.connection.query('INSERT INTO houses SET pos_x = ?, pos_y = ?, pos_z = ?, pos_heading = ?, rare = ?, coast = ?, interior = ?, garage = ?, garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ?, max_cars_count = ?, max_cars_pos = ?', [player.position.x, player.position.y, player.position.z, player.heading, rare, coast, interior, garage, 0, 0, 0, 0, max_cars, max_cars_pos], function (error, results, fields) {
            console.log(error);
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
    if(struct.login_data[player.id].group_id >= 3) {
      if(parseInt(house) >= 1) {
        let get_house;
        mysql.connection.query('SELECT * FROM houses WHERE id = ?', [house], function (error, results, fields) {
          get_house = results[0];
          if(get_house) {
            var query = mysql.connection.query('UPDATE `houses` SET garage_enter_pos_x = ?, garage_enter_pos_y = ?, garage_enter_pos_z = ?, garage_enter_pos_r = ? WHERE id = ?', [player.position.x, player.position.y, player.position.z, player.heading, house], function (error, results, fields) {
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
    if(struct.login_data[player.id].group_id >= 3) {
      if(parseInt(house) >= 0 && parseInt(cell) >= 0) {
        let get_house;
        mysql.connection.query('SELECT * FROM houses WHERE id = ?', [house], function (error, results, fields) {
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
              var query = mysql.connection.query('UPDATE `houses` SET max_cars_pos = ? WHERE id = ?', [max_cars_pos,house], function (error, results, fields) {
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
