import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../apiClient";
const imageUrl = import.meta.env.VITE_IMAGE_URL;

const MyOrder = () => {
  const { userId, token } = useSelector((state) => state.loggedInData);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/orders/${userId}`, {
          headers: { Authorization: token },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, [userId, token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-12">
        My Orders
      </h1>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order.createdAt}
            className="bg-white shadow-lg rounded-xl border border-gray-200 mb-10"
          >
            <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl">
              <div className="flex justify-between items-center text-white">
                <p className="text-lg font-medium">{`Order Date: ${new Date(
                  order.createdAt
                ).toLocaleDateString()}`}</p>
                <p className="text-lg font-semibold">{`Total: ₹${order.totalAmount.toFixed(
                  2
                )}`}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {order?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-lg border border-gray-300 shadow-md hover:shadow-xl transition-all"
                  >
                    <img
                      src={`${imageUrl}/${item.image}`}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <div className="text-center">
                      <p className="text-xl font-semibold text-gray-800 mb-2">
                        {item.name}
                      </p>
                      <p className="text-gray-600 mb-2">Price: ₹{item.price}</p>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          You have no orders yet.
        </p>
      )}
    </div>
  );
};

export default MyOrder;
