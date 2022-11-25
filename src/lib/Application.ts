import { app, BrowserWindow } from "electron";
import { mainWindow } from "./MainWindow";

export function onAppReady(config: MainWindowConfig) {
  mainWindow.open(config);
  mainWindow.openDevTools();
}

export function onAppActivate(config: MainWindowConfig) {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow.open(config);
  }
}

export function onAppWindowsAllClosed() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}
