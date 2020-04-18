// https://wiki.rage.mp/index.php?title=Getting_Started_with_Entity_variables
const localPlayer = mp.players.local;
let currentMoney;

mp.events.add("render", () => {
  if (currentMoney) {
    mp.game.graphics.drawText("$" + currentMoney, [0.85, 0.1], {
      font: 7,
      color: [133, 187, 101, 185],
      scale: [0.8, 0.8],
      outline: true,
    });
  }
});

mp.keys.bind(0x7a, false, () => {
  console.log(player);
});

mp.events.addDataHandler("hewksCash", (entity, newCash, oldCash) => {
  if (
    entity &&
    entity.remoteId === localPlayer.remoteId &&
    newCash !== oldCash
  ) {
    currentMoney = newCash;
  }
});
