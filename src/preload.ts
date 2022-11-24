import { contextBridge, ipcRenderer as ipc } from "electron";

declare global {
  interface Window {
    Main: typeof api;
    isRenderer: typeof ipc;
  }
}

const api = {
  fetch: (url: string, options?: RequestInit) =>
    ipc.invoke("fetch", url, options),
};

contextBridge.exposeInMainWorld("Main", api);
