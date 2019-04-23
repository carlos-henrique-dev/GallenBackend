const http = require("http");
const config = require("./src/config/config");
const app = require("./src/app");
const port = process.env.PORT || 3003;

const server = http.createServer(app);

server.listen(port);
