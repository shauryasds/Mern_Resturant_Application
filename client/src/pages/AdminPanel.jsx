import React, { useState } from 'react';
import AdminProduct from './AdminProduct'
import AdminUser from './AdminUser';
import AdminCategory from './AdminCategory'
import Adminorder from './AdminOrders';

function AdminPanel() {
  const [currActive, setCurrActive] = useState({
    productActive: false,
    usersActive: false,
    categoryActive: false,
    OrderActive:true
  });

  return (
    <div className="min-h-screen flex flex-row">
      <div className="bg-gray-200 p-4 sticky top-0 h-screen">
        <div className="text-2xl font-bold text-black text-center">Admin Panel</div>
        <div className="flex flex-col mt-4 h-full">
          <div
            onClick={() => { setCurrActive({ OrderActive : true,productActive: false, usersActive: false }) }}
            className={`py-2 px-4 cursor-pointer shadow-md mt-8 ${currActive.OrderActive && 'bg-blue-500 text-white'}`}
          >
            Orders
          </div>
          <div
            onClick={() => { setCurrActive({ productActive: true, usersActive: false }) }}
            className={`py-2 px-4 cursor-pointer shadow-md mt-8 ${currActive.productActive && 'bg-blue-500 text-white'}`}
          >
            Products
          </div>
          <div
            onClick={() => { setCurrActive({ productActive: false, usersActive: true }) }}
            className={`py-2 px-4 cursor-pointer shadow-md mt-8 ${currActive.usersActive && 'bg-blue-500 text-white'}`}
          >
            Users
          </div>
          <div
            onClick={() => { setCurrActive({ productActive: false, categoryActive: true, usersActive: false }) }}
            className={`py-2 px-4 cursor-pointer shadow-md mt-8 ${currActive.categoryActive && 'bg-blue-500 text-white'}`}
          >
            Product Categories
          </div>
        </div>
      </div>
      <div className="w-full p-4 overflow-y-auto">
        {currActive.productActive && (
          <AdminProduct></AdminProduct>
        )}
        {currActive.usersActive && (
          <div>
            <AdminUser />
          </div>
        )}
        {currActive.OrderActive && (
          <div>
            <Adminorder/>
          </div>
        )}
        {currActive.categoryActive && (
          <div>
            <AdminCategory />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;