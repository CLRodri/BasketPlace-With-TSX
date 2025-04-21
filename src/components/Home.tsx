import { Button, Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import PostBox from "./PostBox";

export const Home: React.FC = () => {

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        // For example, you can send the form data to an API endpoint or perform some action
    }

    //Aqui va la logica para mostrar las ofertas de equipos
    return (
        <Container className="mt-5 pt-3" style={{ maxWidth: '600' }}>
            <PostBox/>
        </Container>

    );
}