"use strict";

let configure = module.exports;

configure.othermarkers = new Array(999);
configure.othercolshapes = new Array(999);

configure.jobsmarkers = new Array(999);
configure.jobscolshapes = new Array(999);

configure.jobs_1_markers = new Array(10);
configure.jobs_1_colshapes = new Array(10);
configure.jobs_1_status = new Array(10);

for(let i = 0; i < configure.jobs_1_status.length; i++) {
  configure.jobs_1_status[i] = 0;
}

configure.fractionsmarkers = new Array(100);
configure.fractionscolshapes = new Array(100);

configure.gangsmarkers = new Array(100);
configure.gangscolshapes = new Array(100);

configure.housesblips = new Array(999);
configure.housesmarkers = new Array(999);
configure.housescolshapes = new Array(999);
configure.housesnumber = new Array(999);
configure.housestate = new Array(999);
configure.housesrare = new Array(999);
configure.housesowner = new Array(999);
configure.housescoast = new Array(999);
configure.housesinterior = new Array(999);
configure.housesgarage = new Array(999);
configure.housesgaragecolshapes = new Array(999);

configure.housesinterior_rare0_pos0 = new mp.Vector3(parseFloat(151.50820922851562),parseFloat(-1007.64892578125),parseFloat(-98.99994659423828));
configure.housesinterior_rare0_pos1 = new mp.Vector3(parseFloat(266.1980895996094),parseFloat(-1007.3866577148438),parseFloat(-101.00856018066406));
configure.housesinterior_rare2_pos0 = new mp.Vector3(parseFloat(-174.01052856445312),parseFloat(496.4705505371094),parseFloat(137.6669921875));
configure.housesinterior_rare2_pos1 = new mp.Vector3(parseFloat(340.9412),parseFloat(437.1798),parseFloat(149.3925));
configure.housesinterior_rare2_pos2 = new mp.Vector3(parseFloat(-680.984619140625),parseFloat(591.6907958984375),parseFloat(145.39305114746094));

configure.createvehicle = new Array(999);
configure.createvehicle_count = 0;

configure.online = 0;
configure.tab_counter = 0;
configure.weather = "Sunny";

mp.world.weather = configure.weather;
