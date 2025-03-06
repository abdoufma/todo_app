import type { BunRequest } from 'bun';
import { deleteTodo, getTodoById, getTodos, saveTodo, updateTodo } from './db';
import { serveStatic } from './utils';


const CORS_HEADERS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'OPTIONS, POST', 'Access-Control-Allow-Headers': 'Content-Type' };

type SERVE = Parameters<typeof Bun.serve>[0];

export const serveConfig : SERVE = {
    port : 3000,
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

export const server = null //Bun.serve(serveConfig)

// console.log('Server running at port', server.port);


// OLD WAY : 
// import handler from 'serve-handler';
// import http from 'http';
// const server = http.createServer((req, res) =>  handler(req, res, { public: PUBLIC_DIR }));
// server.listen(3000, () => console.log('Running at http://localhost:3000'));