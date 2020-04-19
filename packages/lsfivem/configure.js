"use strict";

var configure = module.exports;

configure.gamemodeloaded = 0;
configure.registration = 1;
configure.auth = 1;

configure.payday_counter = 0;
configure.tab_counter = 0;
configure.spawnvehicle_counter = 0;

configure.changename_last = {};
configure.changename_new_last = {};

configure.call_taxi_last = {};
configure.call_police_last = {};

configure.questions = new Array(10);

for(let i = 0; i < configure.questions.length; i++) {
  configure.questions[i] = {};
  configure.questions[i].answers = {};
}

configure.gangzones = new Array(100);

configure.blips = new Array(500);

configure.chatonhead = new Array(999);

configure.othermarkers = new Array(999);
configure.othercolshapes = new Array(999);

configure.workmarkers = new Array(999);
configure.workcolshapes = new Array(999);

configure.jobsmarkers = new Array(999);
configure.jobscolshapes = new Array(999);
configure.jobscheckpoints = new Array(999);
configure.jobscheckpoints_pos_1 = new Array(10);
configure.jobscheckpoints_pos_2 = new Array(10);

configure.jobs_1_markers = new Array(10);
configure.jobs_1_colshapes = new Array(10);
configure.jobs_1_status = new Array(10);

configure.job_taxi_last_call = 0;
configure.fraction_police_last_call = 0;

for(let i = 0; i < configure.jobs_1_status.length; i++) {
  configure.jobs_1_status[i] = 0;
}

configure.fractionsmarkers = new Array(100);
configure.fractionscolshapes = new Array(100);

configure.gangsmarkers = new Array(100);
configure.gangscolshapes = new Array(100);

configure.schoolsmarkers = new Array(100);
configure.schoolscolshapes = new Array(100);

/* SYSTEMS CARS */

configure.sys_vehicles = new Array(500);
configure.vehicle_params = new Array(500);

for(let i = 0; i < configure.vehicle_params.length; i++) {
  configure.vehicle_params[i] = {};
}

/* OVER */

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

configure.businesslabels = new Array(999);
configure.businesstips = new Array(999);
configure.businessname = new Array(999);
configure.businessblips = new Array(999);
configure.businessmarkers = new Array(999);
configure.businesscolshapes = new Array(999);
configure.businessnumber = new Array(999);
configure.businesstate = new Array(999);
configure.businessowner = new Array(999);
configure.businesscoast = new Array(999);
configure.businesslock = new Array(999);

configure.createvehicle = new Array(999);
configure.createvehicle_count = 0;
configure.staffobjects = new Array(999);
configure.staffobjects_count = 0;

configure.gangzonestatusnow = 0;
configure.gangzonestatusnowid = 0;
configure.gangzonestatuswar = 0;
configure.gangzonestatustimer = 0;
configure.gangzonestatustimer_min = 0;
configure.gangzonestatustimer_sec = 0;
configure.gangzonesfrags_grove = 0;
configure.gangzonesfrags_ballas = 0;
configure.gangzonescapturehour = 0;
configure.gangzonecolshapes = new Array(999);

configure.warehouses = new Array(10);

for(let i = 0; i < configure.warehouses.length; i++) {
  configure.warehouses[i] = {};
}

configure.warelock_grove = 0;
configure.warelock_ballas = 0;

configure.online = 0;
configure.loaded_gangzones_count = 0;
configure.loaded_register_question_count = 0;
configure.loaded_blips_count = 0;
configure.loaded_warehouses_count = 0;
configure.loaded_vehicles_count = 0;
configure.loaded_houses_count = 0;
configure.loaded_business_count = 0;

configure.date = 0;
configure.hour = 0;
configure.min = 0;
configure.seconds = 0;

// Blizzard weather = snow hard;
configure.weather = "Clear";
