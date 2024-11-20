import { Router } from "express";
import crypto from "crypto";
import { __dirname } from "../path.js";
import { promises as fs } from "fs";
import path from "path";

const cartRouter = Router();

const carritosPath = path.resolve(__dirname, "../src/db/carrito.json"); //para que sea confidencial
const carritosData = await fs.readFile(carritosPath, "utf-8");
const carrito = JSON.parse(carritosData);

cartRouter.get("/:cid", (req, res) => {
  const idCarrito = req.params.cid;
  const cart = carrito.find((cart) => cart.id == idCarrito);

  if (cart) {
    res.status(200).send(cart.products);
  } else {
    res.status(404).send({ mensaje: "El carrito vacio" });
  }
});

cartRouter.post("/api/carts", async (req, res) => {
  const newCart = {
    id: crypto.randomBytes(5).toString("hex"),
    products: [],
  };
  carrito.push(newCart);
  await fs.writeFile(carritosPath, JSON.stringify(carrito));
  res.status(200).send(`Carrito creado con el ID ${newCart.id}`);
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const idCarrito = req.params.cid;
  const idProducto = req.params.pid;
  const { quantity } = req.body;

  const carrito = carrito.find((cart) => cart.id == idCarrito);

  if (carrito) {
    const i = carrito.products.findIndex((prod) => prod.id == idProducto);

    if (i != -1) {
      carrito.products[i].quantity = quantity;
    } else {
      carrito.products.push({ id: idProducto, quantity: quantity });
    }
    await fs.writeFile(carritosPath, JSON.stringify(carrito));
    res.status(200).send("Actualizacion correcta.");
  } else {
    res.status(404).send({ mensaje: "El carrito no existe" });
  }
});

export default cartRouter;
