import { createSlice } from '@reduxjs/toolkit';
import apiUrl from '../backendUrl';

const initialState = {
  products: [],
  total: 0,
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      const products = action.payload?.cartItems?.items?.map((item) => ({ ...item.productId, quantity: item.quantity }));
      
      state.products = products || []; // Add null check
      let total = 0;
      state.products?.map((product) => {
        if (product && product.price) { // Add null check
          total += product.price * product.quantity;
        }
      });
      state.total = total;
      console.log(action.payload.cartItems, 'state');
    },
    addProduct: (state, action) => {
      const newProduct = action.payload;
      if (!state.products) { // Add null check
        state.products = [];
      }
      const existingProduct = state.products.find((product) => product._id === newProduct._id);
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        if (existingProduct.price) { // Add null check
          state.total += existingProduct.price;
        }
        UpdateCart(existingProduct._id, existingProduct.quantity);
      } else {
        state.products.push({ ...newProduct, quantity: newProduct.quantity });
        if (newProduct.price) { // Add null check
          state.total += newProduct.price * newProduct.quantity;
        }
        UpdateCart(newProduct._id, newProduct.quantity);
      }
    },
    removeProduct: (state, action) => {
      const newProduct = action.payload;
      if (!state.products) { // Add null check
        state.products = [];
      }
      const existingProductIndex = state.products.findIndex((product) => product._id === newProduct._id);
      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];
        if (existingProduct.quantity !== 1) {
          existingProduct.quantity -= 1;
          if (existingProduct.price) { // Add null check
            state.total -= existingProduct.price;
          }
          RemoveCart(existingProduct._id, existingProduct.quantity);
        } else {
          if (existingProduct.price) { // Add null check
            state.total -= existingProduct.price;
          }
          state.products.splice(existingProductIndex, 1);
          console.log('reached remocve')
          RemoveCart(existingProduct._id, 0);
        }
      }
    },
  },
});

export const { addProduct, removeProduct, setInitialState } = CartSlice.actions;
export default CartSlice.reducer;

async function UpdateCart(productId, quantity) {
  try {
    if (productId && quantity) { // Add null check
      const response = await fetch(apiUrl.updatecart.url, {
        method: apiUrl.updatecart.method,
        body: JSON.stringify({ productId, quantity }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (response.ok) {
        const cartItems = await response.json();
        console.log(cartItems, 'added to server');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function RemoveCart(productId, quantity) {
 
  try {
    if (productId ) { // Add null check
      console.log("remove cart")
      const response = await fetch(apiUrl.deletecart.url, {
        method: apiUrl.deletecart.method,
        body: JSON.stringify({ productId, quantity }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      console.log(response.ok)
      if (response.ok) {
        const cartItems = await response.json();
        console.log(cartItems, 'removed to server');
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  } catch (error) {
    console.error(error);
  }
}