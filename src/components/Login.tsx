import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { DNS, endPoints } from "../Constants/Api";

interface Props {
    onLogin: (formData: any) => void;
}

const Login: React.FC<Props> = ({ }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log("Data:", formData);
            const response = await fetch(DNS + "/" + endPoints.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error en el registro", error);
        }
    }
    return (
        <Container className="mt-5 pt-3" style={{ maxWidth: "400px", }}>
            <h2 >Login</h2>
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
    )
}

export default Login;
