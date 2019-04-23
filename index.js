const http = require("http");
const config = require("./src/config/config");
const app = require("./src/app");
const PORT = process.env.PORT || 8081;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(" rodando");
});
