import 'bootstrap/dist/css/bootstrap.min.css';
import { URLS } from '../Constants/Urls';
import { Button, Container, Navbar, Nav as BootstrapNav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';


export const Nav: React.FC = () => {

  const { logout, isAuthenticated } = useAuth(); // Usar el contexto de autenticación
  const navigate = (url: string) => {
    window.location.href = url;
  }
  const handleSignOut = () => {
    logout(); // Usar el método logout del contexto
    toast.info("Usuario deslogueado con éxito");
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='w-100 fixed-top'>
      <Container fluid className='px-5'>
        {/* Nombre de la web */}
        <Navbar.Brand as={NavLink} to="/">
          BasketPlace
        </Navbar.Brand>

        {/* Botón de menú responsive */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Enlaces de navegación */}
        <Navbar.Collapse id="basic-navbar-nav">
          <BootstrapNav className="mx-auto">
            <BootstrapNav.Link as={NavLink} to={URLS.HOME} end>
              Home
            </BootstrapNav.Link>
            <BootstrapNav.Link as={NavLink} to={URLS.ABOUT}>
              About
            </BootstrapNav.Link>
            <BootstrapNav.Link as={NavLink} to={URLS.CONTACT}>
              Contact
            </BootstrapNav.Link>
          </BootstrapNav>

          {/* Botones de Login y Sign Up */}
          {
           isAuthenticated ? ( // Verificar el estado del usuario desde el contexto
              <BootstrapNav>
                <Button variant="outline-light" className="me-2" onClick={() => navigate(URLS.PROFILE)}>
                  Perfil
                </Button>
                <Button variant="outline-light" className="me-2" onClick={handleSignOut}>Log Out</Button>
              </BootstrapNav>
            ) : (
              <BootstrapNav>
                <Button variant="outline-light" className="me-2" onClick={() => navigate(URLS.LOGIN)}>
                  Login
                </Button>
                <Button variant="outline-light" className="me-2" onClick={() => navigate(URLS.REGISTER)}>Sign Up</Button>
              </BootstrapNav>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
