import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "../slice/CartSlice";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function ProductCards(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(props.product.quantity);
  const user=useSelector(state=>state.user.user)
  // Function to add product to cart
  function AddToCart(product) {

    if(user)
    {
      product={...product,quantity:quantity}
    console.log( "add to cart",product)
    dispatch(addProduct(product));
    setQuantity(1);
    toast('Added');
    }
    else
    toast('PLEASE LOG IN');
    
  }

  // Function to remove product from cart
  function RemoveFromCart(product) {
    console.log(product);
    dispatch(removeProduct(product));
    setQuantity(1);
  }

  // Function to increment quantity
  function incrementQuantity() {
    setQuantity(quantity + 1);
    console.log( "add to cart",quantity)

  }

  // Function to decrement quantity
  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  }

  return (
    <div className="relative flex border border-blue-200 bg-slate-200 rounded-md flex-col items-center m-4 p-2 w-64 h-96 shadow-md overflow-hidden">
      <div className="w-full h-[60%] object-cover overflow-hidden ">
        <img
          src={props.image}
          alt={props.text}
          className=" w-full h-full object-cover"
        />
      </div>
      <div className="text text-center overflow-hidden font-medium mt-2">
        <div className=" font-bold text-lg">{props.text}</div>
        <div>PRICE = {props.price}</div>
        <div className="text-sm text-opacity-35">
          {props.body !== "" && props.body}
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-4">
        <div className="flex justify-between items-center bg-red-600 h-8 w-24 rounded-md text-sm text-white">
          <button
            className="w-6 h-6 bg-red-700 rounded-md text-white"
            onClick={decrementQuantity}
          >
            -
          </button>
          <span className="mx-2">{quantity}</span>
          <button
            className="w-6 h-6 bg-red-700 rounded-md text-white"
            onClick={incrementQuantity}
          >
            +
          </button>
        </div>
        <button
          className="bg-red-600 h-8 w-24 rounded-md text-sm text-white"
          onClick={() => AddToCart(props.product)}
        >
          <IconButton color="white" aria-label="add to shopping cart">
  <AddShoppingCartIcon />
</IconButton>
        </button>
      </div>
    </div>
  );
}

export default ProductCards;