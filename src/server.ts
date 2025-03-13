import type { BunRequest } from 'bun';
import { closeDb, deleteTodo, getTodoById, getTodos, saveTodo, updateTodo } from './db';
import { log, serveStatic } from './utils';


const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'OPTIONS, POST', 'Access-Control-Allow-Headers': 'Content-Type' };

type SERVE = Parameters<typeof Bun.serve>[0];

export const serveConfig : SERVE = {
    port : process.env.PORT || 3000,
    fetch (req) {
        return serveStatic(req);
    },
    error: (e) => new Response(`<h2>Error: ${e.message}<h2/>`, { status: 500, headers: { 'Content-Type': 'text/html' } }) ,
    routes :{
        "/api/todos" : {
            GET : () => Response.json(getTodos(), { headers: CORS_HEADERS }),
            POST : async (req) => {
                const data = await req.json();
                try {
                    const saved = saveTodo(data);
                    return Response.json({id : saved.lastInsertRowid}, { status: 201, headers: CORS_HEADERS });
                } catch (err) {
                    return Response.json({message : (err as Error).message}, { status: 400 , headers: CORS_HEADERS});
                }
            }
        },
        "/api/todos/:id" : {
            GET : (req : BunRequest<`/api/todos/:id`>) => {
                const id = Number(req.params.id);
                return Response.json(getTodoById(id), {headers: CORS_HEADERS});
            },
            PUT : async (req : BunRequest<`/api/todos/:id`>) => {
                const id = Number(req.params.id);
                const data = await req.json();
                try {
                    const updated = updateTodo(id, data);
                    return Response.json(updated, { status: 200 , headers: CORS_HEADERS });
                } catch (err) {
                    return Response.json({message : (err as Error).message}, { status: 400 , headers: CORS_HEADERS});
                }
            },
            DELETE : (req : BunRequest<`/api/todos/:id`>) => {
                const id = Number(req.params.id);
                try {
                    const deleted  = deleteTodo(id);
                    return Response.json(deleted, { status: 200, headers: CORS_HEADERS  });
                } catch (err) {
                    return Response.json({message : (err as Error).message}, { status: 400, headers: CORS_HEADERS });
                }
            }
        }
    },
}


process.on('message', (m) => {
    log('[SERVER] got message:', m);
});

process.on("SIGABRT", () => {
    log("SIGABRT received");
    closeDb();
    server.stop();
});
  
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  try {
    const msg = JSON.parse(line);
    // Handle the message here. For example:
    if (msg.event === 'init') {
      // Do initialization work
      // Optionally send a reply:
      process.stdout.write(JSON.stringify({ status: 'initialized' }) + '\n');
    }
    // Add more event handling as needed.
  } catch (err) {
    console.error('Failed to parse incoming message:', line);
  }
});

export const server = Bun.serve(serveConfig)

log('Server running at port', server.port);


// OLD WAY : 
// import handler from 'serve-handler';
// import http from 'http';
// const server = http.createServer((req, res) =>  handler(req, res, { public: PUBLIC_DIR }));
// server.listen(3000, () => log('Running at http://localhost:3000'));