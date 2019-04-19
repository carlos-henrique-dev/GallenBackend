const cors = require("./cors");

const config = {
    app: {
        port: process.env.PORT || 3003
    },
    db: {
        mongoURI:
            "mongodb+srv://henriquegalen:QDCqEP4E4jbm7r6@galen-backend-lm7ih.mongodb.net/test?retryWrites=true"
    },
    secret: "MyJwtSecretVeryPowerfullHaKoo21p",
    cors: cors
};

module.exports = config;
