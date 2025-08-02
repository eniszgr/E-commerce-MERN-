import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: {},
  isAuth: false,
  loading: false, // loading state
};

export const register = createAsyncThunk("register", async (data = {}) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Cookie'lerin gönderilmesi için kritik!
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `http://localhost:4000/register`,
    requestOptions
  );
  return response.json();
});
export const login = createAsyncThunk("login", async (data = {}) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Cookie'lerin gönderilmesi için kritik!
    body: JSON.stringify({ email: data.email, password: data.password }),
  };
  const response = await fetch(`http://localhost:4000/login`, requestOptions);
  return response.json();
});
export const loadUser = createAsyncThunk("loadUser", async () => {
  const response = await fetch("http://localhost:4000/me", {
    credentials: "include",
  });
  return response.json();
});
export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await fetch('http://localhost:4000/logout', {
      method: 'POST',
      credentials: 'include'
    });
    return response.json();
  }
);
export const forgotPassword = createAsyncThunk("forgot", async (email) => {
  const response = await fetch('http://localhost:4000/forgotPassword', {
    method: 'POST',
    credentials:"include",
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({email})
  });
  let res = await response.json();
  
  if (!response.ok) {
    throw new Error(res.message || 'Something went wrong');
  }
  
  return res;
});
export const resetPassword = createAsyncThunk('reset',
  async(params)=>{
    const requestOptions ={
      method:'POST',
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
      body:JSON.stringify({password:params.password})
    };
    const response = await fetch(`http://localhost:4000/reset/${params.token}`,requestOptions)
    let res = await response.json();
    
    if (!response.ok) {
      throw new Error(res.message || 'Something went wrong');
    }
    
    return res;
  }
)



const userSlice = createSlice({
  name: "user", //slice is stored in the redux store as product
  initialState, //initial state
  reducers: {},
  extraReducers: (builder) => {
    //using extra reducers to handle async actions
    builder.addCase(register.pending, (state, action) => {
      // pending means the request is in progress
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      // fulfilled means the request is completed successfully
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.newUser; // payload is the data returned from the async function
      // Token'ı localStorage'a da kaydet
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(login.pending, (state, action) => {
      // pending means the request is in progress
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      // fulfilled means the request is completed successfully
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user; // newUser yerine user kullan
      // Token'ı localStorage'a da kaydet
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuth = !!action.payload.user;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.isAuth = false;
      localStorage.removeItem('token');
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.user = {};
      state.loading = false;
      state.isAuth = false;
      localStorage.removeItem('token');
    });
    builder.addCase(forgotPassword.pending, (state,action)=>{
      state.loading=true;
    });
    builder.addCase(forgotPassword.fulfilled, (state,action)=>{
      state.loading=false;
    });
    builder.addCase(forgotPassword.rejected, (state,action)=>{
      state.loading=false;
    });
    builder.addCase(resetPassword.pending, (state,action)=>{
      state.loading=true;
    });
    builder.addCase(resetPassword.fulfilled, (state,action)=>{
      state.loading=false;
    });
    builder.addCase(resetPassword.rejected, (state,action)=>{
      state.loading=false;
    });

  },
  },
);

export const {} = userSlice.actions;
export default userSlice.reducer;
