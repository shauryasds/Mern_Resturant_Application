import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/UserSlice";
import 'react-toastify/dist/ReactToastify.css';
  
import { ToastContainer, toast } from 'react-toastify';
function Layout() {
  
  return (
    <>
     <ToastContainer />
     <Header />
  <Outlet />  
      <Footer />
    </>
  );
}

export default Layout;
