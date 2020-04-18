let addMoney = (player, total) => {
  console.log("Perr: Add " + total + " to: " + player.name);
  mp.players.local.setMoney(total);
};

mp.events.add("hewks_addMoney", addMoney);
