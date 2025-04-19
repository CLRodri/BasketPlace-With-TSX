import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User } from "../types/User";
import {  useAuth } from "../context/AuthContext";
import { Home } from "./Home";
import TweetBox from "./PostBox";
import { AlignCenter } from "react-bootstrap-icons";
import PostBox from "./PostBox";

interface Props {
    onLogin: (formData: User) => void;
}

export const Login: React.FC<Props> = () => {
    const { login, isAuthenticated } = useAuth(); // Obtener el método login del contexto
    
    const [formData, setFormData] = useState<User>({
        email: "",
        password: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        logged: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(formData); // Usar el método login del contexto
            
        } catch (error) {
            console.error(error);
            toast.error("Error: " + error);
        }
    };

    return (
        <Container className="mt-5 pt-5">
            {
            isAuthenticated ? ( // Verificar el estado del usuario desde el contexto
                <Container className="mt-0 pt-0" style={{ maxWidth: "600px" }}>
                    <PostBox/>
                </Container>
            ) : (
                <>
                    <Container className="mt-0 pt-0" style={{ maxWidth: "400px" }}>
                        <h2>Login</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mt-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="mt-3">
                                Login
                            </Button>
                        </Form>
                    </Container>
                    
                </>
            )}
            <ToastContainer 
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>
    );
};

export default Login;
