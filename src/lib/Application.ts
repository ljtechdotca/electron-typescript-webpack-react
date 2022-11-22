import { app, BrowserWindow } from "electron";
import { mainWindow } from "./MainWindow";

export function onAppReady() {
  mainWindow.open();
}

export function onAppActivate() {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow.open();
  }
}

export function onAppWindowsAllClosed() {
  if (process.platform !== "darwin") {
    app.quit();
  }
}
