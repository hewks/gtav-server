const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

mp.gui.cursor.visibility = false;
mp.gui.chat.show(false);

const actions = [
  {
    text: "Add $2500",
    value: 2500,
    type: "money",
  },
];

const ui = new Menu("Admin", "Hewks", new Point(50, 50));
ui.Close();

actions.forEach((action, index) => {
  ui.AddItem(new UIMenuItem(action.text));
});

ui.ItemSelect.on((item) => {
  if (item instanceof UIMenuItem) {
    switch (item.Text) {
      case actions[0].text:
        mp.events.callRemote("hewks:add", 2500);
        break;

      default:
        console.log("Perra");
        break;
    }
  }
});

mp.keys.bind(0x6a, false, () => {
  if (ui.Visible) ui.Close();
  else ui.Open();
});

mp.keys.bind(0x7a, false, () => {
  if (mp.gui.cursor.visible) {
    mp.gui.cursor.show(false, false);
  } else {
    mp.gui.cursor.show(true, true);
  }
});
