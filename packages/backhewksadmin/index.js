// https://wiki.rage.mp/index.php?title=Getting_Started_with_Entity_variables

mp.events.add({
  "hewks:add": (player, amount) => {
    console.log("Amount:" + player.__hewksCash);
  },
  "hewks:remove": (player, amount) => {
    console.log("Amount:" + player.__hewksCash);
  },
});

mp.events.add("playerJoin", (player) => {
  player.__hewksCash = 0;
  console.log(player.__hewksCash);
});
