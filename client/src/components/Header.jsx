import React, { useEffect, useState, useCallback } from "react";
import logo from "../images/logo.PNG";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiUrl from '../backendUrl/index';
import { setUser } from "../slice/UserSlice";
import { removeUser } from "../slice/UserSlice";
import { loadCartFromServer } from "../slice/CartSlice";
import { toast } from "react-toastify";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Header() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const products = useSelector((state) => state.cart.products);
  console.log('loginStatus',loginStatus)
  const user = useSelector((state) => state.user.user);
  console.log('user heder ',user)
  async function handleLogout(e) {
    try {
      const LogoutRes = await fetch(apiUrl.logout.url, {
        method: apiUrl.logout.method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await LogoutRes.json();
      console.log(data)
      if (data.success) {
        toast.success('LOGGED OUT')
        dispatch(removeUser()); 
        navigate('/');
      } else {
        toast.success(data.message)

        console.log(data.message);
      }
    } catch (error) {
      toast(error)
      console.error('Error:', error);
    }
  }
  async function Fetchuser(){
    try {
      const response = await fetch(apiUrl.isLoggedIn.url, {
        method: apiUrl.isLoggedIn.method,
        credentials: "include",
      });
      
      const data = await response.json();
      console.log(data)
      dispatch(setUser(data))
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null; // or some default value
    }
    
  }
 
  useEffect(()=>{
    Fetchuser()
  },[])
  return (
    <header className="bg-zinc-950 z-50 shadow-lg  w-full text-yellow-100 text-3xl py-4  ">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex-shrink-0 shadow-md">
        <Link
              to="/"
              >
          <img src={logo} className="h-12" alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          {!loginStatus ? (
            <Link
              to="/Login"
              className="text-gray-300 hover:text-white focus:ring ring-white p-2 rounded-full focus:bg-gray-700 hover:text-white"
            >
              Login
            </Link>
          ) : (
            <Link
              to="/user"
              className="text-gray-300 hover:text-white focus:ring ring-white p-2 rounded-full focus:bg-gray-700 hover:text-white"
            >
              {user.name || "USER_GUEST"}
            </Link>
          )}
          {loginStatus && (
            <Link
              to="/"
              className="text-gray-300 hover:text-white focus:ring ring-white p-2 rounded-full focus:bg-gray-700 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
          <Link
            to="/Cart"
            className="text-gray-300 hover:text-white focus:ring ring-white p-2 rounded-full focus:bg-gray-700 hover:text-white"
          >
           <ShoppingCartIcon/>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;