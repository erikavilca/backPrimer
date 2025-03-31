import { Schema, model } from "mongoose";


const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: [String],
    default: [],
  },
});

const productModel = model("prod", productSchema);

export default productModel;


// export const getProducts = async (req, res) => {
//   try {
//     const { limit, page, filter, metFilter, ord } = req.query;

//     const pag = page !== undefined ? page : 1;
//     const lim = limit !== undefined ? limit : 10;
//     const query = metFilter !== undefined ? { [metFilter]: filter } : {};
//     const orQuery = ord !== undefined ? { price: ord } : {};

//     const prod = await productModel.paginate(query, {
//       limit: lim,
//       page: pag,
//       orQuery,
//     });

//     // console.log(prod);
//     // res.status(200).render
//     // (
//     //   "templates/products", {
//     //   products: prod,
//     //   js: "products.controllers.js",
//     //   // css: "productos.css",
//     // });
//   } catch (e) {
//     res.status(500).send("Error al consultar productos: ", e);
//   }
// };

/* 

Para agregar por POSTMAN el formato es  :
    {
    "title": "mate",
    "description": "la argentinidad al palo",
    "category":"infusion",
    "price": 0,
    "stock": 211110,
    "code":"Arge389Mate",
    "thumbnail":  []  
    }

*/
