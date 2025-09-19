import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    loading: false,
    error: null
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action) => {
                state.products =  action.payload;
            },
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.products.findIndex(p => p.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter(p => p.id !== action.payload);
        },
        toggleProductState: (state, action) => {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                product.state = !product.state;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    
});

export const { setProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductState,
    setLoading,
    setError  } = productsSlice.actions;
    
export default productsSlice.reducer;