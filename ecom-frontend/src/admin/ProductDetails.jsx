import React from "react";
import { FaTimes } from "react-icons/fa";
const imageUrl = import.meta.env.VITE_IMAGE_URL;

const ProductDetails = ({ product,setProduct, showDetails, setShowDetails }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <button
          onClick={() => {
            setShowDetails(!showDetails);
            setProduct({})
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 rounded-full bg-white shadow-md hover:bg-gray-200 transition-all duration-150"
          title="Close"
        >
          <FaTimes className="text-xl" />
        </button>

        <div className="p-6">
          <img
            src={
              `${imageUrl}/${product.image}`
            }
            alt="Product"
            className="w-full h-56 object-cover rounded-md mb-4"
          />

          <h2 className="text-2xl font-semibold text-gray-800">
            {product.name || "Demo Product"}
          </h2>
          <p className="text-gray-600 mt-2">
            <strong>Price:</strong> ₹{product.price || "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Description:</strong>{" "}
            {product.description || "No description available."}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Added By:</strong> {product.addedBy || "Unknown"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Created At:</strong> {product.createdAt || "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Updated At:</strong> {product.updatedAt || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
