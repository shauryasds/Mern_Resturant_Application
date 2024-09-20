import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CheckOut() {
  const total = useSelector((state) => state.cart.total);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-lg">Total Amount:</span>
            <span className="text-lg font-bold">{total}</span>
          </div>
          <input
            type="text"
            placeholder="Enter Delivery Address"
            className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Delivery Address"
            className="w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to="/" className="text-blue-500 hover:text-blue-600">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;