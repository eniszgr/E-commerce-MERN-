import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isAuth: false,
    loading: false,         // loading state    
}

export const register = createAsyncThunk(
  'register',
  async (data={}) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Cookie'lerin gönderilmesi için kritik!
        body: JSON.stringify(data)
    };
   
    const response = await fetch(`http://localhost:4000/register`,requestOptions);
    
    return response.json();
  }
)


const userSlice = createSlice({
    name: 'user',                                                        //slice is stored in the redux store as product
    initialState,                                                           //initial state
    reducers: {},
    extraReducers:(builder) => {                                            //using extra reducers to handle async actions
        builder.addCase(register.pending, (state,action) => {            // pending means the request is in progress
            state.loading = true
            state.isAuth = false
        })
        builder.addCase(register.fulfilled, (state,action) => {          // fulfilled means the request is completed successfully
            state.loading = false
            state.isAuth = true
            state.user = action.payload.newUser                              // payload is the data returned from the async function
            // Token'ı localStorage'a da kaydet
            localStorage.setItem('token', action.payload.token)
        })
        
    }
})

export const {} = userSlice.actions
export default userSlice.reducer