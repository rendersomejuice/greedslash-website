import { createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react'

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean; // Vital para evitar parpadeos mientras verificamos el servidor
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Empezamos cargando

    useEffect(() => {
        const verifySession = async () => {
            // Si ni siquiera hay rastro en localStorage, no molestamos al servidor
            if (!localStorage.getItem('adminLoggedIn')) {
                setIsLoading(false);
                return;
            }

            try {
                // Hacemos una petición rápida a un endpoint de control en tu backend
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/status`, {
                    method: 'GET',
                    credentials: 'include' // Para enviar tus cookies de sesión
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    // Si el servidor dice que la cookie expiró, limpiamos todo
                    localStorage.removeItem('adminLoggedIn');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error verificando sesión con el servidor:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false); // La verificación terminó
            }
        };

        verifySession();
    }, []);

    const login = () => {
        localStorage.setItem('adminLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar la autenticación en cualquier parte de forma limpia
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
