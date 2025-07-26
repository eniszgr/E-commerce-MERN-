import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],           // products array
    product: {},           // single product object
    loading: false,         // loading state    
    error: null             // error state  
}

export const getProducts = createAsyncThunk(
  'products',
  async (params = {}) => {
    // rating parametresi yoksa 0 gönder
    const rating = params.rating !== undefined ? params.rating : 0;
    let link = `http://localhost:4000/products?keyword=${params.keyword}&rating[gte]=${rating}`;
    const response = await fetch(link);
    const data = await response.json();
    return data;
  }
)
export const getProductDetails = createAsyncThunk(                                //thunk is a async functions controller
    'product',                                                             //thunk name, prefix for the action
    async (id)=>{
        const response = await fetch(`http://localhost:4000/products/${id}`)      //fetching the data 
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
            state.products = action.payload                                 // payload is the data returned from the async function
        })
        builder.addCase(getProductDetails.pending, (state,action) => {            // pending means the request is in progress
            state.loading = true
        })
        builder.addCase(getProductDetails.fulfilled, (state,action) => {          // fulfilled means the request is completed successfully
            state.loading = false,
            state.product = action.payload                                 // payload is the data returned from the async function
        })
    }
})

export const {} = productSlice.actions
export default productSlice.reducer