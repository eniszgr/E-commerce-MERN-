import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    keyword:""
}

const generalSlice = createSlice({
    name: 'general',                                                        //slice is stored in the redux store as product
    initialState,                                                           //initial state
    reducers: {
       getKeyword: (state, action) => {
            state.keyword = action.payload;                               
        }
    },
   
})

export const { getKeyword} = generalSlice.actions
export default generalSlice.reducer ; 