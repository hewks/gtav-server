/*================================*/
/* LSFIVEM.COM / vk.com/tellarion */
/*================================*/

exports = function(auth_data, forms_data) {

  mp.events.add('voiceChatLoader', (id, username) => {
    voice_data.execute(`voice_loader('${id}', '${username}');`);
  });

  mp.events.add('voiceActive_passive', (id, username) => {
    voice_data.execute(`voice_set1('${id}', '${username}');`);
    let getPlayer = () => {
    let get_player = ``;
      mp.players.forEach(
        (player, id) => {
          if(player.name == username) {
            get_player = player;
          }
        }
      );
      return get_player;
    };
    let get_player_voice = getPlayer();
    let get_my_position =  mp.players.local;
    let volume = 100;
    voicer_distance[id] = setInterval(function () {
        distance = Math.round(mp.game.system.vdist2(get_player_voice.position.x, get_player_voice.position.y, get_player_voice.position.z, get_my_position.position.x, get_my_position.position.y, get_my_position.position.z) / 3);
        if(parseInt(distance) >= 0 && parseInt(distance) <= 4) {
          volume = 1;
        } else if(parseInt(distance) >= 0 && parseInt(distance) <= 4) {
          volume = 0.9;
        } else if(parseInt(distance) >= 5 && parseInt(distance) <= 9) {
          volume = 0.8;
        } else if(parseInt(distance) >= 10 && parseInt(distance) <= 14) {
          volume = 0.7;
        } else if(parseInt(distance) >= 15 && parseInt(distance) <= 19) {
          volume = 0.6;
        } else if(parseInt(distance) >= 20 && parseInt(distance) <= 24) {
          volume = 0.5;
        } else if(parseInt(distance) >= 29 && parseInt(distance) <= 34) {
          volume = 0.4;
        } else if(parseInt(distance) >= 35 && parseInt(distance) <= 39) {
          volume = 0.3;
        } else if(parseInt(distance) >= 40 && parseInt(distance) <= 44) {
          volume = 0.2;
        } else if(parseInt(distance) >= 45 && parseInt(distance) <= 49) {
          volume = 0.1;
        } else {
          volume = 0;
        }
        voice_data.execute(`voice_noise('${id}', '${volume}', '${distance}');`);
      }, 1000);
  });

  mp.events.add('voiceActive_caller', (id, username) => {
    voice_data.execute(`voice_set2('${id}', '${username}');`);
  });

  mp.events.add("aLogin", () => {
    forms_data.execute('$("#alogin_form").fadeIn(1000);');
    mp.gui.chat.show(false);
    forms_data.execute('mp.invoke("focus", true);');
  });

  mp.events.add("playerEnterCheckpoint", (checkpoint) => {
    if(actual_checkpoint[0] == checkpoint) {
      var gen_array = new Array(3);
      gen_array[0] = "send_checkpoint_get";
      gen_array[1] = actual_checkpoint_data['type'];
      gen_array = JSON.stringify(gen_array);
      mp.events.callRemote('clientData', gen_array);
    }
  });

  mp.events.add('delCheckPoint', () => {

    actual_checkpoint[0].destroy();

  });

  mp.events.add('addCheckPoint', (type, position, num) => {

    if(parseInt(type) == 0) {
      actual_checkpoint[0] = mp.checkpoints.new(4, position, 7,
      {
          direction: new mp.Vector3(0, 0, 0),
          color: [ 255, 255, 255, 255 ],
          visible: true,
          dimension: 0
      });
      actual_checkpoint_data['type'] = 0;
    } else if(parseInt(type) == 1) {
      actual_checkpoint[0] = mp.checkpoints.new(num, position, 7,
      {
          direction: new mp.Vector3(0, 0, 0),
          color: [ 255, 255, 255, 255 ],
          visible: true,
          dimension: 0
      });
      actual_checkpoint_data['type'] = 1;
    } else if(parseInt(type) == 10) {
      actual_checkpoint[0] = mp.checkpoints.new(num, position, 7,
      {
          direction: new mp.Vector3(0, 0, 0),
          color: [ 255, 255, 255, 255 ],
          visible: true,
          dimension: 0
      });
      actual_checkpoint_data['type'] = 10;
    } else if(parseInt(type) == 11) {
      actual_checkpoint[0] = mp.checkpoints.new(num, position, 7,
      {
          direction: new mp.Vector3(0, 0, 0),
          color: [ 255, 255, 255, 255 ],
          visible: true,
          dimension: 0
      });
      actual_checkpoint_data['type'] = 11;
    }

  });

  mp.events.add('delMapPoint', () => {
    actual_blip_point[0].destroy();
  });

  mp.events.add('addMapPoint', (type, position) => {

    if(parseInt(type) == 1) {
      actual_blip_point[0] = mp.blips.new(1, position,
      {
          name: 'Чекпоинт',
          scale: 1.4,
          color: 0,
          alpha: 255,
          drawDistance: 100,
          shortRange: true,
          rotation: false,
          dimension: 0,
      });
    }

  });

  mp.events.add('render', (nametags) => {
    const graphics = mp.game.graphics;
    const screenRes = graphics.getScreenResolution(0, 0);

    nametags.forEach(nametag => {
        let [player, x, y, distance] = nametag;

        if(distance <= maxDistance) {
            let scale = (distance / maxDistance);
            if(scale < 0.6) scale = 0.6;

            var health = player.getHealth();
            health = health < 100 ? health / 100 : ((health - 100) / 100);

            var armour = player.getArmour() / 100;

            y -= scale * (0.005 * (screenRes.y / 1080));

            let serverid = player.remoteId;

            mp.game.graphics.drawText(`${player.name} [${serverid}]`, [x, y], {
              font: 4,
              color: [255,255,255,255],
              scale: [0.4, 0.4],
              outline: true
            });

            //graphics.drawText(player.name.replace('_', ' '), 4, color, 0.4, 0.4, true, x, y);

            let y2 = y + 0.042;

            if(armour > 0) {
              let x2 = x - width / 2 - border / 2;

              graphics.drawRect(x2, y2, width + border * 2, 0.0085, 0, 0, 0, 200);
              graphics.drawRect(x2, y2, width, height, 150, 150, 150, 255);
              graphics.drawRect(x2 - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);
              x2 = x + width / 2 + border / 2;
              graphics.drawRect(x2, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
              graphics.drawRect(x2, y2, width, height, 41, 66, 78, 255);
              graphics.drawRect(x2 - width / 2 * (1 - armour), y2, width * armour, height, 48, 108, 135, 200);
            }
            else {
              graphics.drawRect(x, y2, width + border * 2, height + border * 2, 0, 0, 0, 200);
              graphics.drawRect(x, y2, width, height, 150, 150, 150, 255);
              graphics.drawRect(x - width / 2 * (1 - health), y2, width * health, height, 255, 255, 255, 200);
            }
        }
    });
  });

mp.events.add('gFractionWarehouse', (fraction) => {
    if(parseInt(fraction) == 1) {
      forms_data.execute('$("#gun_panel_army").fadeIn(1000);');
    } else if(parseInt(fraction) == 2) {
      forms_data.execute('$("#gun_panel_police").fadeIn(1000);');
    }
    forms_data.execute('mp.invoke("focus", true);');
    mp.gui.chat.show(false);
  });

    mp.events.add('registrationTestComplete', () => {
      forms_data.execute(`registerTestingEnd('')`);
    });

    mp.events.add('registrationTest', (count_questions, questions) => {
      forms_data.execute(`registerTesting('${count_questions}', '${questions}');`);
    });

    mp.events.add('captureGangStop', (blip, winner_color) => {
      mp.game.invoke('0xA8FD2D5529E1737', blip, false);
      mp.game.invoke('0xC71C8E276E3EC54', blip, winner_color);
      auth_data.execute(`close_gang_war();`);
    });

    mp.events.add('captureGangStart', (blip, counter1, counter2, timerx) => {
      mp.game.invoke('0xA8FD2D5529E1737', blip, true);
      mp.game.invoke('0xC71C8E276E3EC54', blip, 62);
      auth_data.execute(`show_gang_war('${counter1}', '${counter2}', '${timerx}');`);
    });

    mp.events.add('shakeDrugs', (aptute) => {
      mp.game.invoke('0x2269709BAFC7A1E5', "FAMILY5_DRUG_TRIP_SHAKE", parseFloat(aptute));
      setTimeout(function() { mp.game.invoke('0x2269709BAFC7A1E5', "FAMILY5_DRUG_TRIP_SHAKE", 0); }, 30000);
    });

    mp.events.add('buyDrugs', () => {
      forms_data.execute('$("#drugs_form").fadeIn(1000);');
      mp.gui.chat.show(false);
      forms_data.execute('mp.invoke("focus", true);');
    });

    mp.events.add('webPlayer', (type) => {
      if(parseInt(type) == 0) {
        forms_data.execute('$("#webplayer_form").fadeIn(1000);');
        mp.gui.chat.show(false);
        forms_data.execute('mp.invoke("focus", true);');
      }
    });

    mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
      aptute = 0.1;
      mp.game.invoke('0x2269709BAFC7A1E5', "MEDIUM_EXPLOSION_SHAKE", parseFloat(aptute));
    });

    mp.events.add('hiddenGangZone', (blip) => {
      mp.game.invoke('0xF20857E4CB32A2B7', blip, 0);
    });

    mp.events.add('setGangZone', (hashes, blip, x, y, z, dist) => {
      mp.game.invoke(`${hashes[1]}`, blip, parseFloat(dist));
      mp.game.invoke(`${hashes[0]}`, blip, parseFloat(x), parseFloat(y), parseFloat(z));
      //auth_data.execute(`alert('${dist} and ${hashes[1]}');`);
    });

    mp.events.add('storeView', (type) => {
      if(parseInt(type) == 1) {
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        forms_data.execute('mp.invoke("focus", true);');
        forms_data.execute(`store_view();`);
      } else {
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        forms_data.execute('mp.invoke("focus", false);');
        forms_data.execute('$("#store_form_clothes").fadeOut(1000);');
      }
    });

    mp.events.add('addGangZone', (zoneid, hashes, x, y, z, radius, color) => {
      blip = mp.game.ui.addBlipForRadius(parseFloat(x), parseFloat(y), parseFloat(z), parseInt(radius));
      mp.game.invoke(`${hashes[0]}`, blip, 100);
      mp.game.invoke(`${hashes[1]}`, blip, 5);
      mp.game.invoke(`${hashes[2]}`, blip, parseInt(color));
      mp.game.invoke(`${hashes[3]}`, blip, 3);
      mp.game.invoke(`${hashes[4]}`, blip, true);
      let array_gen = new Array(2);
      array_gen[0] = 'sendGangZone';
      array_gen[1] = blip;
      array_gen[2] = parseInt(zoneid);
      mp.events.callRemote('clientData', JSON.stringify(array_gen));
    });

    mp.events.add('rentDialog', (coast) => {
      forms_data.execute(`rentTransForm('${coast}');`);
    });

    mp.events.add('entityStreamIn', (entity) => {
      let timer1, timer2;
      let posx, realid;
      let getPlayer = () => {
        let get_player = ``;
        if(entity.type === 'player') {
          get_player = entity;
        } else {
          get_player = "NONE";
        }
        return get_player;
      };

      let getter_pos = getPlayer();

      if(getter_pos != "NONE") {
        var gen_array = new Array(3);
        gen_array[0] = "send_client_playerid";
        gen_array[1] = getter_pos.name;
        gen_array = JSON.stringify(gen_array);
        mp.events.callRemote('clientData', gen_array);
      }

    });

    mp.events.add('entityStreamOut', (entity) => {
      if(entity.type === 'player') {
        clearInterval(timer_id[entity.name]);
        clearInterval(timer_id_reconnect[entity.name]);
      }
    });

    mp.events.add('setShowIDPlayerRadius', (srvid, ownid) => {

      function chat_head(serverid, ownerid) {
          posx_player = serverid.position;
          posx_owner = ownerid.position;
          distance = Math.round(mp.game.system.vdist2(posx_player.x, posx_player.y, posx_player.z, posx_owner.x, posx_owner.y, posx_owner.z) / 3);
          if(distance <= 30) {
            mp.game.graphics.drawText(`ID: ${serverid.id}`, [posx_player.x, posx_player.y, posx_player.z+1.3], {
              font: 0,
              color: [204, 204, 204, 255],
              scale: [0.2, 0.2],
              outline: true
            });
          } else {
            clearInterval(timer_id[serverid.name]);
            timer_id_reconnect[serverid.name] = setInterval(function () { reconnect_distance(serverid, ownerid); }, 1000);
          }
        }

        function reconnect_distance(serverid, ownerid) {
          posx_player = serverid.position;
          posx_owner = ownerid.position;
          distance = Math.round(mp.game.system.vdist2(posx_player.x, posx_player.y, posx_player.z, posx_owner.x, posx_owner.y, posx_owner.z) / 3);
          if(distance <= 30) {
            timer_id[srvid.name] = setInterval(function() { chat_head(serverid, ownerid); }, 1);
          }
        }

        timer_id[srvid.name] = setInterval(function() { chat_head(srvid, ownid); }, 1);

    });

    mp.events.add('setWantedLevel', (wanted) => {
      mp.game.gameplay.setFakeWantedLevel(parseInt(wanted));
    });

    mp.events.add('voiceChatLoader', (id, username) => {
      voice_data.execute(`voice_loader('${id}', '${username}');`);
    });

    mp.events.add('voiceActive_passive', (id, username) => {
      voice_data.execute(`voice_set1('${id}', '${username}');`);
    });

    mp.events.add('voiceActive_caller', (id, username) => {
      voice_data.execute(`voice_set2('${id}', '${username}');`);
    });

    mp.events.add('voiceCancel', (id) => {
      voice_data.execute(`voice_cancel('${id}');`);
    });

    mp.events.add('updateSpeedometr_1', (car_name) => {
      forms_data.execute(`$("#speedometr_form").fadeIn(1000);`);
      forms_data.execute(`updateVehicleName('${car_name}');`);
      forms_data.execute(`updateVehicleSpeed(1);`);
    });

    mp.events.add('updateSpeedometr_2', () => {
      let speed = mp.players.local.getSpeed();
      speed = Math.floor(speed * 2.236936);
      forms_data.execute(`updateVehicleSpeedAction2('${speed}');`);
    });

    mp.events.add('disabledSpeedometr', () => {
      forms_data.execute(`$("#speedometr_form").fadeOut(1000);`);
      forms_data.execute(`updateVehicleSpeed(2);`);
    });


    mp.events.add('clearTask', (time) => {
      function clear_sex_my_body() {
        mp.players.local.clearTasks();
      }
      setTimeout(clear_sex_my_body, parseInt(time));
    });

    mp.events.add('drawGameTextChat', (username, message) => {
      let timer1, timer2;
      let posx;
      //auth_data.execute(`alert(1);`);
      let getPlayer = () => {
        let get_player = ``;
        mp.players.forEach(
          (player, id) => {
            if(player.name == username) {
              //auth_data.execute(`alert('player: ${player.id}; info_srv: ${get_id}');`);
              get_player = player;
            }
          }
        );
        return get_player;
      };
      let getter_pos = getPlayer();
      function chat_head() {
        posx = getter_pos.position;
        mp.game.graphics.drawText(message, [posx.x, posx.y, posx.z+1.4], {
          font: 0,
          color: [204, 204, 204, 255],
          scale: [0.3, 0.3],
          outline: false
        });
      }
      timer1 = setInterval(chat_head, 1);
      timer2 = setTimeout(function() { clearInterval(timer1); }, 5000);
    });

    mp.events.add('storeView', (type) => {
      if(parseInt(type) == 1) {
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
        auth_data.execute('mp.invoke("focus", true);');
        auth_data.execute(`store_view();`);
      } else {
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        auth_data.execute('mp.invoke("focus", false);');
        auth_data.execute('$("#store_form_clothes").fadeOut(1000);');
      }
    });

    mp.events.add("showNPanel_click", function (state, player) {
      if(parseInt(state) == 1) {
        forms_data.execute('$("#npanel_form").fadeOut(1000);');
        forms_data.execute('$("#npanel_form_ads").fadeIn(1000);');
      } else if(parseInt(state) == 2) {

      } else if(parseInt(state) == 3) {
        mp.gui.chat.show(true);
        forms_data.execute('mp.invoke("focus", false);');
        forms_data.execute('$("#npanel_form").fadeOut(1000);');
      }
    });

    mp.events.add('NPanel_data', (type, result) => {
      if(parseInt(type) == 0) {
        forms_data.execute(`showAdsUpdate('UNKNOWN')`);
      } else if(parseInt(type) == 1) {
        forms_data.execute(`showAdsUpdate('${result}')`);
      }
    });

    mp.events.add('nMenu', () => {
      forms_data.execute('$("#npanel_form").fadeIn(1000);');
      forms_data.execute('mp.invoke("focus", true);');
      mp.gui.chat.show(false);
    });

    mp.events.add('controlObject', (type) => {
      if(parseInt(type) == 1) {
        forms_data.execute('mp.invoke("focus", true);');
        auth_data.execute('$("#control_object").fadeIn(1000);');
      } else {
        forms_data.execute('$("#control_object").fadeOut(1000);');
        forms_data.execute('mp.invoke("focus", false);');
      }
    });

    mp.events.add('updateTab', (text, online) => {
      let get_dat = text.replace(/\n/g, '').replace(/"/g, '"');
      auth_data.execute(`addTab('${get_dat}', '${online}');`);
    });

    mp.events.add('clearTab', () => {
      auth_data.execute(`clearTab();`);
    });

    mp.events.add('updateSpeedometr_1', (car_name) => {
      auth_data.execute(`$("#speedometr_form").fadeIn(1000);`);
      auth_data.execute(`updateVehicleName('${car_name}');`);
      auth_data.execute(`updateVehicleSpeed(1);`);
    });

    mp.events.add('updateSpeedometr_2', () => {
      let speed = mp.players.local.getSpeed();
      speed = Math.floor(speed * 2.236936);
      auth_data.execute(`updateVehicleSpeedAction2('${speed}');`);
    });

    mp.events.add('disabledSpeedometr', () => {
      auth_data.execute(`$("#speedometr_form").fadeOut(1000);`);
      auth_data.execute(`updateVehicleSpeed(2);`);
    });

    mp.events.add('showHouseMenu', (house_number, house_info1, house_info2) => {
      auth_data.execute(`showHouseForm('${house_number}', '${house_info1}', '${house_info2}');`);
    });

    mp.events.add('freezePlayer', (type) => {
      if(type == "1") {
        mp.players.local.freezePosition(true);
      } else {
        mp.players.local.freezePosition(false);
      }
    });

    mp.events.add('taskScenario', (scenarioName, unkDelay) => {
      mp.players.local.taskStartScenarioInPlace(scenarioName, parseInt(unkDelay), true);
    });

    mp.events.add("doorControl", (doorHash,x,y,z,locked,p5, p6, p7) => {
        mp.game.object.doorControl(doorHash, parseFloat(x), parseFloat(y), parseFloat(z), locked, parseFloat(p5), parseFloat(p6), parseFloat(p7));
    });

    mp.events.add("setHeadBlendData", (shapeFirstID, shapeSecondID, shapeThirdID, skinFirstID, skinSecondID, skinThirdID, shapeMix, skinMix, thirdMix, isParent) => {
         mp.players.local.setHeadBlendData(parseInt(shapeFirstID), parseInt(shapeSecondID), parseInt(shapeThirdID), parseInt(skinFirstID), parseInt(skinSecondID), parseInt(skinThirdID), parseFloat(shapeMix), parseFloat(skinMix), parseFloat(thirdMix), true);
    });

    mp.events.add("changePlayerCameraPosition", (x,y,z,rx,ry,rz) => {
        var cam = mp.cameras.new('default',new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z)),new mp.Vector3(parseFloat(rx),parseFloat(ry), parseFloat(rz) ),90.0);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 15000, true, false);
    });

    mp.events.add("changePlayerCameraPosition", (x,y,z,rx,ry,rz) => {
        var cam = mp.cameras.new('default',new mp.Vector3(parseFloat(x),parseFloat(y),parseFloat(z)),new mp.Vector3(parseFloat(rx),parseFloat(ry), parseFloat(rz) ),90.0);
        cam.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 15000, true, false);
    });

    mp.events.add("returnPlayerCamera", function (time = 0) {
        mp.game.cam.renderScriptCams(false, true, time, true, false);
    });

    mp.events.add("gameChat", function (state) {
      if(state === 1) {
        mp.gui.chat.show(false);
        mp.game.ui.displayRadar(false);
      } else if(state === 2) {
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
      }
    });

    mp.events.add("showMainMenu", function (state) {
      if(parseInt(state) == 1) {
        mp.gui.chat.show(false);
        forms_data.execute('mp.invoke("focus", true);');
        forms_data.execute('$("#mainmenu_form").fadeIn(1000);');
      } else if(parseInt(state) == 2) {
        forms_data.execute('$("#mainmenu_form").fadeIn(1000);');
        forms_data.execute('$("#mainmenu_form_settings").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_helper").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_stats_1").fadeOut(1000);');
      }
    });

    mp.events.add("showMainMenu_click", function (state, player) {
      if(parseInt(state) == 1) {
        forms_data.execute('$("#mainmenu_form").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_stats_1").fadeIn(1000);');
      } else if(parseInt(state) == 2) {
        forms_data.execute('$("#mainmenu_form").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_settings").fadeIn(1000);');
      } else if(parseInt(state) == 3) {
        forms_data.execute('$("#mainmenu_form").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_helper").fadeIn(1000);');
      } else if(parseInt(state) == 4) {
        forms_data.execute('$("#mainmenu_form").fadeOut(1000);');
        forms_data.execute('$("#mainmenu_form_donate").fadeIn(1000);');
      } else if(parseInt(state) == 5) {
        mp.gui.chat.show(true);
        forms_data.execute('mp.invoke("focus", false);');
        forms_data.execute('$("#mainmenu_form").fadeOut(1000);');
      } else {

      }
    });

    mp.events.add('callerMenu', () => {
      forms_data.execute('$("#calls_form").fadeIn(1000);');
      forms_data.execute('mp.invoke("focus", true);');
    });

    mp.events.add("showCallMenu_click", function (state, player) {
      if(parseInt(state) == 1) {
        forms_data.execute('$("#calls_form").fadeOut(1000);');
        forms_data.execute('$("#calls_form_about_taxi").fadeIn(1000);');
      } else if(parseInt(state) == 2) {
        forms_data.execute('$("#calls_form").fadeOut(1000);');
        forms_data.execute('$("#calls_form_about_police").fadeIn(1000);');
      } else if(parseInt(state) == 3) {
        mp.gui.chat.show(true);
        mp.game.ui.displayRadar(true);
        forms_data.execute('mp.invoke("focus", false);');
        forms_data.execute('$("#calls_form").fadeOut(1000);');
      } else {

      }
    });

    mp.events.add('playerGUIStats', (person) => {
      person = JSON.parse(person);
      forms_data.execute(`updateStatsMain('${person.g_money}', '${person.g_hungry}');`);
    });

    mp.events.add('playerGUIStatsUpdate_1', (person, g_job_name, g_fraction_name, g_fraction_name_rang, g_gang_name, g_gang_name_rang) => {
      person = JSON.parse(person);
      person.g_sex = (person.g_sex == 0) ? "Мужской" : "Женский";
      forms_data.execute(`updateStats_1('${person.g_name}', '${person.g_sex}', '${person.g_level}', '${person.g_exp}', '${person.g_money}', '${person.g_victims}', '${person.g_respect}', '${person.g_zavisim}', '${person.g_drugs}', '${person.g_materials}', '${g_job_name}', '${g_fraction_name}', '${g_fraction_name_rang}', '${g_gang_name}', '${g_gang_name_rang}');`);
    });

    mp.events.add('playerShowIDCard', (person, fraction, rang) => {
      person = JSON.parse(person);
      person.g_sex = (person.g_sex == 0) ? "Мужской" : "Женский";
      switch(person.g_fraction) {
        case 0: person.g_fraction = "-"; break;
      }
      switch(person.g_rang) {
        case 0: person.g_rang = "-"; break;
      }
      switch(person.g_job) {
        case 0: person.g_job = "-"; break;
      }
      forms_data.execute(`updateStats_10('${person.g_name}', '${person.g_sex}', '${person.g_victims}', '${person.g_respect}', '${fraction}', '${rang}', '${person.g_job}');`);
      forms_data.execute('$("#idcard_form_stats_1").fadeIn(1000);');
    });

    mp.events.add('showWrongForm', (formid, wrong) => {
      forms_data.execute(`show_wrong_form('${formid}', '${wrong}');`);
    });

    mp.events.add('showSuccessForm', (formid, success) => {
      forms_data.execute(`show_success_form('${formid}', '${success}');`);
    });

    mp.events.add('createPerson', () => {
      forms_data.execute(`show_create_person();`);
    });

    mp.events.add('endPerson', () => {
      forms_data.execute(`show_end_person();`);
    });

    mp.events.add('cefData', function() {
      mp.events.callRemote('clientData', JSON.stringify(arguments));
    });

}
