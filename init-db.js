"use strict";

// Inicializar la base datos con los datos mínimos para funcionar
import readline from "readline";

// Cargar los modelos
import { Ad } from "./models/ad.js";

async function main() {
  // Preguntar al usuario si está seguro
  const continuar = await preguntaSiNo(
    "¿Estás segura, segura... segura de que quieres borrar la base de datos? "
  );
  if (!continuar) {
    process.exit();
  }

  // Inicializar la colección de anuncios
  await initAds();
}

main().catch((err) => console.log("¡Vaya, ha habido un error!", err));

async function initAds() {
  // Borrar todos los documentos de la colección de anuncios
  const result = await Ad.deleteMany();
  console.log(`Se han eliminado ${result.deletedCount} anuncios.`);

  // Crear los anuncios iniciales
  const inserted = await Ad.insertMany([
    {
      name: "La materia oscura",
      sale: true,
      price: 175,
      pic: "lmo.jpg",
      tags: ["trilogy", "adventure", "fantasy"],
    },
    {
      name: "La historia interminable",
      sale: false,
      price: 80,
      pic: "neverending.jpg",
      tags: ["fantasy", "adventure"],
    },
    {
      name: "El infinito en un junco",
      sale: true,
      price: 40,
      pic: "infinito-junco.jpg",
      tags: ["essay", "history"],
    },
    {
      name: "Una habitación propia",
      sale: false,
      price: 35,
      pic: "habitacion.jpg",
      tags: ["essay", "feminism"],
    },
    {
      name: "La maldición de Hill House",
      sale: true,
      price: 68,
      pic: "haunting.jpg",
      tags: ["horror", "suspense", "drama"],
    },
  ]);
  console.log(`Se han creado ${inserted.length} anuncios.`);
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const myInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    myInterface.question(texto, (respuesta) => {
      myInterface.close();
      if (respuesta.toLowerCase() === "si") {
        resolve(true);
        return;
      }
      resolve(false);
    });
  });
}
