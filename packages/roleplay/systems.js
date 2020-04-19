"use strict";

let func = module.exports;

var mysql = require('./mysql.js');
var configure = require('./configure.js');
var chat = require('./chat.js');
var fraction = require('./fractions.js');
var gang = require('./gangs.js');
var struct = require('./struct.js');
var logger = require('./logger.js');

func.vehb = new Array(200);
func.vehbpos = new Array(200);

func.vehbrot_spawn_moto = 200;
func.vehbnum_spawn_moto = "LSFIVEM";
func.vehbrot_spawn_taxi_1 = 105;
func.vehbrot_spawn_taxi_2 = 20;
func.vehbrot_spawn_taxi_3 = 60;
func.vehbnum_spawn_taxi = "TAXI";
func.vehbrot_spawn_army_1 = 60;
func.vehbrot_spawn_army_2 = 90;
func.vehbrot_spawn_army_3 = 240;
func.vehbnum_spawn_army = "ARMY";
func.vehbrot_spawn_police_1 = 50;
func.vehbrot_spawn_police_2 = 180;
func.vehbrot_spawn_police_3 = 230;
func.vehbnum_spawn_lspd = "LSPD";
func.vehbrot_spawn_grove_1 = 315;
func.vehbnum_spawn_grove = "GROVE";
func.vehbrot_spawn_ballas_1 = 290;
func.vehbrot_spawn_ballas_2 = 120;
func.vehbnum_spawn_ballas = "BALLAS";

/* FAGIO POS */

func.vehbpos[0] = new mp.Vector3(parseFloat(-226.18128967285156), parseFloat(-949.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[1] = new mp.Vector3(parseFloat(-227.18128967285156), parseFloat(-952.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[2] = new mp.Vector3(parseFloat(-228.18128967285156), parseFloat(-955.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[3] = new mp.Vector3(parseFloat(-229.18128967285156), parseFloat(-958.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[4] = new mp.Vector3(parseFloat(-230.18128967285156), parseFloat(-961.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[5] = new mp.Vector3(parseFloat(-231.18128967285156), parseFloat(-964.5604858398438), parseFloat(29.28827667236328));
func.vehbpos[6] = new mp.Vector3(parseFloat(-232.18128967285156), parseFloat(-967.5604858398438), parseFloat(29.28827667236328));

/* TAXI POS */
func.vehbpos[7] = new mp.Vector3(parseFloat(915.4991455078125), parseFloat(-170.85061645507812), parseFloat(74.0052261352539));
func.vehbpos[8] = new mp.Vector3(parseFloat(918.1309814453125), parseFloat(-167.34584045410156), parseFloat(74.19983673095703));
func.vehbpos[9] = new mp.Vector3(parseFloat(919.4011840820312), parseFloat(-163.7759552001953), parseFloat(74.39412689208984));
func.vehbpos[10] = new mp.Vector3(parseFloat(911.6170043945312), parseFloat(-164.08018493652344), parseFloat(73.95433044433594));
func.vehbpos[11] = new mp.Vector3(parseFloat(913.8385620117188), parseFloat(-159.9942626953125), parseFloat(74.37437438964844));
func.vehbpos[12] = new mp.Vector3(parseFloat(903.0654296875), parseFloat(-191.7108917236328), parseFloat(73.40501403808594));
func.vehbpos[13] = new mp.Vector3(parseFloat(904.8489990234375), parseFloat(-188.86117553710938), parseFloat(73.43590545654297));
func.vehbpos[14] = new mp.Vector3(parseFloat(906.6234741210938), parseFloat(-185.96951293945312), parseFloat(73.63350677490234));
func.vehbpos[15] = new mp.Vector3(parseFloat(908.6712036132812), parseFloat(-183.00225830078125), parseFloat(73.77641296386719));

/* ARMY POS */
func.vehbpos[50] = new mp.Vector3(parseFloat(-2311.794189453125), parseFloat(3265.76953125), parseFloat(32));
func.vehbpos[51] = new mp.Vector3(parseFloat(-2310.394189453125), parseFloat(3268.76953125), parseFloat(32));
func.vehbpos[52] = new mp.Vector3(parseFloat(-2308.794189453125), parseFloat(3271.76953125), parseFloat(32));
func.vehbpos[53] = new mp.Vector3(parseFloat(-2306.994189453125), parseFloat(3274.76953125), parseFloat(32));

func.vehbpos[54] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3326.62109375), parseFloat(32));
func.vehbpos[55] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3330.00146484375), parseFloat(32));
func.vehbpos[56] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3333.00146484375), parseFloat(32));
func.vehbpos[57] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3336.00146484375), parseFloat(32));
func.vehbpos[58] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3340.00146484375), parseFloat(32));
func.vehbpos[59] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3343.00146484375), parseFloat(32));
func.vehbpos[60] = new mp.Vector3(parseFloat(-2228.50830078125), parseFloat(3346.00146484375), parseFloat(32));

func.vehbpos[61] = new mp.Vector3(parseFloat(-2287.68994140625), parseFloat(3325.066650390625), parseFloat(32));
func.vehbpos[62] = new mp.Vector3(parseFloat(-2286.047119140625), parseFloat(3328.021240234375), parseFloat(32));
func.vehbpos[63] = new mp.Vector3(parseFloat(-2284.43896484375), parseFloat(3330.994873046875), parseFloat(32));
func.vehbpos[64] = new mp.Vector3(parseFloat(-2282.617919921875), parseFloat(3334.01171875), parseFloat(32));
func.vehbpos[65] = new mp.Vector3(parseFloat(-2280.912841796875), parseFloat(3336.8349609375), parseFloat(32));
func.vehbpos[66] = new mp.Vector3(parseFloat(-2279.243408203125), parseFloat(3339.768798828125), parseFloat(32));

/* LSPD POS */
func.vehbpos[100] = new mp.Vector3(parseFloat(427.2829895019531), parseFloat(-1027.254150390625), parseFloat(28));
func.vehbpos[101] = new mp.Vector3(parseFloat(431.34130859375), parseFloat(-1026.8551025390625), parseFloat(28));
func.vehbpos[102] = new mp.Vector3(parseFloat(434.9367980957031), parseFloat(-1026.7685546875), parseFloat(28));
func.vehbpos[103] = new mp.Vector3(parseFloat(438.47674560546875), parseFloat(-1026.13427734375), parseFloat(28));
func.vehbpos[104] = new mp.Vector3(parseFloat(442.52874755859375), parseFloat(-1025.8013916015625), parseFloat(28));
func.vehbpos[105] = new mp.Vector3(parseFloat(446.1401672363281), parseFloat(-1025.455322265625), parseFloat(28));

func.vehbpos[106] = new mp.Vector3(parseFloat(452.5000305175781), parseFloat(-997.1426391601562), parseFloat(25));
func.vehbpos[107] = new mp.Vector3(parseFloat(447.4996337890625), parseFloat(-997.0658569335938), parseFloat(25));
func.vehbpos[108] = new mp.Vector3(parseFloat(436.49176025390625), parseFloat(-997.5313720703125), parseFloat(25));
func.vehbpos[109] = new mp.Vector3(parseFloat(431.4107971191406), parseFloat(-997.3120727539062), parseFloat(25));

func.vehbpos[110] = new mp.Vector3(parseFloat(408.0600891113281), parseFloat(-979.8801879882812), parseFloat(28));
func.vehbpos[111] = new mp.Vector3(parseFloat(407.7147216796875), parseFloat(-984.2308959960938), parseFloat(28));

func.vehbpos[112] = new mp.Vector3(parseFloat(449.11029052734375), parseFloat(-981.3734741210938), parseFloat(43.6916618347168));

/* GROVE POS */
func.vehbpos[150] = new mp.Vector3(parseFloat(-218.9304962158203), parseFloat(-1491.39599609375), parseFloat(30.767080307006836));
func.vehbpos[151] = new mp.Vector3(parseFloat(-221.79037475585938), parseFloat(-1488.981201171875), parseFloat(30.767080307006836));
func.vehbpos[152] = new mp.Vector3(parseFloat(-223.88824462890625), parseFloat(-1487.0836181640625), parseFloat(30.767080307006836));
func.vehbpos[153] = new mp.Vector3(parseFloat(-226.76947021484375), parseFloat(-1485.1456298828125), parseFloat(30.767080307006836));
func.vehbpos[154] = new mp.Vector3(parseFloat(-229.1333465576172), parseFloat(-1482.802490234375), parseFloat(30.767080307006836));
func.vehbpos[155] = new mp.Vector3(parseFloat(-231.76577758789062), parseFloat(-1480.95458984375), parseFloat(30.767080307006836));
func.vehbpos[156] = new mp.Vector3(parseFloat(-234.2114715576172), parseFloat(-1478.9940185546875), parseFloat(30.767080307006836));
func.vehbpos[157] = new mp.Vector3(parseFloat(-236.70436096191406), parseFloat(-1476.92626953125), parseFloat(30.767080307006836));
func.vehbpos[158] = new mp.Vector3(parseFloat(-239.7378692626953), parseFloat(-1474.724853515625), parseFloat(30.767080307006836));

/* BALLAS POS */
func.vehbpos[180] = new mp.Vector3(parseFloat(145.24911499023438), parseFloat(-1287.4423828125), parseFloat(29.010942459106445));
func.vehbpos[181] = new mp.Vector3(parseFloat(143.7821502685547), parseFloat(-1284.7760009765625), parseFloat(29.008378982543945));
func.vehbpos[182] = new mp.Vector3(parseFloat(142.2418212890625), parseFloat(-1282.5799560546875), parseFloat(29.014684677124023));
func.vehbpos[183] = new mp.Vector3(parseFloat(140.91622924804688), parseFloat(-1280.349365234375), parseFloat(29.015277862548828));
func.vehbpos[184] = new mp.Vector3(parseFloat(138.1146697998047), parseFloat(-1275.3026123046875), parseFloat(28.997140884399414));
func.vehbpos[185] = new mp.Vector3(parseFloat(148.3693084716797), parseFloat(-1271.3988037109375), parseFloat(28.926536560058594));
func.vehbpos[186] = new mp.Vector3(parseFloat(150.0975799560547), parseFloat(-1273.5872802734375), parseFloat(28.93612289428711));

/*
func.vehbpos[60] = new mp.Vector3(parseFloat(904.8489990234375), parseFloat(-188.86117553710938), parseFloat(73.43590545654297));
func.vehbpos[61] = new mp.Vector3(parseFloat(906.6234741210938), parseFloat(-185.96951293945312), parseFloat(73.63350677490234));
func.vehbpos[62] = new mp.Vector3(parseFloat(908.6712036132812), parseFloat(-183.00225830078125), parseFloat(73.77641296386719));
*/

func.loadVehicle = function() {

	/* SPAWN FAGIO */

	func.vehb[0] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[0],
	{
	    heading: func.vehbrot_spawn_moto,
	    numberPlate: func.vehbnum_spawn_moto,
	    alpha: 255,
	    locked: false,
	    engine: false,
	    dimension: 0
	});
	func.vehb[0].setColorRGB(186, 186, 186);

	func.vehb[1] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[1],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[1].setColorRGB(186, 186, 186);

	func.vehb[2] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[2],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[2].setColorRGB(186, 186, 186);

	func.vehb[3] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[3],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[3].setColorRGB(186, 186, 186);

	func.vehb[4] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[4],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[4].setColorRGB(186, 186, 186);

	func.vehb[5] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[5],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[5].setColorRGB(186, 186, 186);

	func.vehb[6] = mp.vehicles.new(mp.joaat("Faggio"), func.vehbpos[6],
	{
			heading: func.vehbrot_spawn_moto,
			numberPlate: func.vehbnum_spawn_moto,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[6].setColorRGB(186, 186, 186);

	/* TAXI */

	func.vehb[7] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[7],
	{
			heading: func.vehbrot_spawn_taxi_1,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[7].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[8] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[8],
	{
			heading: func.vehbrot_spawn_taxi_1,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[8].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[9] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[9],
	{
			heading: func.vehbrot_spawn_taxi_1,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[9].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[10] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[10],
	{
			heading: func.vehbrot_spawn_taxi_2,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[10].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[11] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[11],
	{
			heading: func.vehbrot_spawn_taxi_2,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[11].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[12] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[12],
	{
			heading: func.vehbrot_spawn_taxi_3,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[12].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[13] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[13],
	{
			heading: func.vehbrot_spawn_taxi_3,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[13].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[14] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[14],
	{
			heading: func.vehbrot_spawn_taxi_3,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[14].setColorRGB(252, 206, 0, 0, 73, 175);

	func.vehb[15] = mp.vehicles.new(mp.joaat("Taxi"), func.vehbpos[15],
	{
			heading: func.vehbrot_spawn_taxi_3,
			numberPlate: func.vehbnum_spawn_taxi,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[15].setColorRGB(252, 206, 0, 0, 73, 175);

	/* ARMY FZ */

	func.vehb[50] = mp.vehicles.new(mp.joaat("Crusader"), func.vehbpos[50],
	{
			heading: func.vehbrot_spawn_army_1,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[50].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[51] = mp.vehicles.new(mp.joaat("Crusader"), func.vehbpos[51],
	{
			heading: func.vehbrot_spawn_army_1,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[51].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[52] = mp.vehicles.new(mp.joaat("Crusader"), func.vehbpos[52],
	{
			heading: func.vehbrot_spawn_army_1,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[52].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[53] = mp.vehicles.new(mp.joaat("Crusader"), func.vehbpos[53],
	{
			heading: func.vehbrot_spawn_army_1,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[53].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[54] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[54],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[54].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[55] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[55],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[55].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[56] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[56],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[56].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[57] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[57],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[57].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[58] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[58],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[58].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[59] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[59],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[59].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[60] = mp.vehicles.new(mp.joaat("Mesa"), func.vehbpos[60],
	{
			heading: func.vehbrot_spawn_army_2,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[60].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[61] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[61],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[61].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[62] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[62],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[62].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[63] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[63],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[63].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[64] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[64],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[64].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[65] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[65],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[65].setColorRGB(132, 117, 81, 115, 89, 28);

	func.vehb[66] = mp.vehicles.new(mp.joaat("Patriot"), func.vehbpos[66],
	{
			heading: func.vehbrot_spawn_army_3,
			numberPlate: func.vehbnum_spawn_army,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[66].setColorRGB(132, 117, 81, 115, 89, 28);

	/* LSPD */

	func.vehb[100] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[100],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[100].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[101] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[101],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[101].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[102] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[102],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[102].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[103] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[103],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[103].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[104] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[104],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[104].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[105] = mp.vehicles.new(mp.joaat("police"), func.vehbpos[105],
	{
			heading: func.vehbrot_spawn_police_1,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[105].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[106] = mp.vehicles.new(mp.joaat("police2"), func.vehbpos[106],
	{
			heading: func.vehbrot_spawn_police_2,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[106].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[107] = mp.vehicles.new(mp.joaat("police2"), func.vehbpos[107],
	{
			heading: func.vehbrot_spawn_police_2,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[107].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[108] = mp.vehicles.new(mp.joaat("police2"), func.vehbpos[108],
	{
			heading: func.vehbrot_spawn_police_2,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[108].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[109] = mp.vehicles.new(mp.joaat("police2"), func.vehbpos[109],
	{
			heading: func.vehbrot_spawn_police_2,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[109].setColorRGB(255, 255, 255, 255, 255, 255);

	func.vehb[110] = mp.vehicles.new(mp.joaat("police4"), func.vehbpos[110],
	{
			heading: func.vehbrot_spawn_police_3,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[110].setColorRGB(209, 209, 209, 209, 209, 209);

	func.vehb[111] = mp.vehicles.new(mp.joaat("police4"), func.vehbpos[111],
	{
			heading: func.vehbrot_spawn_police_3,
			numberPlate: func.vehbnum_spawn_lspd,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[111].setColorRGB(209, 209, 209, 209, 209, 209);

	/* GROVE */

	func.vehb[150] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[150],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[150].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[151] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[151],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[151].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[152] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[152],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[152].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[153] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[153],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[153].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[154] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[154],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[154].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[155] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[155],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[155].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[156] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[156],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[156].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[157] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[157],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[157].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[158] = mp.vehicles.new(mp.joaat("Emperor"), func.vehbpos[158],
	{
			heading: func.vehbrot_spawn_grove_1,
			numberPlate: func.vehbnum_spawn_grove,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[158].setColorRGB(58, 234, 61, 58, 234, 61);

	func.vehb[180] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[180],
	{
			heading: func.vehbrot_spawn_ballas_1,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[180].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[181] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[181],
	{
			heading: func.vehbrot_spawn_ballas_1,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[181].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[182] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[182],
	{
			heading: func.vehbrot_spawn_ballas_1,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[182].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[183] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[183],
	{
			heading: func.vehbrot_spawn_ballas_1,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[183].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[184] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[184],
	{
			heading: func.vehbrot_spawn_ballas_1,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[184].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[185] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[185],
	{
			heading: func.vehbrot_spawn_ballas_2,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[185].setColorRGB(137, 0, 132, 137, 0, 132);

	func.vehb[186] = mp.vehicles.new(mp.joaat("Glendale"), func.vehbpos[186],
	{
			heading: func.vehbrot_spawn_ballas_2,
			numberPlate: func.vehbnum_spawn_ballas,
			alpha: 255,
			locked: false,
			engine: false,
			dimension: 0
	});
	func.vehb[186].setColorRGB(137, 0, 132, 137, 0, 132);

}

func.loadVehicle();

func.spawnVehicle = function() {
	console.log('[A] System: Spawn Vehicles; Status: Start;');
	for(let i = 0; i <= func.vehb.length; i++) {
		if(func.vehb[i]) {
			let ret_occup, get_model, get_position, get_heading, get_color0, get_color1, get_numpl;
			ret_occup = func.vehb[i].getOccupant(0);
			get_model = func.vehb[i].model;
			get_position = func.vehbpos[i];
			get_heading = func.vehb[i].rotation.z;
			get_color0 = func.vehb[i].getColorRGB(0);
			get_color1 = func.vehb[i].getColorRGB(1);
			get_numpl = func.vehb[i].numberPlate;
			if(!ret_occup) {
				func.vehb[i].destroy();
				function create_car(model, pos, heading, colorex1, colorex2, numpl) {
					func.vehb[i] = mp.vehicles.new(parseInt(model), pos,
					{
							heading: heading,
							locked: false,
							engine: false,
							dimension: 0
					});
					func.vehb[i].setColorRGB(colorex1[0], colorex1[1], colorex1[2], colorex2[0], colorex2[1], colorex2[2]);
					func.vehb[i].numberPlate = numpl;
				}
				if(i >= 0 && i <= 6) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				} else if(i >= 7 && i <= 15) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				} else if(i >= 50 && i <= 66) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				} else if(i >= 100 && i <= 111) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				} else if(i >= 150 && i <= 158) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				} else if(i >= 180 && i <= 186) {
					setTimeout(create_car, 1000, get_model, get_position, get_heading, get_color0, get_color1, get_numpl);
				}
			}
		}
	}
	console.log('[A] System: Spawn Vehicles; Status: Complete;');
}

func.paydayHour = function() {
	var date = new Date();
	mp.world.weather = configure.weather;
	mp.world.time.hour = date.getHours();
	mp.world.time.minute = date.getMinutes();
	for(let i = 0; i < configure.jobs_1_markers.length; i++) {
		configure.jobs_1_markers[i].setColor(255, 247, 0, 255);
		configure.jobs_1_status[i] = 0;
	}
	let zp_count = 0;
	let payday_get = 0;
	mp.players.forEach(_player => {
		if(struct.person_sys[_player.id].auth_status >= 1) {
			chat.local(_player, 'DFD1FC', '--------===[ КЛИЕНТ БАНКА LS ]===-------');
			chat.local(_player, 'DFD1FC', '[N] Налог государству: 0$');
			if(struct.person_sys[_player.id].job_enter == 1 || struct.person_data[_player.id].g_job >= 1) {
				chat.local(_player, 'DFD1FC', `[W] Пособие по безработице: ${zp_count}$`);
				if(struct.person_data[_player.id].g_job == 1) {
					zp_count = 1000;
					chat.local(_player, 'DFD1FC', `[T] Ваша зарплата таксиста: ${zp_count}$`);
				}
			} else if(struct.person_data[_player.id].g_fraction >= 1) {
				zp_count = 1000;
				chat.local(_player, 'DFD1FC', `[F] Ваша зарплата: ${zp_count}$`);
			} else {
				chat.local(_player, 'DFD1FC', `[W] Пособие по безработице: ${zp_count}$`);
				zp_count = 50;
			}
			chat.local(_player, 'DFD1FC', '===================================');
			struct.person_data[_player.id].g_money = struct.person_data[_player.id].g_money + zp_count;
			struct.person_sys[_player.id].fraction_ammo = 0;
			func.updateData(_player, struct);
			func.updatePersonData(2, _player, struct);
			payday_get++;
		}
	});

	if(payday_get >= 1) {
		console.log(`[A] System: PayDay; Status: ${payday_get} humans;`);
	} else {
		console.log('[A] System: PayDay; Status: Not Get;');
	}
	console.log('[A] System: PayDay; Status: Complete;');
	logger.write("[A] System: PayDay; Status: Complete;");
}

func.updatePersonData = function(type, player, struct) {
  console.log(type);
	if(parseInt(type) == 1) {
    mysql.connection.query('UPDATE persons SET warns = ?, g_online = 0, g_character_create = ?, g_character_style_1 = ?, g_character_style_2 = ?, g_character_style_3 = ?, g_character_head_color = ?, g_money = ?, g_victims = ?, g_respect = ?, g_drugs = ?, g_materials = ?, g_health = ?, g_armour = ?, g_job = ?, g_fraction = ?, g_fraction_clothes = ?, g_fraction_rang = ?, g_gang = ?, g_gang_clothes = ?, g_gang_rang = ? WHERE g_name = ?', [struct.person_data[player.id].warns, struct.person_data[player.id].g_character_create, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_data[player.id].g_character_head_color, struct.person_data[player.id].g_money, struct.person_data[player.id].g_victims, struct.person_data[player.id].g_respect, struct.person_data[player.id].g_zavisim, struct.person_data[player.id].g_drugs, struct.person_data[player.id].g_health, struct.person_data[player.id].g_armour, struct.person_data[player.id].g_job, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes, struct.person_data[player.id].g_fraction_rang, struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_clothes, struct.person_data[player.id].g_gang_rang, struct.person_data[player.id].g_name], function (error, results, fields) {
      console.log(error);
    });
	} else if(parseInt(type) == 1) {
    mysql.connection.query('UPDATE persons SET g_character_create = ?, g_character_style_1 = ?, g_character_style_2 = ?, g_character_style_3 = ?, g_character_head_color = ?, g_money = ?, g_victims = ?, g_respect = ?, g_drugs = ?, g_materials = ?, g_health = ?, g_armour = ?, g_job = ?, g_fraction = ?, g_fraction_clothes = ?, g_fraction_rang = ?, g_gang = ?, g_gang_clothes = ?, g_gang_rang = ? WHERE g_name = ?', [struct.person_data[player.id].g_character_create, struct.person_data[player.id].g_character_style_1, struct.person_data[player.id].g_character_style_2, struct.person_data[player.id].g_character_style_3, struct.person_data[player.id].g_character_head_color, struct.person_data[player.id].g_money, struct.person_data[player.id].g_victims, struct.person_data[player.id].g_respect, struct.person_data[player.id].g_zavisim, struct.person_data[player.id].g_drugs, struct.person_data[player.id].g_health, struct.person_data[player.id].g_armour, struct.person_data[player.id].g_job, struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_clothes, struct.person_data[player.id].g_fraction_rang, struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_clothes, struct.person_data[player.id].g_gang_rang, struct.person_data[player.id].g_name], function (error, results, fields) {
      console.log(error);
    });
  }
}

func.updateData = function(player, struct) {
	let job_name, fraction_name, fraction_name_rang, gang_name, gang_name_rang;
	job_name = (struct.person_data[player.id].g_job == 1) ? "Таксист" : "-";
	fraction_name = fraction.get_name(struct.person_data[player.id].g_fraction);
	fraction_name_rang = fraction.get_rang(struct.person_data[player.id].g_fraction, struct.person_data[player.id].g_fraction_rang);
	gang_name = gang.get_name(struct.person_data[player.id].g_gang);
	gang_name_rang = gang.get_rang(struct.person_data[player.id].g_gang, struct.person_data[player.id].g_gang_rang);
	player.call('playerGUIStats', JSON.stringify(struct.person_data[player.id]));
	player.call('playerGUIStatsUpdate_1', JSON.stringify(struct.login_data[player.id]));
	player.call('playerGUIStatsUpdate_2', JSON.stringify(struct.person_data[player.id]), `${job_name}`, `${fraction_name}`, `${fraction_name_rang}`, `${gang_name}`, `${gang_name_rang}`);
}

func.openDoors = function(player) {
	player.call("doorControl", 749848321, 453.0793, -983.1895, 30.83926, false, 0, 0, 0); // door armory
	player.call("doorControl", 631614199, 461.8065, -1001.302, 25.06443, true, 0, 0, 0); // jail door 3
	player.call("doorControl", 631614199, 461.8065, -997.6583, 25.06443, true, 0, 0, 0); // jail door 1-1
	player.call("doorControl", 631614199, 461.8065, -994.4086, 25.06443, true, 0, 0, 0); // jail door 1
	player.call("doorControl", -1320876379, 446.5728, -980.0106, 30.8393, false, 0, 0, 0); // captain
}

func.gangclothes = function(player, sex, gang) {
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
