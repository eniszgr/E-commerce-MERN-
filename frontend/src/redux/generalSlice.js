import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    keyword:"",
    openModal: false, 
}

const generalSlice = createSlice({
    name: 'general',                                                        //slice is stored in the redux store as product
    initialState,                                                           //initial state
    reducers: {
       getKeyword: (state, action) => {
            state.keyword = action.payload;                               
        },
        openModal: (state, action) => {
            state.openModal = action.payload;                              //openModal is a boolean 
        }
    },
   
})

export const { getKeyword, openModal} = generalSlice.actions
export default generalSlice.reducer ; 