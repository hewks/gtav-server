/* ======================== */
/* Gamemode by Tellarion */
/* Special for lsfivem.com */
/* ======================== */

var configure = require('./configure.js');

console.log('[!] GameMode by Tellarion. Version LSFIVEM v1.9');
require('./modules/distance.js');
console.log('[OK] Distance & Base Functions...');
require('./events.js');
console.log('[OK] Events...');
require('./commands.js');
console.log('[OK] Player & Staff commands...');
require('./loaders/registration.js');
console.log('[OK] Registration Data...');
setTimeout(function() { require('./loaders/blips.js'); console.log('[OK] Blips...'); }, 1000);
setTimeout(function() { require('./loaders/warehouses.js'); console.log('[OK] Warehouses...'); }, 2000);
setTimeout(function() { require('./markcols.js'); console.log('[OK] Markers & Colshapes...'); }, 3000);
setTimeout(function() { require('./loaders/gangzones.js'); console.log('[OK] GangZones...'); }, 4000);
setTimeout(function() { require('./loaders/vehicles.js'); console.log('[OK] Vehicles...'); }, 5000);
setTimeout(function() { require('./loaders/business.js'); console.log('[OK] Business...'); }, 7000);
setTimeout(function() { require('./loaders/houses.js'); console.log('[OK] Houses...'); configure.gamemodeloaded = 1; }, 10000);

console.log('[OK] GameMode success started');
