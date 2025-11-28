import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";           
import productsReducer from "./productsReducer";   
import filterReducer from "./filterReducer";

const store = configureStore({
    reducer: {
        user: userReducer,         
        products: productsReducer, 
        filters: filterReducer 
    }
})

export default store;