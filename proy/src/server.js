import express from "express";
import { create } from "express-handlebars";
import path from "path";
import { __dirname } from "./path.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carrito.routes.js";
import multerRouter from "./routes/imagenes.routes.js";

const app = express();
const hbs = create();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);
app.set("views", path.join(__dirname, "views"));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/upload", multerRouter);

const productos = [
  {
    title: "Pizza",
    description: "rico",
    price: 4900,
    stock: 20,
    status: true,
  },
  {
    title: "Empanadas",
    description: "good",
    price: 1000,
    stock: 40,
    status: true,
  },
  {
    title: "papa frita",
    description: "rica y crocantes",
    price: 3200,
    stock: 10,
    status: true,
  },
];
app.get("/", (req, res) => {
  res.render("productos", { productos });
});

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});
