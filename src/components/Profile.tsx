import { Button, Container, Form } from "react-bootstrap";
import { User } from "../types/User";
import { useState } from "react";
import DatePicker from "react-datepicker";

interface Props {
    onLogin: (formData: User) => void;
}

export const Profile: React.FC<Props> = () => {

    const [formData, setFormData] = useState<User>({
        email: JSON.parse(localStorage.getItem("user") || "{}")?.email,
        password: JSON.parse(localStorage.getItem("user") || "{}")?.password,
        nombre: JSON.parse(localStorage.getItem("user") || "{}")?.nombre,
        apellido: JSON.parse(localStorage.getItem("user") || "{}")?.apellido,
        fechaNacimiento: JSON.parse(localStorage.getItem("user") || "{}")?.fechaNacimiento,
        logged: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

    const handleDateChange = (date: Date | null) => {
        if (date) {
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            setSelectedDate(date);
            setFormData({ ...formData, fechaNacimiento: formattedDate });
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Lógica de actualización de perfil

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container className="mt-5 pt-3" style={{ maxWidth: "400px" }} >
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

                <Form.Group controlId="email" className="mt-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="contraseña" className="mt-2">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="fechaNacimiento" className="mt-2">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <br/>
                    <DatePicker
                        selected={selectedDate}
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleDateChange}
                        dateFormat="dd-MM-yyyy"
                        className="form-control"
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
