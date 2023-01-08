import express from "express";

export const indexRouter = express.Router();

indexRouter.get("/", (req, res, next) => {
  res.setHeader("Content-type", "text/html");
  res.send(
    '<p>¡Hola! Para visualizar los anuncios, por favor, visita este <a href="/ads/search">endpoint</a>.</p>'
  );
});
