const cors = require("./cors");

const config = {
    app: {
        port: process.env.PORT || 3004
    },
    db: {
        mongoURI: "mongodb://localhost:27017/galen"
    },
    secret: "MyJwtSecretVeryPowerfullHaKoo21p",
    cors: cors,
    storage_type: "local"
};

module.exports = config;
