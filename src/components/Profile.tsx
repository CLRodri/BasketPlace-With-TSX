import { Button, Container, Form } from "react-bootstrap";
import { User } from "../types/User";
import { useState } from "react";

interface Props {
    onLogin: (formData: User) => void;
}

export const Profile: React.FC<Props> = () => {   

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
            // Lógica de actualización de perfil
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container className="mt-5 pt-3" style={{ maxWidth: "400px" }}>
            <h2>Perfil</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="apellido" className="mt-2">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="fechaNacimiento" className="mt-2">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Actualizar
                </Button>
            </Form>
        </Container>
    )

}