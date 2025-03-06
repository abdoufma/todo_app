import { join } from 'path';

export const PUBLIC_DIR = join(__dirname, "../frontend/out");

export const serveStatic = async (req : Request, config : {root : string} = {root : PUBLIC_DIR}) => {
    let path = new URL(req.url).pathname;
    if (path === "/") path = 'index.html';
    return new Response(Bun.file(join(config.root, path)));
};


