import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HTTP_CODES, MESSAGES } from "../config/constants.js";
import Products from "../models/products.js";
import User from "../models/users.js";

export const createUser = async (req, res) => {
  console.log("adding user");
  console.log(req.body);
  try {
    const { firstName, lastName, email, password, mobileNumber, role } =
      req.body;
    console.log(typeof mobileNumber);

    // Check for missing fields
    if (!firstName || !lastName || !email || !password || !mobileNumber) {
      return res
        .status(HTTP_CODES.FORBIDDEN)
        .json({ message: MESSAGES.ALL_FILEDS_REQURED});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobileNumber,
      role,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res
      .status(HTTP_CODES.CREATED)
      .json({ message: MESSAGES.REGISTER.SUCCESS, user: savedUser });
  } catch (error) {
    console.log(error.message);
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res
        .json(HTTP_CODES.FORBIDDEN)
        .json({ message: MESSAGES.ALL_FILEDS_REQURED });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .json(HTTP_CODES.NOT_FOUND)
        .json({ message: MESSAGES.LOGIN.NOT_FOUND });
    }
    let UserRole = user?.role;

    if (UserRole != role) {
      return res
        .status(HTTP_CODES.FORBIDDEN)
        .json({ message: MESSAGES.LOGIN.UNAUTHORIZED });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (isMatch) {
      const token = jwt.sign({ email, UserRole }, "KEY", { expiresIn: "10hr" });
      return res.status(HTTP_CODES.SUCCESS).json({
        message: MESSAGES.LOGIN.SUCCESS,
        role: user.role,
        userId: user._id,
        token: token,
      });
    }
    res.status(HTTP_CODES.FORBIDDEN).json({ message: MESSAGES.LOGIN.FAILURE });
  } catch (error) {
    console.log(error.message);
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let pipeline = [
      {
        $match: {
          role: "user",
        },
      },
      {
        $skip: (Number(page) - 1) * Number(limit),
      },
      {
        $limit: Number(limit),
      },
      {
        $project: {
          password: 0,
          role: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ];

    const users = await User.aggregate(pipeline);
    res.status(HTTP_CODES.SUCCESS).json({ users: users });
  } catch (error) {
    console.log(error.message);
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.params;

    let pipeline = [
      {
        $skip: ((page) - 1) * (limit),
      },
      {
        $limit: (limit),
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          addedBy: 0,
        },
      },
    ];

    const products = await Products.aggregate(pipeline);
    res.status(HTTP_CODES.SUCCESS).json({ products: products });
  } catch (error) {
    console.log(error.message);
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
