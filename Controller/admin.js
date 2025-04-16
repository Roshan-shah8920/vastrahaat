import { Admin } from "../Model/Admin.js";

export const createOrder = async (req, res) => {
  const { userId, products, totalPrice } = req.body;

  try {
    const order = new Admin({
      userId,
      products,
      totalPrice
    });

    await order.save();

    res.json({ message: 'Order saved successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error saving order', error: error.message });
  }
};


export const getAllOrders = async (req, res) => {
    try {
      const orders = await Admin.find()
        .populate("userId", "name email") // User ki info
        .populate("products.productId", "title price"); // Product ki info
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
  };