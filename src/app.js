const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/config");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// importando rotas
const userRoutes = require("./routes/user_routes");
const costumerRoutes = require("./routes/costumers_routes");
const productRoutes = require("./routes/products_routes");
const allnight_drugstoreRoutes = require("./routes/allnight_drugstore_routes");

// configurando middlewares
app.use(morgan("dev")); // para fazer um log das requisições
app.use(bodyParser.urlencoded({ extended: true })); // para fazer o parse das resquisições
app.use(bodyParser.json()); // passando as requisições para json

// conectando ao mongodb atlas
mongoose.connect(config.db.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
});
console.log("conectado ao banco de dados");

// configurando o cors (para aceitar requisição de outros locais)
app.use(config.cors);
// configurando as rotas
app.use("/", (req, res, next) => {
    res.status(200).json({
        message: "ola"
    });
});
app.use("/user", userRoutes);
app.use("/costumers", costumerRoutes);
app.use("/products", productRoutes);
app.use("/allnight_drugstore", allnight_drugstoreRoutes);

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
