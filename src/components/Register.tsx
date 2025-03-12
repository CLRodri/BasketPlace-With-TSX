import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DNS,endPoints} from "../Constants/Api";
interface Props {
    onSignUp: (formData: any) => void;
}



export const Register: React.FC<Props> = ({  }) => {

    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        repeatPassword: "",
        fechaNacimiento: selectedDate.toLocaleDateString('en-GB')
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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
            console.log("Data:", formData);
            const response = await fetch(DNS + "/" + endPoints.REGISTER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                console.log("Response:", response);
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error en el registro");
        }
    }
        return (
            <Container className="mt-5 pt-3" style={{ maxWidth: "400px", }}>
                <h2 >Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName" className="mt-2">
                        <Form.Label>Last Name</Form.Label>
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

                    <Form.Group controlId="repeatPassword" className="mt-2">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="repeatPassword"
                            value={formData.repeatPassword}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="fechaNacimiento" className="mt-2">
                        <Form.Label>Birth Date</Form.Label>
                        <br />
                        <DatePicker
                            selected={selectedDate}
                            value={selectedDate.toLocaleDateString('en-GB')}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                            placeholderText="DD-MM-YYYY"
                            todayButton="Hoy"
                            showPopperArrow={false}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Sign Up
                    </Button>
                </Form>
            </Container>
        );
    }