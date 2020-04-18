const localPlayer = mp.players.local;

mp.events.add("render", () => {
  mp.game.graphics.drawText("$ 50000", [0.85, 0.1], {
    font: 7,
    color: [133, 187, 101, 185],
    scale: [0.8, 0.8],
    outline: true,
  });
});
