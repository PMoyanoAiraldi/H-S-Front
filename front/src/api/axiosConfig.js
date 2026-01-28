import Swal from "sweetalert2";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

const axiosInstance = axios.create({
    baseURL: API_URL
});

// Interceptor para agregar el token a cada petición
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de respuesta (token expirado)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('token');
            // Redirigir al login
            window.location.href = '/login';
            
            // Opcional: mostrar mensaje
            Swal.fire('Sesión expirada', 'Por favor, inicia sesión nuevamente', 'warning');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;