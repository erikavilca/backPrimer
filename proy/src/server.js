import express from "express";
import { create } from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser"
import passport from "passport";
import "./BD.js"

import { __dirname } from "./path.js";
import {inicializePassport} from "./configuracion/passport.conf.js"
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carrito.routes.js";
import sessionRouter from "./routes/session.routes.js";
import viewsRouter from "./routes/views.routes.js"

//ya verificando por consola la clave recien inicializaPassport porque sino carga error xd
import dotenv from 'dotenv';
dotenv.config();
console.log("La clave secreta es:", process.env.JWT_SECRET)


const app = express();
const PORT = 8080;
app.use(express.json()); //Por falta de esto nio andaba para levantar...

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
inicializePassport()



const hbs = create();
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(__dirname + "/public"));

//Rutas
app.use("/api/sessions", sessionRouter);
app.use("/products", productRouter);
app.use("/api/carts", cartRouter); //areglar carts
app.use("/", viewsRouter)

app.listen(PORT, () => {
  console.log("Server on port", PORT);
});