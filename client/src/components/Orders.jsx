import React, { useState, useEffect } from 'react';
import apiUrl from '../backendUrl';
import { useSelector } from 'react-redux';

function Orders() {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]); // Initialize as an array

  async function fetchOrders() {
    try {
      const response = await fetch(apiUrl.getorder.url, {
        method: apiUrl.getorder.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id }),
      });
      const data = await response.json();
      console.log(data, 'orderdata');
      setOrders(data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Display error to the user
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [user]);

  return (
    <div className="container mt-4 border shadow-2xl mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <table className="w-full mb-4 table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Order Date</th>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Total Price</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
              <td className="px-4 py-2">{order.productId.name}</td>
              <td className="px-4 py-2">{order.quantity}</td>
              <td className="px-4 py-2">${order.totalPrice}</td>
              <td className="px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;