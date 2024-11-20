// cunado usamos los get ponermos entre los parentesis los '/' para saber por donde los estoy dando el link (yo lo creo)
//creo, corrijo y elimino los productos que yo quiera, hacerlo con la otra app y revisar.
// revisar los : de el ID
import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from "fs";
import path from "path";

const productRouter = Router();
const productosPath = path.resolve(__dirname, "./db/productos.json");
const productosData = await fs.readFile(productosPath, "utf-8");
const productos = JSON.parse(productosData);

productRouter.get("/", (req, res) => {
  const { limit } = req.query;
  const productos = productos.slice(0, limit);
  res.status(200).send(productos);
});

productRouter.get("/", (req, res) => {
  const idProducto = req.params.pid;
  const producto = productos.find((prod) => prod.id == idProducto);
  if (producto) {
    res.status(200).send(producto);
  } else {
    res.status(404).send({ mensaje: "nel producto que busca no existe" });
  }
});

//Creacion de nuevo proudcto
productRouter.post("/", async (req, res) => {
  const { title, description, code, price, category, stock } = req.body;
  const nuevoProducto = {
    id: crypto.randomBytes(10).toString("hex"), //Me genera un id unico
    title: title,
    description: description,
    code: code,
    category: category,
    price: price,
    stock: stock,
    status: true,
    thumbnails: [],
  };
  productos.push(nuevoProducto);
  await fs.writeFile(productosPath, JSON.stringify(productos));
  res
    .status(201)
    .send({ mensaje: `Producto creado con el id: ${nuevoProducto.id}` });
});

//Actualizacion de productos
productRouter.put("/:pid", async (req, res) => {
  const idProducto = req.params.pid;
  const {
    title,
    description,
    code,
    price,
    category,
    stock,
    thumbnails,
    status,
  } = req.body;
  const i = productos.findIndex((prod) => prod.id == idProducto);

  if (indice != -1) {
    productos[i].title = title;
    productos[i].description = description;
    productos[i].code = code;
    productos[i].price = price;
    productos[i].stock = stock;
    productos[i].status = status;
    productos[i].category = category;
    productos[i].thumbnails = thumbnails;
    await fs.writeFile(productosPath, JSON.stringify(productos));
    res.status(200).send({ mensaje: "Actualizacion correcta" });
  } else {
    res.status(404).send({ mensaje: "El producto selecionado no existe" });
  }
});

//Eliminar
productRouter.delete("/:pid", async (req, res) => {
  const idProducto = req.params.pid;
  const i = productos.findIndex((prod) => prod.id == idProducto);
  if (i != -1) {
    productos.splice(i, 1);
    await fs.writeFile(productosPath, JSON.stringify(productos));
    res.status(200).send({ mensaje: "producto eliminado" });
  } else {
    res.status(404).send({ mensaje: "El producto selecionado no existe" });
  }
});

export default productRouter;
