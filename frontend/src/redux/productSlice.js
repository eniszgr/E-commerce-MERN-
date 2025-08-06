import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [], // products array
  adminProducts: [], // admin products array
  product: {}, // single product object
  loading: false, // loading state
  error: null, // error state
};

export const getProducts = createAsyncThunk("products", async (params = {}) => {
  // rating parametresi yoksa 0 gönder
  const rating = params.rating !== undefined ? params.rating : 0;

  const priceMin = params.price?.min ?? 0;
  const priceMax = params.price?.max ?? 3000;
  let link = `http://localhost:4000/products?keyword=${params.keyword}&rating[gte]=${rating}&price[gte]=${priceMin}&price[lte]=${priceMax}`;
  if (params.category) {
    link += `&category=${params.category}`;
  }
  const response = await fetch(link);
  const data = await response.json();
  return data;
});
export const addAdminProduct = createAsyncThunk("adminadd", async (data) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Cookie'lerin gönderilmesi için kritik!
      body: JSON.stringify(data),
    };
    const response = await fetch(`http://localhost:4000/product/new`, requestOptions);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to add product');
    }
    
    return result;
  } catch (error) {
    console.error("addAdminProduct error:", error);
    throw error;
  }
});

export const getAdminProducts = createAsyncThunk("admin", async () => {
  try {
    const response = await fetch(`http://localhost:4000/admin/products`, {
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch admin products");
    }

    return data;
  } catch (error) {
    console.error("getAdminProducts error:", error);
    throw error;
  }
});

export const getProductDetails = createAsyncThunk(
  //thunk is a async functions controller
  "product", //thunk name, prefix for the action
  async (id) => {
    const response = await fetch(`http://localhost:4000/products/${id}`); //fetching the data
    return await response.json(); //converting the response to json
  }
);

const productSlice = createSlice({
  name: "product", //slice is stored in the redux store as product
  initialState, //initial state
  reducers: {},
  extraReducers: (builder) => {
    //using extra reducers to handle async actions
    builder.addCase(getProducts.pending, (state, action) => {
      // pending means the request is in progress
      state.loading = true;
    });
         builder.addCase(getProducts.fulfilled, (state, action) => {
       // fulfilled means the request is completed successfully
       state.loading = false;
       state.products = action.payload; // payload is the data returned from the async function
     });
    builder.addCase(getProductDetails.pending, (state, action) => {
      // pending means the request is in progress
      state.loading = true;
    });
         builder.addCase(getProductDetails.fulfilled, (state, action) => {
       // fulfilled means the request is completed successfully
       state.loading = false;
       state.product = action.payload; // payload is the data returned from the async function
     });
    builder.addCase(getAdminProducts.pending, (state, action) => {
      // pending means the request is in progress
      state.loading = true;
    });
         builder.addCase(getAdminProducts.fulfilled, (state, action) => {
       // fulfilled means the request is completed successfully
       state.loading = false;
       state.adminProducts = action.payload.products; // düzeltildi
       state.error = null;
     });
         builder.addCase(getAdminProducts.rejected, (state, action) => {
       // rejected means the request failed
       state.loading = false;
       state.error = action.error.message;
     });
     builder.addCase(addAdminProduct.pending, (state, action) => {
       state.loading = true;
     });
     builder.addCase(addAdminProduct.fulfilled, (state, action) => {
       state.loading = false;
       // Yeni ürünü adminProducts listesine ekle
       if (state.adminProducts) {
         state.adminProducts.push(action.payload.product);
       }
     });
     builder.addCase(addAdminProduct.rejected, (state, action) => {
       state.loading = false;
       state.error = action.error.message;
     });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
