import { Container } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const CustomNavbar = () => {
    return (
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="/admin">MyDeeDeezer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin">Genres</Nav.Link>
                            <Nav.Link href="/admin/artists">Artists</Nav.Link>
                            <Nav.Link href="/admin/albums">Albums</Nav.Link>
                            <Nav.Link href="/admin/songs">Songs</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default CustomNavbar;