import { net } from "electron";
import { mainWindow } from "./MainWindow";

export function fetch(
  url: string,
  options: RequestInit = { method: "GET" }
) {
  return new Promise((resolve, reject) => {
      const request = net.request(url);
      request.on("response", (response) => {
          const data: Buffer[] = [];
          response.on("data", (chunk) => {
              data.push(chunk);
          });
          response.on("end", () => {
              const json = Buffer.concat(data).toString();
              resolve(json);
          });
      });
      request.end();
  });
}
