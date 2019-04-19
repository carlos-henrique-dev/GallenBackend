const http = require("http");
const port = process.env.PORT || 3003;
const app = require("./src/app");

const server = http.createServer(app);

server.listen(port);
