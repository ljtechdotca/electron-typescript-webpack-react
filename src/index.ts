import { app, ipcMain as ipc } from "electron";
import {
  onAppActivate,
  onAppReady,
  onAppWindowsAllClosed,
} from "./lib/Application";
import { fetch } from "./lib/InterProcessCommunication";

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", onAppReady);

app.on("window-all-closed", onAppWindowsAllClosed);

app.on("activate", onAppActivate);

ipc.handle("fetch", (_event, url, options) => {
  return fetch(url, options);
});
