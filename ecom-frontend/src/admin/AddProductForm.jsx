import React, { useState } from "react";
import useForm from "../customeHooks/useForm";
import apiClient from "../apiClient";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";


const AddProductForm = () => {
  const { token, userId } = useSelector((state) => state.loggedInData);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const { formData, handleChange } = useForm(product);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post(`/add-product/${userId}`, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data, "Product added");
      toast.success('Product added Succesfully!!')
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error('Error Adding Profuct XXX')
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 rounded-xl shadow-lg mt-20">
      <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
        Add New Product
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

        {/* File Upload */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Product Image
          </label>
          <div className="flex items-center space-x-4">
            <label className="custom-file-upload cursor-pointer text-white bg-indigo-500 py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                required
              />
              Choose File
            </label>
            <span className="text-gray-500">
              {formData.image ? formData.image.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
      <Toaster />

    </div>
  );
};

export default AddProductForm;
