const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;

mp.gui.chat.show(false);

const ui = new Menu("Admin", "Hewks", new Point(50, 50));
ui.AddItem(new UIMenuItem("List Item"));

ui.ItemSelect.on((item) => {
  if (item instanceof UIMenuItem) {
    console.log(item);
  }
});

mp.keys.bind(0x6a, false, () => {
  if (ui.Visible) ui.Close();
  else ui.Open();
});
