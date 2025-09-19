import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories: [],
    loading: false,
    error: null
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        addCategory: (state, action) => {
            state.categories.push(action.payload);
        },
        updateCategory: (state, action) => {
            const index = state.categories.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.categories[index] = action.payload;
            }
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(c => c.id !== action.payload);
        },
        setCategoriesLoading: (state, action) => {
            state.loading = action.payload;
        },
        setCategoriesError: (state, action) => {
            state.error = action.payload;
        }
    },
    
});

export const { setCategories, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    setCategoriesLoading,
    setCategoriesError  } = categoriesSlice.actions;
export default categoriesSlice.reducer;