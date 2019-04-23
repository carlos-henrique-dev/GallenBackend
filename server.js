/* const http = require("http");
const config = require("./src/config/config");
const app = require("./src");
const PORT = process.env.PORT || 8081;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(" rodando");
});
 */

const express = require("express");
const config = require("./src/config/config");
const app = require("./src");

const server = express();

server.use(app);

server.listen(config.app);

//const server = http.createServer(app);
