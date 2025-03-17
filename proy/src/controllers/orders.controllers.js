import orderModel from "../models/order.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $match: { size: "small" },
      },
      {
        $group: { _id: "$name", totalVentas: { $sum: "$price" } },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $group: { _id: 1, orders: { $push: "$$ROOT" } },
      },
      {
        $project: {
          _id: 0,
          orders: "$orders",
        },
      },
      {
        $merge: {
          into: "reports",
        },
      },
    ]);
    console.log(orders);
    return res.status(200).json(orders);
  } catch (e) {
    res.status(500).json({error:"Error al consultar ordenes:", e});
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const respuesta = await orderModel.create(order);
    console.log(respuesta);
    res.status(201).send(respuesta);
  } catch (e) {
    res.status(500).send({error:"Error al crear Orden: ", e});
  }
};
