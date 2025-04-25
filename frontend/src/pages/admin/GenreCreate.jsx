import { Card, Col, Form, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import global_vars from "../../config/global_vars.js";
import CustomNavbar from "../../components/admin/CustomNavbar";
import { Button } from "bootstrap";

const GenreCreateView = () => {


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("name", "Genre Name"); // Replace with actual genre name
        formData.append("description", "Genre Description"); // Replace with actual genre description
        formData.append("banner", "Banner File"); // Replace with actual file

        const response = await fetch(`${global_vars.api_url}/genres`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log("Genre created successfully!");
        } else {
            console.error("Error creating genre:", response.statusText);
        }
    }

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
            <Card>
                    <Card.Body className="p-4">
                        <h1>Create a Genre</h1>
                        <Row className="mt-3">
                            <Col className="d-flex">
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Genre Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter genre name" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Genre Description</Form.Label>
                                        <Form.Control type="file" placeholder="Add the Banner for the Genre" />
                                    </Form.Group>
                                    <Form.Group>
                                        <button class="btn btn-success m-3">Save</button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default GenreCreateView;