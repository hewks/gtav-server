let addMoney = (player, total) => {
  console.log("Perr: Add " + total + " to: " + player.name);
};

mp.events.add("hewks_addMoney", addMoney);
