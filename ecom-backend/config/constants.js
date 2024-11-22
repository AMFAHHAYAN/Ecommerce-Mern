
export const MESSAGES = {
    LOGIN: {
        SUCCESS: "Login successful.",
        NOT_FOUND:"User not found",
        FAILURE: "Invalid username or password.",
        UNAUTHORIZED: "Please log in to access this resource.",
    },
    REGISTER: {
        SUCCESS: "Registration successful.",
        FAILURE: "Registration failed. Please try again.",
        EMAIL_EXISTS: "Email is already in use.",
    },
    CART: {
        ADD_SUCCESS: "Item added to cart successfully.",
        REMOVE_SUCCESS: "Item removed from cart successfully.",
        ITEM_EXISTS: "Item is already in the cart.",
        EMPTY: "Your cart is empty.",
    },
    PRODUCT: {
        ADD_SUCCESS: "Product added successfully.",
        UPDATE_SUCCESS: "Product updated successfully.",
        DELETE_SUCCESS: "Product deleted successfully.",
        NOT_FOUND: "Product not found.",
    },
    ORDER: {
        SUCCESS: "Order placed successfully.",
        FAILURE: "Order could not be placed.",
        NOT_FOUND: "Order not found.",
        CANCEL_SUCCESS: "Order cancelled successfully.",
    },
    PAYMENT: {
        SUCCESS: "Payment successful.",
        FAILURE: "Payment failed.",
        PENDING: "Payment is pending.",
    },
    CHECKOUT: {
        SUCCESS: "Checkout completed successfully.",
        FAILURE: "Checkout failed. Please try again.",
    },
    TOKEN: {
        VERIFICATION_SUCCESS: "Token verified successfully.",
        TOKEN_NOT_PROVIDED : "Token not provided",
        VERIFICATION_FAILED: "Token verification failed.",
        ADMIN_REQUIRED: "Admin access required.",
        USER_REQUIRED: "User access required.",
        INVALID: "Invalid token provided.",
        EXPIRED: "Token has expired. Please log in again.",
    },
    INTERNAL_SERVER_ERROR:"Internal server error",
    ALL_FILEDS_REQURED :"All fields are required "
};

export const HTTP_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};