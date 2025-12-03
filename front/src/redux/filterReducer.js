import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';


// Esta función llama a tu backend para traer las líneas
export const fetchLineas = createAsyncThunk(
    'filters/fetchLineas', // Nombre único de la acción
    async (_, { rejectWithValue }) => { //el _ como 1er param significa que no se pasa nada o sea lo ignora y rejectWithValue: Para manejar errores personalizados
        try {
            // Hace la petición GET a tu backend
            const response = await axios.get(`${API_URL}/linea`);
            // Retorna los datos que vienen del backend
            return response.data;
        } catch (error) {
            // Si hay error, retorna el mensaje de error
            return rejectWithValue(error.response?.data?.message || 'Error al cargar líneas');
        }
    }
);


// Esta función llama a tu backend para traer los rubros
export const fetchRubros = createAsyncThunk(
    'filters/fetchRubros',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/rubro`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al cargar rubros');
        }
    }
);

// Esta función llama a tu backend para traer las marcas
export const fetchMarcas = createAsyncThunk(
    'filters/fetchMarcas',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/marca`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error al cargar marcas');
        }
    }
);




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

     // Reducers normales (acciones síncronas)
    reducers: {
        //Estas se usan si necesito actualizar manualmente
        setLineas: (state, action) => {
            state.lineas = action.payload;
        },
        setRubros: (state, action) => {
            state.rubros = action.payload;
        },
        setMarcas: (state, action) => {
            state.marcas = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },


    // extraReducers maneja las acciones ASÍNCRONAS
    // Aquí "escuchamos" los 3 estados de cada petición
    extraReducers: (builder) => {
        
        // ===== MANEJO DE fetchLineas =====
        builder
            // Cuando EMPIEZA a cargar líneas
            .addCase(fetchLineas.pending, (state) => {
                state.loading = true;   // Activamos el loading
                state.error = null;     // Limpiamos errores previos
            })
            // Cuando TERMINA exitosamente
            .addCase(fetchLineas.fulfilled, (state, action) => {
                state.loading = false;          // Desactivamos el loading
                state.lineas = action.payload;  // Guardamos las líneas que vinieron del backend
            })
            // Cuando HAY UN ERROR
            .addCase(fetchLineas.rejected, (state, action) => {
                state.loading = false;        // Desactivamos el loading
                state.error = action.payload; // Guardamos el mensaje de error
            })
            // ===== MANEJO DE fetchRubros =====
            .addCase(fetchRubros.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRubros.fulfilled, (state, action) => {
                state.loading = false;
                state.rubros = action.payload;
            })
            .addCase(fetchRubros.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ===== MANEJO DE fetchMarcas =====
            .addCase(fetchMarcas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMarcas.fulfilled, (state, action) => {
                state.loading = false;
                state.marcas = action.payload;
            })
            .addCase(fetchMarcas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        }
    
});

export const {setLineas, setRubros, setMarcas, setLoading, setError} = filterSlice.actions;
export default filterSlice.reducer;