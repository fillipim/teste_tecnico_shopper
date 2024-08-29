import express = require("express");
import "reflect-metadata";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import { readingRoutes } from "./routes/readingRoutes";
import { handleError } from "./errors/appError";

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use("/api", readingRoutes);
app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!!");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Erro ao conectar no banco de dadosQ: ", error)
  );
