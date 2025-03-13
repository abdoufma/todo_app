import { join } from 'path';
import { existsSync, mkdirSync } from "fs";
import { appendFile } from "fs/promises";
import chalk from "chalk";
import { app } from "electron"


const logDir = app.getPath("userData"); 
if (existsSync(logDir)) mkdirSync(logDir);
console.log('Log Dir:', logDir);


export const PUBLIC_DIR = join(__dirname, "../frontend/out");

export const serveStatic = async (req : Request, config : {root : string} = {root : PUBLIC_DIR}) => {
    let path = new URL(req.url).pathname;
    if (path === "/") path = 'index.html';
    return new Response(Bun.file(join(config.root, path)));
};



export const log = async (...args : unknown[]) => {
    console.log(chalk.whiteBright(args));
    await appendFile(join(logDir, 'remed-server.log'), args.join(' ') + '\n');
}

export const logDebug = (...args : unknown[]) => {
  console.log(chalk.blueBright(args));
};

export const logError = (...args : unknown[]) => {
  console.log(chalk.redBright(args));
};

export const logSuccess = (...args : unknown[]) => {
  console.log(chalk.greenBright(args));
};

export const logWarning = (...args : unknown[]) => {
  console.log(chalk.yellowBright(args));
};

export const logInfo = (...args : unknown[]) => {
  console.log(chalk.cyanBright(args));
};
