import { IpcMainEvent } from "electron";

export async function handleInvokeValue(_event: IpcMainEvent, value: string) {
  console.log({ value });
  return value;
}
