import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:3010/products/${id}`);
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                const exists = state.products.find(p => p.id === action.payload.id);
                if (!exists) {
                    state.products.push(action.payload);
                }
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

export const { setProducts, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductState,
    setLoading,
    setError  } = productsSlice.actions;
    
export default productsSlice.reducer;