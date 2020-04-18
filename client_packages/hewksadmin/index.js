const NativeUI = require("nativeui");
const Menu = NativeUI.Menu;
const UIMenuItem = NativeUI.UIMenuItem;
const Point = NativeUI.Point;

mp.gui.cursor.visible = true;
mp.gui.chat.show(false);

const ui = new Menu("Admin", "Hewks", new Point(50, 50));
ui.AddItem(
  new UIMenuListItem(
    "List Item",
    "Fugiat pariatur consectetur ex duis magna nostrud et dolor laboris est do pariatur amet sint.",
    new ItemsCollection(["Item 1", "Item 2", "Item 3"])
  )
);

ui.ItemSelect.on((item) => {
  if (item instanceof UIMenuListItem) {
    console.log(item.SelectedItem.DisplayText, item.SelectedItem.Data);
  }
});

mp.keys.bind(0x6a, false, () => {
  if (ui.Visible) ui.Close();
  else ui.Open();
});
