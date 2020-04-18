//const currency = require("../currency-api");

mp.events.add("hewks_addMoney", (player, total) => {
  console.log("Add " + total + " to: " + player.name);
});
