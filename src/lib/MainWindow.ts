import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  Tray,
} from "electron";
import { resolve } from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class MainWindow {
  private _browserWindow: BrowserWindow;
  private _menu: Menu;
  private _tray: Tray;
  private _icon = resolve(__dirname, "main_window", "icon.ico");
  private _smallIcon = resolve(__dirname, "main_window", "small-icon.png");

  private _createMenu() {
    this._tray = new Tray(this._icon);

    const template: (MenuItem | MenuItemConstructorOptions)[] = [
      {
        icon: this._smallIcon,
        label: "ljtech",
        enabled: true,
      },
      { type: "separator" },
      {
        label: "Hide / Show",
        click: () => this.toggleVisibility(),
      },
      {
        label: "Open Debugger",
        click: () => this.openDevTools(),
      },
      { type: "separator" },
      { role: "quit" },
    ];

    this._menu = Menu.buildFromTemplate(template);
    this._tray.setContextMenu(this._menu);
  }

  open() {
    const options = {
      height: 600,
      width: 800,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
      icon: this._icon,
    };

    this._browserWindow = new BrowserWindow(options);

    this._browserWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    this._createMenu();
  }

  toggleVisibility() {
    if (this._browserWindow.isVisible()) {
      this._browserWindow.hide();
    } else {
      this._browserWindow.show();
    }
  }

  openDevTools() {
    this._browserWindow.webContents.openDevTools();
  }
}

export const mainWindow = new MainWindow();
