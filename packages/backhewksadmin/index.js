let addMoney = (player, total) => {
  console.log("Perr: Add " + total + " to: " + player.name);
  mp.game.stats.statSetInt(mp.game.joaat("SP0_TOTAL_CASH"), total, false);
};

mp.events.add("hewks_addMoney", addMoney);
