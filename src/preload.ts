import { contextBridge, ipcRenderer as ipc } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    isRenderer: typeof ipc;
  }
}

const api = {
  invokeValue: (value: string) => ipc.invoke("invoke-value", value),
};

contextBridge.exposeInMainWorld("Main", api);
