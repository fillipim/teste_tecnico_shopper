"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const data_source_1 = require("./data-source");
const readingRoutes_1 = require("./routes/readingRoutes");
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("", readingRoutes_1.readingRoutes);
app.get("/api", (req, res, next) => res.json({ texto: "Ei rapaz" }));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Banco de dados conectado com sucesso!!");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
})
    .catch((error) => console.log("Erro ao conectar no banco de dadosQ: ", error));
