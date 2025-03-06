import Electrobun, { BrowserWindow, type ElectrobunEvent }  from "electrobun/bun";

// import {serveConfig} from "./server";
// const server = Bun.serve({...serveConfig, port : 3000});

import server from "./express_server";
import { closeDb } from "./db";


console.log('Server listening on', ("port" in server) ?  server.port : "port 3000" );

const win = new BrowserWindow({
  title: "Hello Electrobun",
  url: "http://localhost:3000/",
  frame : { width : 1280, height : 720, x: 200, y : 100 },
});


win.on("close", () => {
  console.log("Window closed");
});

win.on('will-navigate', (e : any) => {
  // console.log(Object.keys(e));
  console.log("Navigating to", e.data.url);
  // const newWindow = new BrowserWindow({
  //     title: "Hello Electrobun",
  //     url: e.data.url,
  //     frame : { width : 1280, height : 720, x: 400, y : 400 },
  // });

});


win.on("closed", () => {
  console.log("Window closed");
  // server.close();
  ("stop" in server && typeof server.stop === "function") ? server.stop() : server.close();
  closeDb();
});



Electrobun.events.on('will-navigate', (e) => {});

// let x : ElectrobunEvent<{id : number}, any> = Electrobun.events.events.window.close({id : 1});

// console.log(Electrobun.events.events.webview.newWindowOpen)