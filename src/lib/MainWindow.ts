import { BrowserWindow, Menu, Tray } from "electron";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class MainWindow {
  private _browserWindow: BrowserWindow;

  public open({ title, icon, smallIcon, width, height }: MainWindowConfig) {
    this._browserWindow = new BrowserWindow({
      title,
      icon,
      width,
      height,
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    this._browserWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    const menu = Menu.buildFromTemplate([
      {
        icon: smallIcon,
        label: title,
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
    ]);

    const tray = new Tray(icon);

    tray.setContextMenu(menu);
  }

  toggleVisibility() {
    if (this._browserWindow.isVisible()) {
      this._browserWindow.hide();
    } else {
      this._browserWindow.show();
    }
  }

  send(channel: string, ...args: any[]) {
    console.log({ channel, args });
    this._browserWindow.webContents.send(channel, ...args);
  }

  openDevTools() {
    this._browserWindow.webContents.openDevTools();
  }
}

export const mainWindow = new MainWindow();
