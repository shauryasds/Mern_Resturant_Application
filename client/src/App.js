import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";
import CategoryProduct from "./pages/CategoryProduct";
import AdminPanel from "./pages/AdminPanel";
import User from "./pages/User";
import { useDispatch, useSelector } from "react-redux";
import apiUrl from './backendUrl/index'
import { setUser } from "./slice/UserSlice";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(true);

  async function Fetchuser() {
    try {
      const response = await fetch(apiUrl.isLoggedIn.url, {
        method: apiUrl.isLoggedIn.method,
        credentials: "include",
        headers: {
          'x-token': localStorage.getItem('token')
        }
      });
      
      const data = await response.json();
      dispatch(setUser(data));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    Fetchuser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="categoryproduct/:category" element={<CategoryProduct />} />
          <Route path="cart" element={
            user ? (
              <Cart />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="checkout" element={
            user ? (
              <CheckOut />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="adminpanel" element={
            user && user.role === 'admin' ? (
              <AdminPanel />
            ) : (
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            )
          } />
          <Route path="user" element={
            user ? (
              <User />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
