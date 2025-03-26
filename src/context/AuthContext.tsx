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

    useEffect(() => {
        // Verificar si hay un usuario autenticado en localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);

            const fetchUserData = async () => {
                try {
                    const response = await fetch(DNS + "/" + endPoints.PROFILE, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(storedUser).token}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                    const data = await response.json();
                    setUser({ ...data, logged: true });
                    localStorage.setItem("user", JSON.stringify(data)); // Actualizar localStorage
                } catch (error) {
                    console.error(error);
                    toast.error(error instanceof Error ? error.message : String(error));
                }
            }
            fetchUserData();
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
            toast.success("Usuario logueado con éxito: " + data.email);
            setUser({ ...formData, logged: true });
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(formData));
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
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,user, login, logout }}>
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
