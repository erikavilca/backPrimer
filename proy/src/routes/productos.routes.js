import { Router } from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";
import { getProducts } from "../models/product.model.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:pid", getProduct);
productRouter.post("/", createProduct);
productRouter.put("/:pid", updateProduct);
productRouter.delete("/:pid", deleteProduct);

export default productRouter;
