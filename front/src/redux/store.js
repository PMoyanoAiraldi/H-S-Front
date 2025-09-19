import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";           
import productsReducer from "./productsReducer";   
import categoriesReducer from "./categoriesReducer"; 

const store = configureStore({
    reducer: {
        user: userReducer,         
        products: productsReducer, 
        categories: categoriesReducer 
    }
})

export default store;