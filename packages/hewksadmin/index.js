const currency = require("../currency-api");

let addMoney = (player, total) => {
  console.log("Add " + total + " to: " + player.name);
};

mp.events.add("hewks", addMoney);
