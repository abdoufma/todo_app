import docPage from "@/public/document.html";
import indexPage from "@/public/index.html";

const server = Bun.serve({
    routes: {
        "/": indexPage,
        "/doc": docPage,
        "/ping": new Response("pong"),
        "/json": Response.json({ message: "Hello Electrobun" }),
    },
    development : true,
    fetch(req) {
        return new Response("Not Found", { status: 404 });
    }
})

console.log(`Server is running on ${server.url}`);
export default server;