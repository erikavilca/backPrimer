import express from "express";
import { create } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser"
import passport from "passport";
import "./BD.js"

import { __dirname } from "./path.js";
import inicializePassport from "./configuracion/passport.conf.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carrito.routes.js";
import sessionRouter from "./routes/session.routes.js";
import viewsRouter from "./routes/views.routes.js"

const app = express();
const PORT = 8080;
app.use(express.json()); //Por falta de esto nio andaba para levantar...

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
inicializePassport()

const hbs = create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Rutas
app.use("/public", express.static(__dirname + "/public"));
app.use("/api/sessions", sessionRouter);
app.use("/products", productRouter);
app.use("/api/carts", cartRouter); //areglar carts
app.use("/", (req, res)=> {res.send("bienbnido ")})

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});