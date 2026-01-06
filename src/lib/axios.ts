import axios from "axios";
import { toast } from 'sonner';

//. ->  Crear instancia de axios
//console.log('VITE_API_URL leída:', import.meta.env.VITE_API_URL);
const api = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 403) {
                window.location.href = '/dashboard';
                toast.warning("Acceso Restringido", {
                    description: "No tienes permisos para ver esta sección. Redirigiendo...",
                    duration: 4000,
                });
                return Promise.reject(error);
            }

            if (error.response.status === 401) {
                localStorage.removeItem('AUTH_TOKEN');
                toast.error("Sesión Expirada", {
                    description: "Tu token de seguridad ha caducado. Por favor inicia sesión de nuevo.",
                });
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
        
        // Rechazamos la promesa para que React Query sepa que falló
        return Promise.reject(error);
    }
);

export default api