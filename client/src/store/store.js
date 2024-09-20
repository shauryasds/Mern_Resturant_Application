import { configureStore } from '@reduxjs/toolkit'
import CartSlice from '../slice/CartSlice'
import UserSlice from '../slice/UserSlice'

export const store = configureStore({
  reducer: {
    cart:CartSlice,
    user:UserSlice
  },
})