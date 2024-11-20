

import { Router } from "express";
import { uploadProds } from "../configuracion/multer.js";

const multerRouter = Router();

multerRouter.post("/products", uploadProds.single("product"), (req, res) => {
  res.status(200).send("Foto1");
});

export default multerRouter;
