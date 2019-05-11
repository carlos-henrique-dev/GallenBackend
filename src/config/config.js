const cors = require("./cors");

const config = {
    app: {
        port: process.env.PORT || 3004
    },
    db: {
        mongoURI: "mongodb://localhost:27017/galen"
        //"mongodb+srv://henriquegalen:QDCqEP4E4jbm7r6@galen-backend-lm7ih.mongodb.net/test?retryWrites=true"
    },
    secret: "MyJwtSecretVeryPowerfullHaKoo21p",
    cors: cors,
    storage_type: "local"
};

module.exports = config;
