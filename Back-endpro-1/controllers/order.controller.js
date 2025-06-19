import User from "../Models/User.model.js";
import Product from "../Models/Product.model.js";
import Order from "../Models/Order.model.js";
import { emailOptions } from "../Middlewares/orderemail.js";

// ✅ Create Order (Multiple Products)
export const createOrder = async (req, res, next) => {
  const { products } = req.body;

  try {
    const user = await User.findById(req.session._id);
    if (!user) return res.status(404).json({ status: "fail", message: "User not found" });

    const orderItems = [];
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({
          status: "fail",
          message: `Product not found with ID: ${item.productId}`,
        });
      }

      const itemTotal = product.price * item.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        productId: product._id,
        categoryId: product.categoryId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    const orderData = {
      userId: req.session._id,
      email: user.email,
      items: orderItems,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    await emailOptions(user.email, newOrder.status, newOrder.totalPrice);

    return res.status(201).json({ status: "success", data: newOrder });
  } catch (error) {
    console.error(error);

  }
};

// ✅ Get All Orders
export const getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await Order.find().populate("userId").populate("items.productId");

    if (!allOrders || allOrders.length === 0) {
      return res.status(404).json({ status: "fail", data: "No Orders Added Yet" });
    }

    return res.status(200).json({ status: "success", data: allOrders });
  } catch (error) {
    console.error(error);
   
  }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("userId").populate("items.productId");

    if (!order) {
      return res.status(404).json({ status: "fail", data: `No Order With This ID: ${orderId}` });
    }

    return res.status(200).json({ status: "success", data: order });
  } catch (error) {
    console.error(error);
  
  }
};

// ✅ Delete Order by ID
export const deleteOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ status: "fail", data: `No Order With This ID: ${orderId}` });
    }

    return res.status(200).json({ status: "success", deletedOrder: order });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// ✅ Update Order (Status or Full Update)
export const updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const newOrderData = req.body;

  try {
    const oldOrder = await Order.findById(orderId);
    if (!oldOrder) {
      return res.status(400).json({ status: "fail", data: `No Order With This ID: ${orderId}` });
    }

    let newTotal = oldOrder.totalPrice;

    if (newOrderData.items) {
      let updatedItems = [];
      newTotal = 0;

      for (const item of newOrderData.items) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(400).json({
            status: "fail",
            message: `Product not found with ID: ${item.productId}`,
          });
        }

        const itemTotal = product.price * item.quantity;
        newTotal += itemTotal;

        updatedItems.push({
          productId: product._id,
          categoryId: product.categoryId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      newOrderData.items = updatedItems;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { ...newOrderData, totalPrice: newTotal },
      { new: true }
    );

    await emailOptions(updatedOrder.email, updatedOrder.status, updatedOrder.totalPrice);

    return res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    console.error(error);
  
  }
};
