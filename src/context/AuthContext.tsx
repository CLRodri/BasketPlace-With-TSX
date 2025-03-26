import React, { createContext, useState } from "react";
import { User } from "../types/User";
import { toast } from 'react-toastify';
import { DNS } from "../Constants/Api";
import { endPoints } from "../Constants/Api";

interface AuthContextProps {
    user: User | null;
    login: (formData: User) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    login: async () => {},
    logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (formData: User) => {
        // Aquí iría la lógica de autenticación (fetch al backend)
        
        try {
            console.log("Data:", formData);
            const response = await fetch(DNS + "/" + endPoints.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.log("Response:", response);
                throw new Error(`${(await response.text()).toString()}`);
            }
            const data = await response.json();
            toast.success("Usuario logueado con éxito: " + data.email);
            setUser({ ...formData, logged: true });
        } catch (error) {
            setUser({ ...formData, logged: false });
            console.error(error);
            toast.error(error instanceof Error ? error.message : String(error));}
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
