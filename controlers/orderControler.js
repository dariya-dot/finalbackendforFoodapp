const Order = require("../models/Order");

const User = require("../models/User");



const placeOrder = async (req, res) => {
  try {
    const { orderData, orderId, userId } = req.body;
    if (!orderData || !orderData.Address || !orderData.order || !orderData.totalAmount) {
      return res.status(400).json({ success: false, message: "Invalid order data" });
    }
    console.log(userId)
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ success: false, message: "user not saved" });
    } else {
      const newOrder = new Order({
        userId: userId,
        orderId: orderId,
        Address: orderData.Address,
        items: orderData.order,
        totalAmount: orderData.totalAmount,
        payment: "Paid",
        status: "order Placed",
      });
      await newOrder.save();
      user.orders.push(newOrder._id);
      await user.save();

      console.log(newOrder);
      res.json({
        success: true,
        order: newOrder,
        message: "Order placed successfully!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("orders");
    if (user) {
      res.json({ success: true, orders: user.orders });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { placeOrder, getOrderDetails };
