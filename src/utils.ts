import { join } from 'path';
import { existsSync, mkdirSync } from "fs";
import { appendFile } from "fs/promises";
import chalk from "chalk";
import { homedir } from 'os';

const APP_NAME = "remed-app-vite";
export const appDir = process.platform === "win32" ? join(homedir(), "AppData/Roaming/", APP_NAME) : join(homedir(),"Library/Application Support/" , APP_NAME);
if(!existsSync(appDir)) mkdirSync(appDir, {recursive: true});

export const PUBLIC_DIR = join(__dirname, "../frontend/out");

export const serveStatic = async (req : Request, config : {root : string} = {root : PUBLIC_DIR}) => {
    let path = new URL(req.url).pathname;
    if (path === "/") path = 'index.html';
    return new Response(Bun.file(join(config.root, path)));
};



export const log = async <T extends string>(...args : T[]) => {
    console.log(chalk.whiteBright(...args));
    // add timestamp in YYYY-MM-DDTHH:mm:SS format:
    const timestamp = new Date().toISOString().replace(/\..+/, '');
    const logPath = join(appDir, 'remed-server.log');
    await appendFile(logPath,`[${timestamp}] ${args.join(" ")}\n`);
}

// await log("hello world");

export const logDebug = <T extends string>(...args : T[]) => {
  console.log(chalk.blueBright(...args));
};

export const logError = <T extends string>(...args : T[]) => {
  console.log(chalk.redBright(...args));
};

export const logSuccess = <T extends string>(...args : T[]) => {
  console.log(chalk.greenBright(...args));
};

export const logWarning = <T extends string>(...args : T[]) => {
  console.log(chalk.yellowBright(...args));
};

export const logInfo = <T extends string>(...args : T[]) => {
  console.log(chalk.cyanBright(...args));
};
