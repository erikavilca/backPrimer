import express from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import { __dirname } from "./path.js";
import productRouter from "./routes/productos.routes.js";
import cartRouter from "./routes/carrito.routes.js";
import multerRouter from "./routes/imagenes.routes.js";
import chatRouter from "./routes/chat.routes.js";
import orderRouter from "./routes/order.routes.js";
import userRouter from "./routes/registrarse.routes.js";

const app = express();
app.use(express.json()); //Por falta de esto nio andaba para levantar...
const hbs = create();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log("Server on port", PORT);
});

await mongoose.connect("mongodb+srv://erick:Galeno11@cluster0.zf3t4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("BDD conectado")).catch((e) => console.log("error al conectar BDD:", e));

const io = new Server(server);

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//Rutas
app.use("/public", express.static(__dirname + "/public"));
app.use("/api/registrarse", userRouter)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);  //Por chequear todo codigo por atras...
app.use("/api/chat", chatRouter);
app.use("/upload", multerRouter);
app.get("/", (req, res) => {
  res.status(200).send("Ok");
});







//chat pero no entregar
let mensajes = [];
io.on("connection", (socket) => {
  console.log("Usuario conectado: ", socket.id);

  socket.on("mensaje", (data) => {
    console.log("Mensaje recibido: ", data);
    mensajes.push(data);
    socket.emit("respuesta", mensajes);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado: ", socket.id);
  });
});
