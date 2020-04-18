const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const UIMenuListItem = NativeUI.UIMenuListItem;
const Point = NativeUI.Point;
const ItemsCollection = NativeUI.ItemsCollection;

mp.gui.cursor.visible = true;
mp.gui.chat.show(false);

const ui = new Menu("Admin", "Hewks", new Point(50, 50));
ui.AddItem(
  new UIMenuItem(
    "List Item",
    "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint."
  )
);

ui.ItemSelect.on((item) => {
  if (item instanceof UIMenuItem) {
    console.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
  }
});

mp.keys.bind(0x6a, false, () => {
  if (ui.Visible) ui.Close();
  else ui.Open();
});
