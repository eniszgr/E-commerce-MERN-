import { configureStore } from '@reduxjs/toolkit'
import productSlice from './productSlice'
import generalSlice from './generalSlice'

export const store = configureStore({
    reducer: {
        product: productSlice,       //calling the productSlice as product
        general: generalSlice,   //calling the generalSlice as general
    }
})