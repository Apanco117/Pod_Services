import axios from "axios";

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

export default api