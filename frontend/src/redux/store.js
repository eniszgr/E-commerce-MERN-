import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import generalSlice from './generalSlice'
import userSlice from './userSlice'
import cartSlice from './cartSlice'

export const store = configureStore({
    reducer: {
        product: productSlice,       //calling the productSlice as product
        general: generalSlice,   //calling the generalSlice as general
        user: userSlice,
        cart: cartSlice,
    }
})