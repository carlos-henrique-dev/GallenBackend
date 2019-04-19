const http = require("http");
const config = require("./src/config/config");
const app = require("./src/app");

const server = http.createServer(app);

server.listen(config.app);
