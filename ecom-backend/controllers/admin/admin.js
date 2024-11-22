import mongoose from "mongoose";
import { HTTP_CODES, MESSAGES } from "../../config/constants";
import Product from "../../models/products";
import Order from "../../models/order";
const { ObjectId } = mongoose.Types;

export const addProduct = async (req, res) => {
    console.log("Calling post product API");
    console.log(req.body);

    try {
        const { name, price, description } = req.body;
        const { userId } = req.params;

        const image = req.file?.filename;

        if (!name || !price || !description || !image) {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ message: MESSAGES.ALL_FILEDS_REQURED });
        }

        const product = new Product({
            name: name,
            price: price,
            description: description,
            image: image,
            addedBy: userId
        });

        const addedProduct = await product.save();
        let pData = {
            name: addedProduct.name,
            price: addedProduct.price,
            description: addedProduct.description,
            image: addedProduct.image
        }
        res.status(HTTP_CODES.SUCCESS).json({ product: pData });

    } catch (error) {
        console.error("Error while adding product:", error.message);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}


export const getProductsByAdmin = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {

        const p = await Product.find({}).limit(4)
        console.log(p)

        let pipeline = [
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: parseInt(limit),
            },
            {
                $project: {
                    name: 1,
                    price: 1,
                    description: 1,
                    image: 1,
                    addedBy: 1,
                    createdAt:1,
                    updatedAt:1
                },
            },
        ]

        const products = await Product.aggregate(pipeline);

        const totalCount = await Product.countDocuments();
        console.log(totalCount, "totalcount")

        res.status(HTTP_CODES.SUCCESS).json({
            products,
            totalCount,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalCount / limit),
        });
    } catch (error) {
        console.error("Error while fetching products:", error.message);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    console.log("Fetching product by ID...");

    const { productId } = req.params;

    try {
        const product = await Product.findById(productId).select('name price description image');

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Error fetching product" });
    }
};


export const updateProduct = async (req, res) => {
    console.log("Calling update product API");
    console.log(req.body);

    try {
        const { productId } = req.params;
        const { name, price, description } = req.body;
        const image = req.file?.filename;

        if (!name || !price || !description) {
            return res.status(HTTP_CODES.BAD_REQUEST).json({ message: MESSAGES.ALL_FILEDS_REQURED });
        }

        const updateData = {
            name,
            price,
            description,
        };

        if (image) {
            updateData.image = image;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(HTTP_CODES.NOT_FOUND).json({ message: MESSAGES.PRODUCT_NOT_FOUND });
        }

        const updatedData = {
            name: updatedProduct.name,
            price: updatedProduct.price,
            description: updatedProduct.description,
            image: updatedProduct.image
        };

        res.status(HTTP_CODES.SUCCESS).json({ product: updatedData });
    } catch (error) {
        console.error("Error while updating product:", error.message);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await Product.findByIdAndDelete(productId)

        if (!product) {
            return res.status(HTTP_CODES.NOT_FOUND).json({ message: MESSAGES.NOT_FOUND })
        }

        res.status(HTTP_CODES.SUCCESS).json({ message: MESSAGES.PRODUCT.DELETE_SUCCESS, productId: product._id })

    } catch (error) {
        console.error("Error while deleting product:", error.message);
        res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json({ message: error.message });

    }

}

export const Orders = async (req, res) => {
    try {
        const orders = await Order.find()
        console.log(orders)
        if (!orders) {
            return res.status(404).json({ message: "No orders till now" });
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.log(error)
    }
}