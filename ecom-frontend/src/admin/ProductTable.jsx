import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import apiClient from "../apiClient";
import {
  deleteProduct,
  handlePagination,
  storeProductData,
} from "../app/reducers/AdminSlice";
import Icons from "../assets/Icons";
import PaginationComponent from "../components/PaginationComponent";
import ProductDetails from "./ProductDetails";
const imageUrl = import.meta.env.VITE_IMAGE_URL;

const ProductTable = () => {
  const dispatch = useDispatch();

  const { token, userId } = useSelector((state) => state.loggedInData);
  const { products } = useSelector((state) => state.AdminSlice);
  const { currentPage, totalPage, productsPerPage } = useSelector(
    (state) => state.AdminSlice.pagination
  );

  const [product, setProduct] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  console.log(totalPage, currentPage, products);

  const fetchProducts = async (page) => {
    try {
      const response = await apiClient.get(
        `/all-products/?page=${page}&limit=${productsPerPage}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(storeProductData(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, userId]);

  const handleChangePage = (event, newPage) => {
    dispatch(handlePagination(newPage));
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await apiClient.delete(`/delete-product/${productId}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteProduct(res.data));
      console.log(res.data, "delete product");
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 rounded-lg shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Product List
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-indigo-300 rounded-lg shadow-md">
          <thead className="bg-indigo-500 text-white sticky top-0">
            <tr>
              <th className="py-4 px-6 border-b font-semibold">SR No</th>
              <th className="py-4 px-6 border-b font-semibold">Image</th>
              <th className="py-4 px-6 border-b font-semibold">Product Name</th>
              <th className="py-4 px-6 border-b font-semibold">Price</th>
              <th className="py-4 px-6 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className="text-center hover:bg-indigo-50 transition-all duration-200"
              >
                <td className="py-4 px-6 border-b text-gray-600">
                  {(currentPage - 1) * productsPerPage + index + 1}
                </td>
                <td className="py-4 px-6 border-b">
                  <img
                    src={`${imageUrl}/${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-indigo-200"
                  />
                </td>
                <td className="py-4 px-6 border-b text-gray-700 font-medium">
                  {product.name}
                </td>
                <td className="py-4 px-6 border-b text-gray-700 font-semibold">
                  ₹{product.price}
                </td>
                <td className="py-4 px-6 border-b">
                  <div className="flex justify-center space-x-6">
                    {/* View Button */}
                    <button
                      className="text-indigo-500 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-all duration-150"
                      title="View"
                      onClick={() => {
                        setProduct(product);
                        setShowDetails(!showDetails);
                      }}
                    >
                      View
                    </button>

                    {/* Edit Button */}
                    <Link to={`/update-product/${product._id}`}>
                      <button
                        className="text-green-500 font-semibold py-2 px-4 rounded-lg hover:bg-green-200 transition-all duration-150"
                        title="Edit"
                      >
                        Edit
                      </button>
                    </Link>

                    {/* Delete Button */}
                    <button
                      className="text-red-500 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition-all duration-150"
                      title="Delete"
                      onClick={() => {
                        handleDeleteProduct(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetails && (
        <div className="mt-6">
          <ProductDetails
            product={product}
            setProduct={setProduct}
            showDetails={showDetails}
            setShowDetails={setShowDetails}
          />
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPage={totalPage}
          handleChangePage={handleChangePage}
        />
      </div>
    </div>
  );
};

export default ProductTable;
