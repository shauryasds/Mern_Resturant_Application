
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, removeProduct, loadCartFromServer, setInitialState } from '../slice/CartSlice';
import apiUrl from '../backendUrl';

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);
  console.log(products,'product')
  const total = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.user); // get the user's ID from the UserSlice
  async function setInitialCart(){
    try {
       const response = await fetch(apiUrl.getcart.url, {
         method: apiUrl.getcart.method,
         body: JSON.stringify({userId:user._id}),
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
       });
       if (response.ok) {
        const cartItems=await response.json();
        console.log(cartItems,'cart')
        dispatch(setInitialState({cartItems}))
        } else {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
     } catch (error) {
       console.error(error);
     }
    } 
    useEffect(() => {
      setInitialCart();
    }, [user]);
  function RemoveFromCart(product) {
    dispatch(removeProduct(product));
  }
  async function Checkout(uid,pid,quantity,totalprice){
    try {
       const response = await fetch(apiUrl.addorder.url, {
         method: apiUrl.addorder.method,
         body: JSON.stringify({uid,pid,quantity,totalprice}),
         headers: {
           'Content-Type': 'application/json',
         },
         credentials: 'include',
       });
       if (response.ok) {
        const orderItems=await response.json();
        console.log(orderItems,'orderItems')
        } else {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
     } catch (error) {
       console.error(error);
     }
    } 
    async function handleCheckout(){
      // uid,pid,quantity,totalprice
      try {
        const response = await fetch(apiUrl.payment.url, {
          method: apiUrl.payment.method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ products: products }),
        });
      
        const session = await response.json();
        console.log(session, 'session');
      
        if (session && session.url) {
          window.location.href = session.url;
        } else {
          console.error('Session URL is not available');
        }
        products.forEach((product) => {
              Checkout(user._id, product._id, product.quantity, total);
            });
       
        
      } catch (error) {
        console.error(error, 'error');
        // Handle any errors that occur during the payment process
      }
        
    }
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <div className="text-lg font-bold">Total: ${total}</div>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Subtotal</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id}>
              <td className="px-4 py-2"><img src={product.imageUrl} alt={product.name} className='w-20 h-20'/></td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">${(product.quantity )* (product.price)}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => RemoveFromCart(product)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <button onClick={handleCheckout} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;