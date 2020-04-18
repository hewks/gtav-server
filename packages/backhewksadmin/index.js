// https://wiki.rage.mp/index.php?title=Getting_Started_with_Entity_variables

mp.events.add({
  "hewks:add": (player, amount) => {
    var current = player.getVariable("hewksCash");
    console.log("Current: " + current);
    current += amount;
    player.setVariable("hewksCash", current);
  },
  "hewks:remove": (player, amount) => {
    const current = player.getVariable("hewksCash");
    console.log("Current: " + current);
  },
});

mp.events.add("playerJoin", (player) => {
  player.setVariable("hewksCash", 10000);
});
