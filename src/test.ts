import { serveConfig} from "./server";

const server = Bun.serve(serveConfig);
console.log('Server running at port', server?.port);
// server.stop();
// server.unref();
