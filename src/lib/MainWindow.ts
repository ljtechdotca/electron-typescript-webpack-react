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
  _instance: BrowserWindow;
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
        click: () => {
          if (this._instance.isVisible()) {
            this.hide();
          } else {
            this.show();
          }
        },
      },
      {
        label: "Open Debugger",
        click: () => {
          this.openDebugger();
        },
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

    this._instance = new BrowserWindow(options);

    this._instance.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    this._createMenu();
  }

  hide() {
    this._instance.hide();
  }

  show() {
    this._instance.show();
  }

  openDebugger() {
    this._instance.webContents.openDevTools();
  }
}

export const mainWindow = new MainWindow();
