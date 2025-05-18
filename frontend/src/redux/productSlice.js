import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],           // products array
    loading: false,         // loading state    
    error: null             // error state  
}

export const getProducts = createAsyncThunk(                                //thunk is a async functions controller
    'products',                                                             //thunk name, prefix for the action
    async ()=>{
        const response = await fetch('http://localhost:4000/products')      //fetching the data 
        return (await response.json());                                     //converting the response to json
    }
)

const productSlice = createSlice({
    name: 'product',                                                        //slice is stored in the redux store as product
    initialState,                                                           //initial state
    reducers: {
       
    },
    extraReducers:(builder) => {                                            //using extra reducers to handle async actions
        builder.addCase(getProducts.pending, (state,action) => {            // pending means the request is in progress
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state,action) => {          // fulfilled means the request is completed successfully
            state.loading = false,
            state.products = action.payload
        })
    }
})

export const {} = productSlice.actions
export default productSlice.reducer  