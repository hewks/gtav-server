//const currency = require("../currency-api");

mp.events.add("hewks:addMoney", (player, total) => {
  console.log("Add " + total + " to: " + player.name);
});
