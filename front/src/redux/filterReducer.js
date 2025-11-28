import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    lineas: [],
    rubros: [],
    marcas: [],
    loading: false,
    error: null
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setLineas: (state, action) => {
            state.lineas = action.payload;
        },
        setRubros: (state, action) => {
            state.rubros = action.payload;
        },
        setMarcas: (state, action) => {
            state.marcas = action.payload;
        },
        // addCategory: (state, action) => {
        //     state.categories.push(action.payload);
        // },
        // updateCategory: (state, action) => {
        //     const index = state.categories.findIndex(c => c.id === action.payload.id);
        //     if (index !== -1) {
        //         state.categories[index] = action.payload;
        //     }
        // },
        // deleteCategory: (state, action) => {
        //     state.categories = state.categories.filter(c => c.id !== action.payload);
        // },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    
});

export const {setLineas, setRubros, setMarcas, setLoading, setError} = filterSlice.actions;
export default filterSlice.reducer;