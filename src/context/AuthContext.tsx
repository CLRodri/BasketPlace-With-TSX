import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { toast } from 'react-toastify';
import { DNS } from "../Constants/Api";
import { endPoints } from "../Constants/Api";

interface AuthContextProps {
    user: User | null;
    login: (formData: User) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const navigateHome = () => {
        window.location.href = '/';
      }

    useEffect(() => {
        // Verificar si hay un usuario autenticado en localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    

    
    const login = async (formData: User) => {
        try {
            const response = await fetch(DNS + "/" + endPoints.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`${(await response.text()).toString()}`);
            }
            const data = await response.json();
            toast.success("Usuario logueado con éxito: " + data.nombre + " " + data.apellido);
            setIsAuthenticated(true);
            formData.logged=true;
            setUser(data);           
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            setUser({ ...formData, logged: false });
            console.error(error);
            toast.error(error instanceof Error ? error.message : String(error));
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user"); // Eliminar del localStorage
        navigateHome();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};
