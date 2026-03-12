import Server from '../server.js';

const server: Server = new Server();
server.addRoutes( [] );

server.start( 80, "localhost" );