import { BrowserWindow } from "electrobun/bun";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// const indexPage = Bun.file(join(__dirname, "index.html")).toString();
// const indexPage = await readFile(join(__dirname, "index.html"), {encoding : "utf-8"});

const win = new BrowserWindow({
  title: "Hello Electrobun",
  url: "http://localhost:3000/",
//   html : indexPage,
  frame : {
    width : 1280,
    height : 720,
    x: 200,
    y : 100
  }
});