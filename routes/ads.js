import express from "express";
import { Ad } from "../models/ad.js";

export const adsRouter = express.Router();

/* GET global */
adsRouter.get("/", async function (req, res, next) {
  try {
    // Coge todos los ads
    const result = await Ad.find();
    // Le pone un header a la respuesta
    res.setHeader("Content-type", "application/json");
    // Envía la respuesta
    res.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
});

/* GET de la página de búsquedas */
adsRouter.get("/search", async function (req, res, next) {
  try {
    const filter = {};
    if (req.query.name)
      filter.name = { $regex: `${req.query.name}`, $options: "i" };
    if (req.query.sale) filter.sale = req.query.sale;
    if (req.query.price) filter.price = filterCost(req.query.price);
    if (req.query.tags) filter.tags = { $all: req.query.tags };

    const limit = parseInt(req.query.limit || 15);
    const skip = parseInt(req.query.skip || 0);

    const sort = req.query.sort;
    const select = req.query.select;

    console.log(filter);
    const adsList = await Ad.list(filter, limit, skip, sort, select);
    // Si la lista es undefined, saca un array vacío
    res.json(adsList || []);
  } catch (error) {
    console.log(error);
  }
});

/* POST para añadir un artículo */
adsRouter.post("/", async function (req, res, next) {
  try {
    // Constantes para cada propiedad del body
    const { name, sale, price, pic, tags } = req.body;
    // Nuevo objeto con el modelo de Mongoose
    const newAd = new Ad({ name, sale, price, pic, tags });

    const advert = await newAd.save();
    res.status(201).json(advert);
  } catch (error) {
    console.log(error);
  }
});

/* GET  tags existentes */
adsRouter.get("/tags", async function (req, res, next) {
  try {
    const result = (await Ad.find())
      .map((ad) => {
        return ad.tags;
      })
      .flat();
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify([...new Set(result)]));
  } catch (error) {
    console.log(error);
  }
});

/* Filtrado por precio */
function filterCost(queryParam) {
  const priceRanges = queryParam.split("-");

  if (priceRanges.length === 2) {
    if (priceRanges[0] !== "" && priceRanges[1] !== "")
      return { $gte: priceRanges[0], $lte: priceRanges[1] };
    if (priceRanges[0] !== "" && priceRanges[1] === "")
      return { $gte: priceRanges[0] };
    if (priceRanges[0] === "" && priceRanges[1] !== "")
      return { $lte: priceRanges[1] };
  } else {
    return priceRanges;
  }
}
