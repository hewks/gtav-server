const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

// const actions = ["Money $2500"];

// // main menu
let mainMenu = new Menu("Hewks Admin", "", new Point(950, 300));
mainMenu.Visible = true;

// mainMenu.ItemSelect.on((item, index) => {
//   console.log("Hola admin");
// });

// let actions = [];

// // categories
// actions.forEach((action, index) => {
//   mainMenu.AddItem(new UIMenuItem(action, ""));
// });

mp.keys.bind(0x6a, false, () => {
  //    mainMenu.Visible = !mainMenu.Visible;
  console.log("Hola admin");
});
