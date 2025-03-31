import productModel from "../dao/models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const prod = await productModel.find()

    if (prod) {
      res.status(200).send("products", { products: prod });
      res.stat
      // res.status(200).json({prod})
    } else {
      res.status(404).json({ mensaje: "Producto no existe" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: "Error al consultar producto: ", e });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const respuesta = await productModel.create(product);
    res.status(201).send("Producto creado correctamente", respuesta );
    res.status(201).json({
      message: "Producto creado correctamente",
      product: respuesta,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Error al crear producto, mirar por consola el error");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const updateProduct = req.body;
    const respuesta = await productModel.findByIdAndUpdate(
      idProd,
      updateProduct
    );
    res.status(200).send("Producto actualizado correctamente");
  } catch (e) {
    console.log(e);

    res.status(500).send("Error al actualizar producto: ", e);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const idProd = req.params.pid;
    const respuesta = await productModel.findByIdAndDelete(idProd);
    res.status(200).send("Producto eliminado correctamente");
  } catch (e) {
    res.status(500).send("Error al eliminar producto: ", e);
  }
};
