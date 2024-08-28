import express = require("express");
import "reflect-metadata";
import { AppDataSource } from "./data-source";

const app = express();

app.use(express.json());

app.get("/api", (req, res, next) => res.json({ txto: "Ei rapaz" }));

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao conectar no banco de dados: ", error));
