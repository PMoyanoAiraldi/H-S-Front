import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userReducer";
import { productsSlice } from "./productsReducer";


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        userProducts: productsSlice.reducer
    }
})

export default store;