let app = require("./app");
let http = require('http');

//Use system configuration for port or use 6001 by default.
const port = process.env.port || 5000;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port);
console.log("Server starts listening on port: "+ port);
