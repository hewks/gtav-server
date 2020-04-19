/* INITIAL MODULES */

var fs = require('fs');

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

/* CONFIGS */
var vehicles_cfg = require('./configs/vehicles.js');

var date = new Date();

/* HOUSE SYSTEM LOADED */
var loaded_houses_count = 0;
mysql.connection.query('SELECT * FROM houses', [], function (error, results, fields) {
	for(let i = 0; i < results.length; i++) {
		let status_busy = (parseInt(results[i].state) == 1) ? 1 : 2;
		configure.housesblips[i] = mp.blips.new(40, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)),
		{
				name: "house",
		    scale: 1,
		    color: status_busy,
		    drawDistance: 100,
		    shortRange: 100,
		    rotation: 0,
		    dimension: 0,
		});
		configure.housesmarkers[i] = mp.markers.new(0, new mp.Vector3(parseFloat(results[i].pos_x), parseFloat(results[i].pos_y), parseFloat(results[i].pos_z)), 1,
		{
		    direction: new mp.Vector3(0,0,0),
		    rotation: new mp.Vector3(0,0,0),
		    visible: true,
		    dimension: 0
		});
		configure.housesmarkers[i].setColor(255, 247, 0, 255);
		configure.housescolshapes[i] = mp.colshapes.newRectangle(results[i].pos_x, results[i].pos_y, 1, 1);
		configure.housesnumber[i] = results[i].id;
		configure.housestate[i] = results[i].state;
		configure.housesrare[i] = results[i].rare;
		configure.housesowner[i] = results[i].owner;
		configure.housescoast[i] = results[i].coast;
		configure.housesinterior[i] = results[i].interior;
		configure.housesgarage[i] = results[i].garage;
		if(configure.housesgarage[i] != 0) {
			configure.housesgaragecolshapes[i] = mp.colshapes.newRectangle(results[i].garage_pos_x, results[i].garage_pos_y, 1, 1);
		}
		loaded_houses_count++;
	}
	console.log('Loaded houses:' + loaded_houses_count.toString());
});

/* OTHER MARKERS TP */
/* City Hall */
configure.othermarkers[0] = mp.markers.new(0, new mp.Vector3(parseFloat(237.8629913330078), parseFloat(-413.01593017578125), parseFloat(48.111942291259766)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[0].setColor(255, 247, 0, 255);
configure.othercolshapes[0] = mp.colshapes.newRectangle(parseFloat(237.8629913330078), parseFloat(-413.01593017578125), 1, 1);
configure.othermarkers[1] = mp.markers.new(0, new mp.Vector3(parseFloat(232.8357696533203), parseFloat(-411.3126525878906), parseFloat(48.11194610595703)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[1].setColor(255, 247, 0, 255);
configure.othercolshapes[1] = mp.colshapes.newRectangle(parseFloat(232.8357696533203), parseFloat(-411.3126525878906), 1, 1);
configure.othermarkers[2] = mp.markers.new(0, new mp.Vector3(parseFloat(112.64517211914062), parseFloat(-639.3717041015625), parseFloat(206.04666137695312)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[2].setColor(255, 247, 0, 255);
configure.othercolshapes[2] = mp.colshapes.newRectangle(parseFloat(112.64517211914062), parseFloat(-639.3717041015625), 1, 1);
configure.othermarkers[3] = mp.markers.new(29, new mp.Vector3(parseFloat(113.93478393554688), parseFloat(-618.6810302734375), parseFloat(206.04664611816406)), 2, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.othermarkers[3].setColor(255, 247, 0, 255);
configure.othercolshapes[3] = mp.colshapes.newRectangle(parseFloat(113.93478393554688), parseFloat(-618.6810302734375), 1, 1);
/* JOB SYSTEM LOADED */

/* FIRST JOB = Сварщик */

configure.jobsmarkers[0] = mp.markers.new(1, new mp.Vector3(parseFloat(-132.2976837158203), parseFloat(-940.2294921875), parseFloat(28)), 2, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobsmarkers[0].setColor(255, 247, 0, 255);
configure.jobscolshapes[0] = mp.colshapes.newRectangle(parseFloat(-132.2976837158203), parseFloat(-940.2294921875), 1, 1);

configure.jobs_1_markers[0] = mp.markers.new(30, new mp.Vector3(parseFloat(-136.5608367919922), parseFloat(-946.8843994140625), parseFloat(29.291906356811523)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[0].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[0] = mp.colshapes.newRectangle(parseFloat(-136.5608367919922), parseFloat(-946.8843994140625), 1, 1);

configure.jobs_1_markers[1] = mp.markers.new(30, new mp.Vector3(parseFloat(-146.46995544433594), parseFloat(-943.2619018554688), parseFloat(29.291906356811523)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[1].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[1] = mp.colshapes.newRectangle(parseFloat(-146.46995544433594), parseFloat(-943.2619018554688), 1, 1);
configure.jobs_1_markers[2] = mp.markers.new(30, new mp.Vector3(parseFloat(-150.2559814453125), parseFloat(-945.1087646484375), parseFloat(21.276844024658203)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[2].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[2] = mp.colshapes.newRectangle(parseFloat(-150.2559814453125), parseFloat(-945.1087646484375), 1, 1);
configure.jobs_1_markers[3] = mp.markers.new(30, new mp.Vector3(parseFloat(-144.55648803710938), parseFloat(-946.2548217773438), parseFloat(21.276845932006836)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[3].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[3] = mp.colshapes.newRectangle(parseFloat(-144.55648803710938), parseFloat(-946.2548217773438), 1, 1);
configure.jobs_1_markers[4] = mp.markers.new(30, new mp.Vector3(parseFloat(-139.45233154296875), parseFloat(-948.7388305664062), parseFloat(21.2768497467041)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[4].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[4] = mp.colshapes.newRectangle(parseFloat(-139.45233154296875), parseFloat(-948.7388305664062), 1, 1);
configure.jobs_1_markers[5] = mp.markers.new(30, new mp.Vector3(parseFloat(-175.44996643066406), parseFloat(-1014.318115234375), parseFloat(21.27684211730957)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[5].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[5] = mp.colshapes.newRectangle(parseFloat(-175.44996643066406), parseFloat(-1014.318115234375), 1, 1);
configure.jobs_1_markers[6] = mp.markers.new(30, new mp.Vector3(parseFloat(-165.9763946533203), parseFloat(-1016.966552734375), parseFloat(21.27684211730957)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[6] = mp.colshapes.newRectangle(parseFloat(-165.9763946533203), parseFloat(-1016.966552734375), 1, 1);
configure.jobs_1_markers[6].setColor(255, 247, 0, 255);
configure.jobs_1_markers[7] = mp.markers.new(30, new mp.Vector3(parseFloat(-94.85835266113281), parseFloat(-965.0274047851562), parseFloat(21.276844024658203)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[7] = mp.colshapes.newRectangle(parseFloat(-94.85835266113281), parseFloat(-965.0274047851562), 1, 1);
configure.jobs_1_markers[7].setColor(255, 247, 0, 255);
configure.jobs_1_markers[8] = mp.markers.new(30, new mp.Vector3(parseFloat(-83.21043395996094), parseFloat(-969.4396362304688), parseFloat(21.276865005493164)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_colshapes[8] = mp.colshapes.newRectangle(parseFloat(-83.21043395996094), parseFloat(-969.4396362304688), 1, 1);
configure.jobs_1_markers[8].setColor(255, 247, 0, 255);
configure.jobs_1_markers[9] = mp.markers.new(30, new mp.Vector3(parseFloat(-114.25918579101562), parseFloat(-1024.926025390625), parseFloat(27.273557662963867)), 1, { direction: new mp.Vector3(0,0,0), rotation: new mp.Vector3(0,0,0), visible: true, dimension: 0 });
configure.jobs_1_markers[9].setColor(255, 247, 0, 255);
configure.jobs_1_colshapes[9] = mp.colshapes.newRectangle(parseFloat(-114.25918579101562), parseFloat(-1024.926025390625), 1, 1);

/* TWO JOB = Строитель */

/* SPAWN BASE VEHICLES */

setInterval(systems.spawnVehicle, 600000);
//setInterval(spawnVehicle, 30000, vehb);

/* BLIPS HELPER LIST */

var blipshs = new Array(100);

/* Сварщик */
blipshs[0] = mp.blips.new(108, new mp.Vector3(parseFloat(-132.2976837158203), parseFloat(-940.2294921875), parseFloat(29.291887283325195)),
{
		name: "job_1",
		scale: 1.2,
		color: 2,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Стройка */
blipshs[1] = mp.blips.new(108, new mp.Vector3(parseFloat(141.08848571777344), parseFloat(-379.62835693359375), parseFloat(43.25701141357422)),
{
		name: "job_2",
		scale: 1.2,
		color: 2,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Такси */
blipshs[2] = mp.blips.new(108, new mp.Vector3(parseFloat(910.4586181640625), parseFloat(-176.25347900390625), parseFloat(74.2528076171875)),
{
		name: "job_2",
		scale: 1.2,
		color: 2,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Мэрия */
blipshs[3] = mp.blips.new(419, new mp.Vector3(parseFloat(238.14366149902344), parseFloat(-404.02764892578125), parseFloat(47.924354553222656)),
{
		name: "cityhall",
		scale: 1.2,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Полицейский участок */
blipshs[4] = mp.blips.new(60, new mp.Vector3(parseFloat(434.3514404296875), parseFloat(-981.9362182617188), parseFloat(30.709924697875977)),
{
		name: "police",
		scale: 1.2,
		color: 67,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Магазин одежды */
blipshs[5] = mp.blips.new(73, new mp.Vector3(parseFloat(417.7280578613281), parseFloat(-807.645263671875), parseFloat(29.39516830444336)),
{
		name: "clothes",
		scale: 1.2,
		color: 5,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Grove */
blipshs[6] = mp.blips.new(84, new mp.Vector3(parseFloat(-250.99754333496094), parseFloat(-1529.802490234375), parseFloat(31.589208602905273)),
{
		name: "grove",
		scale: 1.2,
		color: 25,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* Ballas */
blipshs[7] = mp.blips.new(84, new mp.Vector3(parseFloat(129.06565856933594), parseFloat(-1298.933837890625), parseFloat(29.232744216918945)),
{
		name: "ballas",
		scale: 1.2,
		color: 7,
		alpha: 255,
		drawDistance: 100,
		shortRange: 100,
		rotation: 0,
		dimension: 0,
});

/* MARKERS LIST AND COLSHAPES FRACTIONS */
/* ARMY */

configure.fractionsmarkers[0] = mp.markers.new(1, new mp.Vector3(parseFloat(-2345.309814453125), parseFloat(3268.33349609375), parseFloat(31,9)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[0].setColor(255, 247, 0, 255);
configure.fractionscolshapes[0] = mp.colshapes.newRectangle(parseFloat(-2345.309814453125), parseFloat(3268.33349609375), 1, 1);

configure.fractionsmarkers[1] = mp.markers.new(31, new mp.Vector3(parseFloat(-2358.109130859375), parseFloat(3255.239013671875), parseFloat(32.810760498046875)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[1].setColor(255, 247, 0, 255);
configure.fractionscolshapes[1] = mp.colshapes.newRectangle(parseFloat(-2358.109130859375), parseFloat(3255.239013671875), 1, 1);

configure.fractionsmarkers[2] = mp.markers.new(30, new mp.Vector3(parseFloat(-2345.5615234375), parseFloat(3232.531005859375), parseFloat(34.74293899536133)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[2].setColor(255, 247, 0, 255);
configure.fractionscolshapes[2] = mp.colshapes.newRectangle(parseFloat(-2345.5615234375), parseFloat(3232.531005859375), 1, 1);

/* LSPD */

configure.fractionsmarkers[3] = mp.markers.new(1, new mp.Vector3(parseFloat(441.6317138671875), parseFloat(-981.2515258789062), parseFloat(29.489584732055664)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[3].setColor(255, 247, 0, 255);
configure.fractionscolshapes[3] = mp.colshapes.newRectangle(parseFloat(441.6317138671875), parseFloat(-981.2515258789062), 1, 1);

configure.fractionsmarkers[4] = mp.markers.new(31, new mp.Vector3(parseFloat(450.68304443359375), parseFloat(-992.6552734375), parseFloat(30.68960189819336)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[4].setColor(255, 247, 0, 255);
configure.fractionscolshapes[4] = mp.colshapes.newRectangle(parseFloat(450.68304443359375), parseFloat(-992.6552734375), 1, 1);

configure.fractionsmarkers[5] = mp.markers.new(30, new mp.Vector3(parseFloat(451.7151794433594), parseFloat(-980.2782592773438), parseFloat(30.689590454101562)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.fractionsmarkers[5].setColor(255, 247, 0, 255);
configure.fractionscolshapes[5] = mp.colshapes.newRectangle(parseFloat(451.7151794433594), parseFloat(-980.2782592773438), 1, 1);

/* GANG MARKERS AND COLSHAPES */

/* GROVE */
configure.gangsmarkers[0] = mp.markers.new(0, new mp.Vector3(parseFloat(-250.99754333496094), parseFloat(-1529.802490234375), parseFloat(31.589208602905273)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.gangsmarkers[0].setColor(255, 247, 0, 255);
configure.gangscolshapes[0] = mp.colshapes.newRectangle(parseFloat(-250.99754333496094), parseFloat(-1529.802490234375), 1, 1);

configure.gangsmarkers[1] = mp.markers.new(0, new mp.Vector3(parseFloat(1066.403564453125), parseFloat(-3183.463623046875), parseFloat(-39.16382598876953)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.gangsmarkers[1].setColor(255, 247, 0, 255);
configure.gangscolshapes[1] = mp.colshapes.newRectangle(parseFloat(1066.403564453125), parseFloat(-3183.463623046875), 1, 1);

/* BALLAS */

configure.gangsmarkers[2] = mp.markers.new(0, new mp.Vector3(parseFloat(129.06565856933594), parseFloat(-1298.933837890625), parseFloat(29.232744216918945)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.gangsmarkers[2].setColor(255, 247, 0, 255);
configure.gangscolshapes[2] = mp.colshapes.newRectangle(parseFloat(129.06565856933594), parseFloat(-1298.933837890625), 1, 1);

configure.gangsmarkers[3] = mp.markers.new(0, new mp.Vector3(parseFloat(128.04835510253906), parseFloat(-1297.4833984375), parseFloat(29.26953125)), 1,
{
		direction: new mp.Vector3(0,0,0),
		rotation: new mp.Vector3(0,0,0),
		visible: true,
		dimension: 0
});
configure.gangsmarkers[3].setColor(255, 247, 0, 255);
configure.gangscolshapes[3] = mp.colshapes.newRectangle(parseFloat(128.04835510253906), parseFloat(-1297.4833984375), 1, 1);

//остановился на маркерах
//markers_police[0] = mp.markers.new(1, new mp.Vector3(parseFloat(458.608642578125), parseFloat(-992.52978515625), parseFloat(30)), new mp.Vector3(), new mp.Vector3(), 1, 255, 248, 11, 255, true, 0);


/* FUNCTIONS */

function loadData(getdata, type, player, struct) {
	if(parseInt(type) == 1) {
		struct.login_data[player.id].login = getdata.login;
		struct.login_data[player.id].balance = getdata.balance;
		struct.login_data[player.id].group_id = getdata.group_id;
		struct.login_data[player.id].email = getdata.email;
		struct.login_data[player.id].phone = getdata.phone;
		struct.login_data[player.id].create_time = getdata.create_time;
	} else if(parseInt(type) == 2) {
		struct.person_data[player.id].id = getdata.id;
		struct.person_data[player.id].account = getdata.account;
		struct.person_data[player.id].status = getdata.status;
		struct.person_data[player.id].warns = getdata.warns;
		struct.person_data[player.id].ip = getdata.ip;
		struct.person_data[player.id].g_online = getdata.g_online;
		struct.person_data[player.id].g_name = getdata.g_name;
		struct.person_data[player.id].g_sex = getdata.g_sex;
		struct.person_data[player.id].g_bio = getdata.g_bio;
		struct.person_data[player.id].g_character_create = getdata.g_character_create;
		struct.person_data[player.id].g_character_style_1 = getdata.g_character_style_1;
		struct.person_data[player.id].g_character_style_2 = getdata.g_character_style_2;
		struct.person_data[player.id].g_character_style_3 = getdata.g_character_style_3;
		struct.person_data[player.id].g_character_head_color = getdata.g_character_head_color;
		struct.person_data[player.id].g_money = getdata.g_money;
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
}

function resetData(player, struct) {
	struct.person_sys[player.id] = {
    auth_status: 0,
    bhead_data1: 0,
    bhead_data2: 0,
    bhead_data3: 0,
    hair_color: 0,
		duehuman: 0,
    active_phone: 0,
    fraction_ready: 0,
    fraction_ammo: 0,
    job_enter: 0,
    job_action: 0,
    job_count: 0,
    enter_limit: 0,
    enter_house: -1,
    enter_garage: -1,
    person_summon_cars: 0,
    person_car: new Array(6),
    timestamp: 0
  };

  struct.login_data[player.id] = {
    id: 0,
    login: "",
    password: "",
    banned: 0,
    balance: 0,
    persons: 0,
    email: "",
    phone: "",
    code: "",
    group_id: 0,
    type_id: 0,
    ip_reg: "",
    ip_last: "",
    create_time: 0,
  }

  struct.person_data[player.id] = {
    id: 0,
    account:"",
    status:0,
		warns:0,
    ip:"",
    g_name:"",
    g_sex:"",
    g_bio:"",
    g_character_create:0,
    g_character_style_1:"",
    g_character_style_2:"",
    g_character_style_3:"",
    g_character_head_color:0,
    g_money:0,
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

	console.log(`${player.name} reset data!`);

}

function updateTab(struct, setfraction, setgangs) {
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
		_player.call('updateTab', [`${text}`, configure.online]); // here right :D
	});
	configure.tab_counter++;
}

setInterval(updateTab, 10000, struct, fraction, gang);

function setFractionClothes(player, fractionid, struct) {
	player.setClothes(3, 1, 0, 0);
	player.setClothes(4, 46, 0, 0);
	player.setClothes(6, 63, 0, 0);
	player.setClothes(8, 15, 0, 0);
	player.setClothes(11, 98, 0, 0);
}

/* PAYDAY SYSTEM */

setInterval(systems.paydayHour, 3600000);

/* EVENTS */

mp.events.add(
{
    playerJoin: (player) => {
			console.log(`[N] ${player.name} has been connected!`);
			player.health = 100;
			player.armour = 100;
			player.dimension = player.id;
			player.model = "mp_m_freemode_01";
			player.spawn(new mp.Vector3(parseFloat(3347.775146484375), parseFloat(5501.515625), parseFloat(19.847803115844727)));
		},

		playerJoined: (player) => {
			struct.person_sys[player.id].auth_status = 0;
			player.call('changePlayerCameraPosition', [3438.835205078125, 5463.55224609375, 45, 0, 0, 160]);
			player.call("gameChat", [1]);
			configure.online++;
		},

		playerQuit: (player) => {
			if(struct.person_sys[player.id].auth_status >= 1) {
				systems.updatePersonData(1, player, struct);
				resetData(player, struct);
			}
		},

		playerSpawn: (player) => {

		},

		playerDeath: (player, reason, killer) => {
			function resp_time(player, playerid, verif_name, struct) {
				if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
					player.health = 100;
					if(struct.person_data[player.id].g_fraction == 1) {
						player.spawn(new mp.Vector3(parseFloat(-2360.62060546875),parseFloat(3249.447265625),parseFloat(32.81074523925781)));
					} else if(struct.person_data[player.id].g_fraction == 2) {
						player.spawn(new mp.Vector3(parseFloat(457.596435546875),parseFloat(-990.7761840820312),parseFloat(30.689599990844727)));
					} else {
						player.spawn(new mp.Vector3(parseFloat(-258.0207824707031), parseFloat(-977.0762329101562), parseFloat(31.22001075744629)));
					}
					struct.person_sys[player.id].duehuman = 0;
				}
			}
			setTimeout(resp_time, 60000, player, player.id, player.name, struct);
			chat.local(player, 'F4DF42', 'Вы умерли. Наслаждайтесь.');
			chat.local(player, 'F4DF42', 'Возрождение через 1 минуту!');
			struct.person_sys[player.id].duehuman = 1;
		},

    playerChat: (player, message) => {
			if(struct.person_sys[player.id].auth_status == 1) {
				if(struct.person_sys[player.id].duehuman != 1) {
					if(struct.login_data[player.id].group_id >= 2) {
						chat.broadcastinrange(player, 1, player.position, 15, 'E5E5E5', `${player.name}[${player.id}]: (( ${message} ))`);
					} else {
						if(struct.person_data[player.id].g_sex == 0) {
							chat.broadcastinrange(player, 1, player.position, 15, 'FFFFFF', `${player.name}[${player.id}] сказал: ${message}`);
						} else if(struct.person_data[player.id].g_sex == 1) {
							chat.broadcastinrange(player, 1, player.position, 15, 'FFFFFF', `${player.name}[${player.id}] сказала: ${message}`);
						}
					}
				} else {
					chat.local(player, 'FF0000', 'Вы мертвы.');
				}
			} else {
				chat.local(player, 'FF0000', 'Вы не авторизованы. Пройдите процедуру авторизации!');
			}
		},

		playerStartEnterVehicle: (player, vehicle, seat) => {

			if(seat == 0) {
				for(taxi = 7; taxi <= 15; taxi++) {
					if(systems.vehb[taxi] == vehicle) {
						if(struct.person_data[player.id].g_job == 1) {

						} else {
							chat.local(player, 'FF0000', 'Вы не работаете таксистом. Сначала устройтесь в Мэрии!');
							player.stopAnimation();
						}
					}
				}

				for(army = 50; army <= 66; army++) {
					if(systems.vehb[army] == vehicle) {
						if(struct.person_data[player.id].g_fraction == 1) {

						} else {
							chat.local(player, 'FF0000', 'Вы не служите в Армии Форта Занкундо!');
							player.stopAnimation();
						}
					}
				}

				for(lspd = 100; lspd <= 111; lspd++) {
					if(systems.vehb[lspd] == vehicle) {
						if(struct.person_data[player.id].g_fraction == 2) {

						} else {
							chat.local(player, 'FF0000', 'Вы не работаете в полиции!');
							player.stopAnimation();
						}
					}
				}

				for(grove = 150; grove <= 158; grove++) {
					if(systems.vehb[grove] == vehicle) {
						if(struct.person_data[player.id].g_gang == 4) {

						} else {
							chat.local(player, 'FF0000', 'Вы не состоите в The Grove Street Gang!');
							player.stopAnimation();
						}
					}
				}

				for(ballas = 180; ballas <= 186; ballas++) {
					if(systems.vehb[ballas] == vehicle) {
						if(struct.person_data[player.id].g_gang == 5) {

						} else {
							chat.local(player, 'FF0000', 'Вы не состоите в The Ballas Gang!');
							player.stopAnimation();
						}
					}
				}
			}

		},

		playerEnterVehicle: (player, vehicle) => {
			console.log(`${player.name} sit in vehicle hash: ${player.vehicle.model}`);
			if(player.vehicle && player.seat === 0) {
				let get_car_name = vehicles_cfg.getVehicleName(parseInt(player.vehicle.model));
				player.call('updateSpeedometr_1', [`${get_car_name}`]);
					if(struct.person_sys[player.id].enter_garage >= 0) {
						if(player.vehicle.owner == player.name) {
								mysql.connection.query("SELECT * FROM houses WHERE owner = ?", [player.name], function(err, selecthouse) {
									player.position = new mp.Vector3(parseFloat(selecthouse[0].garage_enter_pos_x),parseFloat(selecthouse[0].garage_enter_pos_y),parseFloat(selecthouse[0].garage_enter_pos_z));
									struct.person_sys[player.id].enter_limit = 1;
									struct.person_sys[player.id].enter_garage = -1;
									chat.local(player, 'F4DF42', 'Вы покинули гараж!');
									function exitGarage() {
										player.vehicle.dimension = 0;
										player.dimension = 0;
									}
									setTimeout(exitGarage, 1000);
								});
						} else {
						chat.local(player, 'F4DF42', 'Проваливай! Это не твоя машина!');
					}
				}
			}
		},

		playerStartExitVehicle: (player, vehicle) => {

		},

		playerExitVehicle: (player) => {
			player.call('playerExitVehicle', [0]);
			player.call('disabledSpeedometr', [0]);
		},

		playerEnterColshape: (player, shape) => {
			if(struct.person_sys[player.id].job_enter == 1) {
				for(let i = 0; i < configure.jobs_1_colshapes.length; i++) {
					if(configure.jobs_1_colshapes[i] == shape) {
						if(configure.jobs_1_status[i] == 0) {
							player.playScenario("WORLD_HUMAN_WELDING");
							function stop_job(playerid, verif_name) {
								if(struct.person_data[playerid].g_online == 1 && struct.person_data[playerid].g_name == verif_name) {
									player.stopAnimation();
									chat.local(player, '1BE636', 'Работа над данным пролетом закончена!');
									chat.local(player, '1BE636', 'К вашей зарплате добавлено: +200$');
									struct.person_sys[player.id].job_action = 0;
									configure.jobs_1_markers[i].setColor(59,222,146,255);
									configure.jobs_1_status[i] = 2;
									struct.person_sys[player.id].job_count = struct.person_sys[player.id].job_count + 200;
								} else {
									struct.person_sys[player.id].job_action = 0;
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
							chat.local(player, 'FF0000', 'Пролет уже проходит сварку!');
						} else if(configure.jobs_1_status[i] == 2) {
							chat.local(player, 'FF0000', 'Этот пролет уже сварен, пройдите к другому!');
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
						chat.local(player, '1BE636', 'Прораб находится рядом в другой кабинке, будьте вежливы с ним!');
						player.setClothes(3, 1, 0, 0);
						player.setClothes(4, 10, 0, 0);
						player.setClothes(5, 40, 0, 0);
						player.setClothes(6, 35, 0, 0);
						player.setClothes(8, 15, 0, 0);
						player.setClothes(11, 41, 0, 0);
						player.setProp(1, 24, 0);
						struct.person_sys[player.id].job_enter = 1;
					} else {
						chat.local(player, 'FF0000', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
					}
				} else {
					let clothes = JSON.parse(struct.person_data[player.id].g_character_style_1);
					let props = JSON.parse(struct.person_data[player.id].g_character_style_2);
					let blend = JSON.parse(struct.person_data[player.id].g_character_style_3);
					for(let s1 = 1; s1 <= 11; s1++) {
						player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
					}
					for(let s2 = 0; s2 <= 2; s2++) {
						player.setProp(s2, props[s2].drawable, props[s2].texture);
					}
					player.setClothes(5, 0, 0, 0);
					chat.local(player, 'F4DF42', 'Рабочий день завершен!');
					chat.local(player, 'F4DF42', `Вы заработали ${struct.person_sys[player.id].job_count}$, приходите еще!`);
					struct.person_data[player.id].g_money = struct.person_data[player.id].g_money + struct.person_sys[player.id].job_count;
					systems.updateData(player, struct);
					struct.person_sys[player.id].job_count = 0;
					struct.person_sys[player.id].job_enter = 0;
				}
			}

			if(struct.person_sys[player.id].enter_limit == 0) {
				for(let i = 0; i < loaded_houses_count; i++) {
					if(shape == configure.housescolshapes[i]) {
						let house_info1 = "", house_info2 = "";
						let owner = (configure.housesowner[i] == "NONE") ? "Государство" : configure.housesowner[i];
						house_info1 = `<h1>Владелец дома: ${owner}</h1><h1>Стоимость дома: ${configure.housescoast[i]}$</h1>`;
						if(configure.housestate[i] == 0) {
							if(configure.housesgarage[i] >= 1) {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div><div class="h_menu" id="h_menu_666">Приобрести дом</div>`;
							} else {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div><div class="h_menu" id="h_menu_666">Приобрести дом</div>`;
							}
						} else if(configure.housestate[i] == 1) {
							if(configure.housesgarage[i] >= 1) {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div> <div class="h_menu" id="h_menu_2">Войти в гараж</div>`;
							} else {
								house_info2 = `<div class="h_menu" id="h_menu_1">Войти в дом</div>`;
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
					for(let s2 = 0; s2 <= 2; s2++) {
						player.setProp(s2, props[s2].drawable, props[s2].texture);
					}
					struct.person_sys[player.id].fraction_ready = 0;
					chat.local(player, '42F480', "Ваши вещи были возвращены и вы их надели обратно.");
					chat.local(player, 'F4DF42', "Вы завершили на сегодня воинскую службу!");
				}
				player.removeWeapon();
			} else if(configure.fractionscolshapes[1] == shape) {
				if(struct.person_data[player.id].g_fraction == 1 && struct.person_sys[player.id].fraction_ready == 1) {
					if(struct.person_data[player.id].g_sex == 0) {
						if(struct.person_data[player.id].g_fraction_clothes == 0) {
							player.setClothes(3, 1, 0, 0);
							player.setClothes(4, 87, 5, 0);
							player.setClothes(6, 24, 0, 0);
							player.setClothes(8, 15, 2, 0);
							player.setClothes(11, 50, 3, 0);
						} else if(struct.person_data[player.id].g_fraction_clothes == 1) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(4, 87, 5, 0);
							player.setClothes(6, 24, 0, 0);
							player.setClothes(8, 15, 2, 0);
							player.setClothes(11, 206, 10, 0);
						} else if(struct.person_data[player.id].g_fraction_clothes == 2) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(4, 87, 5, 0);
							player.setClothes(6, 24, 0, 0);
							player.setClothes(8, 15, 2, 0);
							player.setClothes(11, 208, 10, 0);
						} else if(struct.person_data[player.id].g_fraction_clothes == 3) {
							player.setClothes(3, 5, 0, 0);
							player.setClothes(4, 87, 5, 0);
							player.setClothes(6, 24, 0, 0);
							player.setClothes(8, 15, 2, 0);
							player.setClothes(11, 209, 10, 0);
						} else if(struct.person_data[player.id].g_fraction_clothes == 4) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 9, 0, 0); // брюки
							player.setClothes(6, 63, 1, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 218, 0, 0); // одежда
						} else if(struct.person_data[player.id].g_fraction_clothes == 5) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 86, 0, 0); // брюки
							player.setClothes(6, 63, 6, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 220, 0, 0); // одежда
						} else if(struct.person_data[player.id].g_fraction_clothes == 6) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 86, 0, 0); // брюки
							player.setClothes(6, 63, 6, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 211, 0, 0); // одежда
						} else if(struct.person_data[player.id].g_fraction_clothes == 7) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 86, 0, 0); // брюки
							player.setClothes(6, 63, 6, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 221, 0, 0); // одежда
						} else if(struct.person_data[player.id].g_fraction_clothes == 8) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 86, 0, 0); // брюки
							player.setClothes(6, 63, 6, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 222, 0, 0); // одежда
						} else if(struct.person_data[player.id].g_fraction_clothes == 9) {
							player.setClothes(3, 1, 0, 0); // руки
							player.setClothes(4, 86, 0, 0); // брюки
							player.setClothes(6, 63, 6, 0); // ноги
							player.setClothes(8, 15, 0, 0); // торс
							player.setClothes(11, 239, 0, 0); // одежда
						}
					} else if(struct.person_data[player.id].g_sex == 1) {
						if(struct.person_data[player.id].g_fraction_clothes == 0) {
							player.setClothes(3, 0, 0, 0); // руки
							player.setClothes(4, 35, 0, 0); // брюки5
							player.setClothes(6, 51, 0, 0); // ноги
							player.setClothes(8, 58, 0, 0); // торс
							player.setClothes(11, 55, 0, 0); // одежда
						}
					}
					chat.local(player, '42F480', "Используйте команду (( /switchclothes )) для выбора другой одежды.");
					chat.local(player, 'F4DF42', "Вы переоделись в заготовленную экипировку.");
				} else {
					chat.local(player, 'FF0000', "У вас нет доступа к данному месту.");
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
						chat.local(player, 'FF0000', "Вы уже брали аммуницию. (( Ожидайте PayDay ))");
					}
				} else {
					chat.local(player, 'FF0000', "У вас нет доступа к данному месту.");
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
					for(let s2 = 0; s2 <= 2; s2++) {
						player.setProp(s2, props[s2].drawable, props[s2].texture);
					}
					struct.person_sys[player.id].fraction_ready = 0;
					chat.local(player, '42F480', "Служебные вещи были возвращены и вы их надели обратно.");
					chat.local(player, 'F4DF42', "Вы завершили на сегодня воинскую службу!");
				} else {
					chat.local(player, 'F4DF42', "Подача заявок на сайте pd.lsfivem.com");
				}
				player.removeWeapon();
			} else if(configure.fractionscolshapes[4] == shape) {
				if(struct.person_data[player.id].g_fraction == 2 && struct.person_sys[player.id].fraction_ready == 1) {
					if(struct.person_data[player.id].g_sex == 0) {
						if(struct.person_data[player.id].g_fraction_clothes == 0) {
							player.setClothes(3, 0, 0, 0);
							player.setClothes(4, 35, 0, 0);
							player.setClothes(6, 51, 0, 0);
							player.setClothes(8, 58, 0, 0);
							player.setClothes(11, 55, 0, 0);
						}
					} else if(struct.person_data[player.id].g_sex == 1) {
						if(struct.person_data[player.id].g_fraction_clothes == 0) {
						}
					}
					chat.local(player, '42F480', "Используйте команду (( /switchclothes )) для выбора другой одежды.");
					chat.local(player, 'F4DF42', "Вы переоделись в заготовленную экипировку.");
				} else {
					chat.local(player, 'FF0000', "У вас нет доступа к данному месту.");
				}
			} else if(configure.fractionscolshapes[5] == shape) {
				if(struct.person_data[player.id].g_fraction == 2 && struct.person_sys[player.id].fraction_ready == 1) {
					if(struct.person_sys[player.id].fraction_ammo == 0) {
						player.removeWeapon();
						player.giveWeapon(mp.joaat('WEAPON_PISTOL'), 24);
						player.giveWeapon(mp.joaat('WEAPON_STUNGUN'), 1);
						chat.local(player, '42F480', "Вам был выдан травматический пистолет с одной обоймой и электрошокер.");
						chat.local(player, 'F4DF42', "Тем временем после сытного пойка и одевания бронежилета, вы готовы к службе!");
						struct.person_sys[player.id].fraction_ammo = 1;
						player.health = 100;
						player.armour = 100;
					} else {
						chat.local(player, 'FF0000', "Вы уже брали аммуницию. (( Ожидайте PayDay ))");
					}
				} else {
					chat.local(player, 'FF0000', "У вас нет доступа к данному месту.");
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
			} else if(configure.othercolshapes[3] == shape) {
				if(struct.person_data[player.id].g_job >= 1) {
					chat.local(player, 'F4DF42', 'Рабочий день завершен!');
					chat.local(player, 'F4DF42', 'Вы были уволены по собственному желанию!');
					struct.person_data[player.id].g_job = 0;
				} else if(struct.person_data[player.id].g_job == 0) {
					if(struct.person_data[player.id].g_fraction == 0 && struct.person_data[player.id].g_gang == 0) {
						chat.local(player, '1BE636', 'Вы устроились таксистом!');
						chat.local(player, '1BE636', 'Инструкция по работе:');
						chat.local(player, '1BE636', 'Езжайте к Downtown Cab Co и заберите заготовленный для вас автомобиль.');
						chat.local(player, '1BE636', 'Во время работы будьте вежливы с клиентом и следуйте его указаниям!');
						struct.person_data[player.id].g_job = 1;
					} else {
						chat.local(player, 'FF0000', "Вы уже трудоустроены. На эту работу Вас не возьмут.");
					}
				}

			}

		},

		clientData: (argbase, argall) => {
			let player = argbase;
			let args = JSON.parse(argall);

			switch (args[0]) {
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
								mysql.connection.query("UPDATE `houses` SET owner = ?, state = ? WHERE id = ?", [struct.person_data[player.id].g_name, 1, args[1]], function(err, results) {
									configure.housesblips[args[1]].color = 1;
									configure.housestate[args[1]] = 1;
									configure.housesowner[args[1]] = struct.person_data[player.id].g_name;
									struct.person_data[player.id].g_money = struct.person_data[player.id].g_money - sel_buy_house[0].coast;
									systems.updateData(player, struct);
									chat.local(player, '2BE26B', "Поздравляем с покупкой дома!");
								});
							} else {
								chat.local(player, 'FF0000', "У вас недостаточно средств для покупки недвижимости!");
							}
						} else {
							chat.local(player, 'FF0000', "Дом не найден! Обратитесь к разработчикам.");
						}
					});
				}
				break;
				case 'camera':
				{
					if(args[1] === 1) {
						player.call('changePlayerCameraPosition', [3438.835205078125, 5463.55224609375, 45, 0, 0, 160]);
					} else if(args[1] === 2) {
						player.call('changePlayerCameraPosition', [403.113037109375, -999.2781372070312, -99.00403594970703, 0, 0, 0]);
					} else if(args[1] === 999) {
						player.call('returnPlayerCamera', [0]);
					}
				}
				break;
				case 'chat':
				{
					player.call("gameChat", args[1]);
				}
				break;
				case 'editor_person_data_blend': {
					player.call('setHeadBlendData', parseInt(args[1]), parseInt(args[2]), parseInt(args[3]), parseInt(args[4]), parseInt(args[4]), parseInt(args[4]), 1, 1, 1, 1);
					struct.person_sys[player.id].bhead_data1 = args[1];
					struct.person_sys[player.id].bhead_data2 = args[2];
					struct.person_sys[player.id].bhead_data3 = args[3];
					struct.person_sys[player.id].bhead_data4 = args[4];
				}
				break;
				case 'editor_person_data_hair': {
					player.setClothes(parseInt(args[1]), parseInt(args[2]), 0, 0);
					player.setHairColor(parseInt(args[3]), parseInt(args[3]));
					struct.person_sys[player.id].hair_color = parseInt(args[3]);
				}
				break;
				case 'editor_person_data_other': {
					player.setFaceFeature(parseInt(args[1]), parseInt(args[2]));
				}
				break;
				case 'select_login': {
					console.log(`[N] ${player.name} select account to datebase!`);
					mysql.connection.query("SELECT * FROM accounts WHERE login = ?", [args[1]], function(err, results) {
						if(results.length >= 1)
						{
							let password_gen = 'lsfm0x' + md5(args[2]) + '==';
							if(results[0].password === password_gen) {
								if(results[0].banned == 0) {
									mysql.connection.query("SELECT * FROM persons WHERE account = ?", [args[1]], function(err2, results2) {
										if(results2.length >= 1) {
											loadData(results[0], 1, player, struct);
											var persons = "";
											for(let i = 0; i < results2.length; i++) {
												persons = persons + results2[i].g_name + ";";
											}
											// when was 2017 year, and 0.2 version ragemp, method call in cef client, called stantard params, not req.. array  OH got it.
											player.call('return_server', [5]);
											player.call('return_server_strings', [`${persons}`]);
											player.outputChatBox("<style>@font-face { font-family: 'Helvetica Light'; src: url('http://lsfivem.com/fonts/HelveticaLight.ttf') format('truetype'); }</style><script>$('#chat_messages').css({'font-size': 18px; 'height':'300px', 'width':'45vw', 'margin-top':'0.0vh', 'font-family':'Helvetica Light'});</script>");
										} else {
											console.log(`[N] ${player.name} select account to datebase and get wrong 4`);
											player.call('return_server', [4]);
										}
									});
								} else {
									console.log(`[N] ${player.name} select account to datebase and get wrong 3`);
									player.call('return_server', [3]);
								}
							} else {
								console.log(`[N] ${player.name} select account to datebase and get wrong 2`);
								player.call('return_server', [2]);
							}
						} else {
							console.log(`[N] ${player.name} select account to datebase and get wrong 1`);
							player.call('return_server', [1]);
						}
					});
				}
				break;
				case 'select_person':
					{
						console.log(`[N] ${player.name} select person to datebase!`);
						if(args[1]) {
							mysql.connection.query("SELECT * FROM persons WHERE g_name = ?", [args[1]], function(err, results) {
							if(results.length >= 1)
							{
								if(struct.login_data[player.id].group_id >= 0) {
									if(struct.login_data[player.id].status != 0) {
										player.model = (results[0].g_sex == 0) ? "mp_m_freemode_01" : "mp_f_freemode_01";
										if(results[0].g_sex == 0) {
											player.setClothes(3, 0, 0, 0);
											player.setClothes(4, 1, 0, 0);
											player.setClothes(6, 1, 0, 0);
											player.setClothes(8, 1, 0, 0);
											player.setClothes(11, 1, 0, 0);
										} else {
											player.setClothes(3, 5, 0, 0);
											player.setClothes(4, 1, 0, 0);
											player.setClothes(6, 1, 0, 0);
											player.setClothes(8, 1, 0, 0);
											player.setClothes(11, 1, 0, 0);
										}
										if(results[0].g_character_create == 0) {
											player.name = args[1];
											player.spawn(new mp.Vector3(parseFloat(403.0166931152344), parseFloat(-996.7100830078125), parseFloat(-99.00025939941406)));
											player.heading = 170;
											player.call('return_server', [9]);
										} else {
											player.name = args[1];
											struct.person_data[player.id].g_name = args[1];
											player.dimension = 0;
											struct.person_sys[player.id].auth_status = 1;
											player.call('return_server', [10]);
											player.call("gameChat", [2]);
											let clothes = JSON.parse(results[0].g_character_style_1);
											let props = JSON.parse(results[0].g_character_style_2);
											let blend = JSON.parse(results[0].g_character_style_3);
											for(let s1 = 1; s1 <= 11; s1++) {
												player.setClothes(s1, clothes[s1].drawable, clothes[s1].palette, clothes[s1].texture);
											}
											for(let s2 = 0; s2 <= 2; s2++) {
												player.setProp(s2, props[s2].drawable, props[s2].texture);
											}
											player.setHairColor(results[0].g_character_head_color, results[0].g_character_head_color);
											chat.local(player, 'F0D829', 'Добро пожаловать на Los Santos Role Play');
											chat.local(player, 'F0D829', 'Мы рады Вас видеть, вновь!');
											//player.headBlendData(blend[0], blend[1], blend[2], blend[3], blend[3], blend[3], 1, 1, 1);
											/* Апйдент мониторинга */
											player.setHeadBlend(blend[0], blend[1], blend[2], blend[3], blend[3], blend[3], 1, 1, 1);
											loadData(results[0], 2, player, struct);
											systems.updateData(player, struct);
											systems.openDoors(player);
											struct.person_data[player.id].g_online = 1;
											mysql.connection.query('UPDATE persons SET g_online = ? WHERE g_name = ?', [struct.person_data[player.id].g_online, struct.person_data[player.id].g_name], function (error, results, fields) {
												console.log(`${struct.person_data[player.id].g_name} is online!`);
											});
											mysql.connection.query('SELECT * FROM houses WHERE owner = ?', [player.name], function (error, selecthouse, fields) {
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
													player.spawn(new mp.Vector3(parseFloat(-258.0207824707031), parseFloat(-977.0762329101562), parseFloat(31.22001075744629)));
												}
											});
										}
									} else {
										player.call('return_server', [8]);
									}
								} else {
									player.call('return_server', [7]);
								}
							} else {
								player.call('return_server', [6]);
							}
							});
						} else {
							player.kick();
						}
				}
				break;
				case 'create_person':
				{
					player.dimension = 0;
					player.call('return_server', [10]);
					player.call("gameChat", [2]);
					struct.person_sys[player.id].auth_status = 1;
					struct.person_data[player.id].g_name = player.name;
					let struct1 = new Array(11), struct2 = new Array(2), struct3;
					for(let s1 = 0; s1 <= 11; s1++) {
						struct1[s1] = player.getClothes(s1);
					}
					for(let s2 = 0; s2 <= 2; s2++) {
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
					mysql.connection.query('UPDATE `persons` SET `g_character_create` = ?, `g_character_style_1` = ?, `g_character_style_2` = ?, `g_character_style_3` = ?, `g_character_head_color` = ? WHERE `g_name` = ?', [1, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_sys[player.id].hair_color, struct.person_data[player.id].g_name], function(err, result) {
						console.log(`${struct.person_data[player.id].g_name} create person!`);
					});
					chat.local(player, '42F4BC', 'Благодарим Вас за выбор нашего РП сервера.');
					chat.local(player, '42F4BC', 'Рекомендуем прочитать игровые правила на нашем форуме.');
					chat.local(player, '42F4BC', 'Если у вас возникнет вопрос, обратитесь в службу поддержки. (( /mm -> Поддержка ))');
					chat.local(player, '42F4BC', 'Чтобы закрывать разделу меню (/mm), используйте (( BACKSPACE )) клавишу.');
					chat.local(player, '42F4BC', 'Если вы не знаете, что делать на изначальных этапах, ознакомьтесь с информацией.');
					chat.local(player, '42F4BC', 'Ваш персонаж был успешно создан, приятной игры!');
					/* Апйдент мониторинга */
					player.setHeadBlend(gen_blend[0], gen_blend[1], gen_blend[2], gen_blend[3], gen_blend[3], gen_blend[3], 1, 1, 1);
					systems.updateData(player, struct);
					systems.openDoors(player);
					struct.person_data[player.id].g_online = 1;
					mysql.connection.query('UPDATE persons SET g_online = ? WHERE g_name = ?', [struct.person_data[player.id].g_online, struct.person_data[player.id].g_name], function (error, results, fields) {
						console.log(`${struct.person_data[player.id].g_name} is online!`);
					});
					struct.person_sys[player.id].enter_limit = 0;
					player.spawn(new mp.Vector3(parseFloat(-258.0207824707031), parseFloat(-977.0762329101562), parseFloat(31.22001075744629)));
				}
				break;
				case 'mainmenu':
					player.call("showMainMenu_click", [args[1], struct.person_data[player.id]]);
				break;
				case 'send_staff_message':
				{
					if(args[1]) {
						chat.usertostaff(player, args[1]);
					} else {
						chat.local(player, 'FF0000', 'Сообщение отсутствует. Попробуйте вновь.');
					}
				}
				break;
				case 'flip':
					if (player.vehicle) {
						let rotation = player.vehicle.rotation;
						rotation.y = 0;
						player.vehicle.rotation = rotation;
					}

					break;
				case 'server_color':
					if (player.vehicle) {
						if (args[1] == 'color') {
							let colorPrimary = JSON.parse(args[2]);
							let colorSecondary = JSON.parse(args[3]);
							player.vehicle.setcolorRGB(colorPrimary.r, colorPrimary.g, colorPrimary.b, colorSecondary.r, colorSecondary.g, colorSecondary.b);
						}

						if (args[1] == 'neon') {
							let color = JSON.parse(args[2]);
							player.vehicle.setNeoncolor(color.r, color.g, color.b);
						}
					}

					break;
			}
		}
});

mp.events.add("clientData", (arg0, arg1) => {

});
