import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: []
};

export const productsSlice = createSlice({
    name: "userProducts",
    initialState,
    reducers: {
        userProducts: (state, action) => {
                state.products =  action.payload;
            }

    },
    
});

export const { userProducts } = productsSlice.actions;
export default productsSlice.reducer;