import { createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react'

interface AuthContextType {
    isLoggedIn: boolean;
    isLoading: boolean; 
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const verifySession = async () => {
            if (!localStorage.getItem('adminLoggedIn')) {
                setIsLoading(false);
                return;
            }
            try {
                const response = await fetch('/api/auth/status', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsLoggedIn(true);
                } else {
                    localStorage.removeItem('adminLoggedIn');
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('Error verificando sesión con el servidor:', error);
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
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

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
}
