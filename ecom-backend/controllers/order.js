import { HTTP_CODES, MESSAGES } from "../config/constants.js";
import { sendMailToUser } from "../helpers/nodeMailer";
import Order from "../models/order";
import mongoose from "mongoose";



export const createOrder = async (req, res) => {
    const { userId, items, totalAmount } = req.body;

    try {

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid userId format' });
        }
        const order = new Order({
            userId: new mongoose.Types.ObjectId(userId),
            items,
            totalAmount,
        });

        const newOrder = await order.save();

        const populatedOrder = await Order.findById(newOrder._id)
            .populate("userId", "firstName email")
            .populate("items.productId", "name price description image");

        const products = populatedOrder.items.map(item => {
            const { quantity, price } = item;
            const { name, description } = item.productId;
            return {
                name,
                description,
                quantity,
                price
            };
        });

        const totalPrice = newOrder.totalAmount;
        const orderId = newOrder._id;
        const userData = populatedOrder.userId;
        const email = userData.email;
        const firstName = userData.firstName;

        console.log(email, firstName, orderId, products, totalPrice, "total details");

        const data = await sendMailToUser(email, firstName, orderId, products, totalPrice);
        console.log(data);

        res.status(HTTP_CODES.CREATED).json({
            message: MESSAGES.ORDER.SUCCESS,
            orderId,
            products,
            userData,
            totalPrice
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Failed to create order", error });
    }

};



export const getOrderData = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);
        console.log(userId)

        const orders = await Order.find({ userId: userId }).populate('items.productId');

        const formattedOrders = orders.map(order => ({
            orderId: order._id,
            totalAmount: order.totalAmount,
            createdAt: order.createdAt,
            items: order.items.map(item => ({
              id: item.productId._id,
              name: item.productId.name,
              price: item.productId.price,
              image: item.productId.image,
              quantity: item.quantity
            }))
          }));


        if (!orders || orders.length === 0) {
            return res.status(HTTP_CODES.NOT_FOUND).json({ message: MESSAGES.ORDER.NOT_FOUND });
        }

        res.status(HTTP_CODES.SUCCESS).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
