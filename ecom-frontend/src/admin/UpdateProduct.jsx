import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import useForm from "../customeHooks/useForm";
import toast, { Toaster } from "react-hot-toast";
const imageUrl = import.meta.env.VITE_IMAGE_URL;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.loggedInData);
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const { formData, handleChange, setFormData } = useForm(product);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await apiClient.get(`/product/${productId}`, {
          headers: {
            Authorization: token,
          },
        });
        const productData = response.data;
        setProduct({
          name: productData.name,
          price: productData.price,
          description: productData.description,
          image: productData.image,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product, setFormData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.put(
        `/update-product/${productId}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product updated");
      setTimeout(() => {
        navigate("/dashboard/products");
      }, 2000);
    } catch (error) {
      toast.error("Cannot update product");
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 rounded-xl shadow-lg mt-20">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
        Update Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-6 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-6 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-6 py-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        {/* Current Image */}
        {product.image && (
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Current Product Image
            </label>
            <img
              src={`${imageUrl}/${product.image}`}
              alt="Current Product"
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
          </div>
        )}

        {/* Upload New Image */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Upload New Product Image (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
            />
            <div className="w-full px-6 py-3 bg-indigo-50 border border-indigo-300 rounded-lg text-indigo-700 flex items-center justify-center cursor-pointer hover:bg-indigo-100 transition duration-200">
              Choose File
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
        >
          Update Product
        </button>
      </form>

      {/* Link back to Product List */}
      <Link
        to="/dashboard/products"
        className="block mt-6 text-center text-indigo-600 hover:text-indigo-700 text-lg"
      >
        Back to Product List
      </Link>

      <Toaster />
    </div>
  );
};

export default UpdateProduct;
