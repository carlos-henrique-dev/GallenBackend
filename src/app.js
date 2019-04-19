const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbURI = require("./config/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// importando rotas
const costumerRoutes = require("./routes/costumers_routes");
const productRoutes = require("./routes/products_routes");

// configurando middlewares
app.use(morgan("dev")); // para fazer um log das requisições
app.use(bodyParser.urlencoded({ extended: true })); // para fazer o parse das resquisições
app.use(bodyParser.json()); // passando as requisições para json

// conectando ao mongodb atlas
mongoose.connect(dbURI.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
});
console.log("conectado ao banco de dados");

// configurando o cors (para aceitar requisição de outros locais)
app.use((req, res, next) => {
    res.header("Access-Controll-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
    }
    next();
});
// configurando as rotas
app.use("/costumers", costumerRoutes);
app.use("/products", productRoutes);

// tratando caminho inexistente
app.use((req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});

// tratando erros internos
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: "Sorry, but we had an internal error: " + error.message
        }
    });
});

module.exports = app;
