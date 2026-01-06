import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/lib/axios'; // Importa tu instancia de axios SIN interceptores de respuesta

export const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Configuramos el interceptor aquí dentro porque AQUÍ sí tenemos acceso a navigate
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    const status = error.response.status;
                    if (status === 403) {
                        if (window.location.pathname !== '/dashboard') {
                            toast.warning("Acceso Restringido", {
                                description: "No tienes permisos para esta sección."
                            });
                            navigate('/dashboard');
                        }
                    }

                    if (status === 401) {
                         if (!window.location.pathname.includes('/auth/login')) {
                            localStorage.removeItem('AUTH_TOKEN');
                            toast.error("Sesión Expirada");
                            navigate('/auth/login');
                         }
                    }
                }
                return Promise.reject(error);
            }
        );
        return () => api.interceptors.response.eject(interceptor);

    }, [navigate]);

    return <>{children}</>;
};