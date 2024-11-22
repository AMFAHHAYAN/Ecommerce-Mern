import jwt from "jsonwebtoken";
import { MESSAGES, HTTP_CODES } from "../config/constants";

export const VerifyUserAndRole = (requiredRole = "user") => {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(HTTP_CODES.FORBIDDEN)
        .json({ message: MESSAGES.TOKEN.TOKEN_NOT_PROVIDED });
    }

    try {
      const verifiedToken = jwt.verify(token, "KEY");

      if (!verifiedToken) {
        return res
          .status(HTTP_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.TOKEN.VERIFICATION_FAILED });
      }

      req.user = verifiedToken;

      if (requiredRole === "admin" && req.user.UserRole !== "admin") {
        return res
          .status(HTTP_CODES.FORBIDDEN)
          .json({ message: MESSAGES.TOKEN.ADMIN_REQUIRED });
      }

      next();
    } catch (error) {
      console.log(error.message);
      return res
        .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };
};
