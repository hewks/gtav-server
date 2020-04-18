// https://wiki.rage.mp/index.php?title=Getting_Started_with_Entity_variables

mp.events.add({
  "hewks:add": (player, amount) => {
    console.log("Amount:" + amount);
    let currentMoney = player.getVariable("cash");
    if (currentMoney && currentMoney >= 0 && amount > 0) {
      currentMoney += amount;
      player.setVariable("cash", currentMoney);
    }
    console.log("New: " + player.getVariable("cash"));
  },
  "hewks:remove": (player, amount) => {
    console.log("Amount: " + amount);
    let currentMoney = player.getVariable("cash");
    if (currentMoney && currentMoney >= 0 && currentMoney >= amount) {
      currentMoney -= amount;
      player.setVariable("cash", currentMoney);
    }
    console.log("New: " + player.getVariable("cash"));
  },
});

mp.events.add("playerJoin", (player) => {
  if (player) {
    player.setVariable("cash", 0);
  }
  console.log("Set initial cash");
});
