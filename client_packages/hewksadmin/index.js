const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;

mp.gui.cursor.visibility = false;
mp.gui.chat.show(false);

const ui = new Menu("Admin", "Hewks", new Point(50, 50));
ui.AddItem(new UIMenuItem("List Item"));
ui.AddItem(new UIMenuItem("List Item 2"));
ui.AddItem(new UIMenuItem("List Item3"));
ui.AddItem(new UIMenuItem("List Item4"));
ui.AddItem(new UIMenuItem("List Item5"));
ui.AddItem(new UIMenuItem("List Item6"));
ui.AddItem(new UIMenuItem("List Item7"));
ui.AddItem(new UIMenuItem("List Item8"));

ui.ItemSelect.on((item) => {
  if (item instanceof UIMenuItem) {
    console.log(item);
  }
});

mp.keys.bind(0x6a, false, () => {
  if (ui.Visible) ui.Close();
  else ui.Open();
});
