import { Webview } from "webview-bun";

const serverWorker = new Worker(__dirname + "/express_server.ts");

import { embeddedFiles } from "bun";

for (const file of embeddedFiles) {
  console.log(file.name); // "logo.png"
  console.log(file.size); // 1234
//   console.log(await file.bytes()); // Uint8Array(1234) [...]
}

const webview = new Webview();
webview.title = "Todo App";
webview.navigate("http://localhost:3000")

// webview.setHTML(html);
webview.run();

// serverWorker.postMessage({ command: "start" });