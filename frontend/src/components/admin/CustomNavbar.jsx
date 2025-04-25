import { Container } from "react-bootstrap"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


const CustomNavbar = () => {
    return (
            <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand href="/">MyDeeDeezer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin">Home</Nav.Link>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                            <Nav.Link href="/admin/users">Users</Nav.Link>
                            <Nav.Link href="/admin/playlists">Playlists</Nav.Link>
                            <Nav.Link href="/admin/songs">Songs</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
    )
}

export default CustomNavbar;