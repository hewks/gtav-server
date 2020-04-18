const player = mp.players.local;

mp.events.add("render", () => {
  mp.game.graphics.drawText("$ " + player.__hewksCash, [0.85, 0.1], {
    font: 7,
    color: [133, 187, 101, 185],
    scale: [0.8, 0.8],
    outline: true,
  });
});

mp.keys.bind(0x7a, false, () => {
  console.log(player);
});
