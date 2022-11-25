import { app, ipcMain as ipc } from "electron";
import { readFileSync } from "fs";
import { resolve } from "path";
import {
  onAppActivate,
  onAppReady,
  onAppWindowsAllClosed,
} from "./lib/Application";
import { fetch } from "./lib/InterProcessCommunication";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const path = resolve(__dirname, "main_window", "config.json");
const file = readFileSync(path, "utf-8");
const config = JSON.parse(file);

app.on("ready", () => onAppReady(config));

app.on("window-all-closed", () => onAppWindowsAllClosed());

app.on("activate", () => onAppActivate(config));

ipc.handle("fetch", (_event, url, options) => {
  return fetch(url, options);
});
