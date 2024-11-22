import Cart from "../models/cart";
import mongoose from "mongoose";
import { HTTP_CODES, MESSAGES } from "../config/constants.js";

export const addToCart = async (req, res) => {
    console.log(req.body, "body");
    try {
        const { id, productId, quantity, price } = req.body;

        const item = {
            productId,
            quantity,
            price
        };

        let cart = await Cart.findOne({ userId: id });
        console.log(cart, "existing cart");

        if (cart) {
            const existItem = cart.items.find(
                (item) => item.productId.equals(productId)
            );
            console.log(existItem, "existing item");

            if (existItem) {
                existItem.quantity += quantity;
            } else {
                cart.items.push(item);
            }

            await cart.save();
        } else {
            cart = new Cart({
                userId: id,
                items: [item]
            });

            await cart.save();
        }

        res.status(200).json({ message: "Item added to cart", cart });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Server error while adding item to cart" });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const { id, productId } = req.body;
        const cart = await Cart.findOne({ userId: new mongoose.Types.ObjectId(id) });
        console.log(cart, "cart data");

        if (!cart) {
            return res.json({ msg: "no cart" });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.json({ msg: "no item" });
        }

        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        res.json({ cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ error: "Server error while removing item from cart" });
    }
};


export const removeAllQuantity = async (req, res) => {

    console.log(req.query, "data")
    try {
        const { id, productId } = req.query;

        const cart = await Cart.findOne({ userId: id });
        console.log(cart, "cart")
        if (!cart) {
            return res.json({ msg: "no cart" });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.json({ msg: "no item" });
        }

        cart.items.splice(itemIndex, 1);
        const data = await cart.save();

        res.json({ cart });
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        res.status(500).json({ error: "Server error while removing item from cart" });
    }
};



export const deleteCart = async (req, res) => {
    try {
        const { userId } = req.query;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.json({ msg: "no cart" });
        }

        cart.items = [];
        await cart.save();
        res.json({ msg: "ok" });
    } catch (error) {
        console.log(error.message);
    }
};




export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const cart = await Cart.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },

            { $unwind: "$items" },

            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            { $unwind: "$productDetails" },

            {
                $project: {
                    _id: 0,
                    productId: "$items.productId",
                    quantity: "$items.quantity",
                    price: "$items.price",
                    name: "$productDetails.name",
                    image: "$productDetails.image"
                }
            }
        ]);

        res.status(200).json(cart);

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

