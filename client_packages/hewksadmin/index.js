const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;

mp.gui.cursor.visibility = false;
mp.gui.chat.show(false);

const actions = [
  {
    text: "Add $2500",
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
        console.log("Add money");
        mp.events.callRemote("hewks_addMoney", "sebas", 2500);
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
