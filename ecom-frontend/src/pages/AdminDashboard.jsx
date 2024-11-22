import React, { useState, useEffect } from "react"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/allorders', 
        {
          headers: { Authorization: token },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="admin-panel p-10 min-h-screen bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-200 flex flex-col items-center relative">
      {/* Panel Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-12 text-center text-indigo-700 tracking-wide">
        Orders Panel
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

      {/* <DataTable value={orders} tableStyle={{ minWidth: '60rem' }}>
        <Column field="userName" header="User Name" />
        <Column field="productName" header="Product Name" />
        <Column
          header="Image"
          body={(rowData) => <img src={rowData.productImage} alt={rowData.productName} style={{ width: '50px', height: '50px' }} />}
        />
        <Column field="price" header="Price" body={(rowData) => `$${rowData.price.toFixed(2)}`} />
        <Column field="status" header="Status" />
      </DataTable> */}
    </div>
  );
};

export default AdminPanel;
