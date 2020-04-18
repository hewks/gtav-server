const currency = require("../currency-api");

let addMoney = (player, total) => {
  console.log("Add " + total + " to: " + player.name);
};

function playerJoinHandler(player) {
  console.log(player.name + " join. Hewks");
}

mp.events.add("playerJoin", playerJoinHandler);

mp.events.add("hewks_addMoney", addMoney);
