import { app, BrowserWindow, ipcMain as ipc, IpcMainEvent } from "electron";
import { onAppReady } from "./lib/app";
import { mainWindow } from "./lib/MainWindow";

if (require("electron-squirrel-startup")) {
  app.quit();
}

app.on("ready", onAppReady);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow.open();
  }
});

// Two-way IPC with invoke
async function handleInvokeValue(_event: IpcMainEvent, value: string) {
  console.log({ value });
  return value;
}

ipc.handle("invoke-value", handleInvokeValue);
