const express = require("express");
const config = require("./src/config/config");
const app = require("./src");

const server = express();

server.use(app);

server.listen(config.app);
//server.listen(3006, "192.168.1.107");
