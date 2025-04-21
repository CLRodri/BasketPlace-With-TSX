import { useState } from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { EmojiSmile, Image as ImageIcon } from 'react-bootstrap-icons';
import { DNS, endPoints } from "../Constants/Api";
import { toast } from "react-toastify";

export const PostBox: React.FC = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [selectedDate] = useState<Date>(() => new Date());
 
    const [formData, setFormData] = useState({
        titulo: "",
        texto: "", 
        fechaPublicacion: selectedDate.getDate() + "-" + (selectedDate.getMonth() + 1) + "-" + selectedDate.getFullYear() + " " + selectedDate.getHours() + ":" + selectedDate.getMinutes(),
        autor: user.nombre + " " + user.apellido
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent)  => {
        e.preventDefault();
        console.log(formData);
        try {
                    const response = await fetch(DNS + "/" + endPoints.CREATE_POST, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });
                    if (!response.ok) {
                        toast.error("Error en el registro de la publicación");
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                    toast.success("Publicación registrado con éxito");
                } catch (error) {
                    if (error instanceof Error) {
                        toast.error("Error: " + error.message);
                    } else {
                        toast.error("An unknown error occurred");
                    }
                }
    };

    return (
        <Card className="mb-4 shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#f8f9fa',maxHeight:'300px'}}>
            <Form onSubmit={handleSubmit}>
                <Card.Body style={{ borderRadius: '10px',  maxHeight: '300px', overflowY: 'auto' }}>
                    <Row>
                        <Col>
                            <Form.Group controlId="postTitlearea">
                                <Form.Control
                                    as="textarea"
                                    rows={1}
                                    style={{ resize: 'none' }}
                                    placeholder="Titulo de la publicación"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    name="titulo"
                                    type="text"
                                />
                            </Form.Group>
                            <br />
                            <Form.Group controlId="postTextarea">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Escribe una descripción de la publicación"
                                    style={{ resize: 'none' }}
                                    value={formData.texto}
                                    onChange={handleChange}
                                    name="texto"
                                    type="text"
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-between align-items-center mt-2">
                                <div className="d-flex gap-3 text-primary">
                                    <ImageIcon role="button" />
                                    <EmojiSmile role="button" />
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                    >
                                        Publicar
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Form>
        </Card>
    );
};

export default PostBox;