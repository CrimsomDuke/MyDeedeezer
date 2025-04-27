import { Card, Col, Form, NavLink, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import global_vars from "../../../config/global_vars.js";
import CustomNavbar from "../../../components/admin/CustomNavbar.jsx";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const GenreCreateView = () => {

    const { id } = useParams();
    const [genreName, setGenreName] = useState("");
    const [genreBanner, setGenreBanner] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetchGenreData();
    }, [id])

    const fetchGenreData = async () => {
        const response = await fetch(`${global_vars.api_url}/genres/${id}`);
        const data = await response.json();

        if (!response.ok) {
            navigate('/')
            return (
                <div onLoad={alert('Error al cargar el genero')}></div>
            )
        }

        setGenreName(data.name);
        setGenreBanner(data.banner_path);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("name", genreName);
        //Agregar el banner solo si es un archivo
        if (genreBanner instanceof File) {
            formData.append("banner", genreBanner);
        }

        if (id) {
            await handleUpdate(formData);
            //reload
            window.location.reload();
        } else {
            await handleCreate(formData);
            navigate('/')
        }
    }

    const handleCreate = async (formData) => {
        const response = await fetch(`${global_vars.api_url}/genres/create`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            return (
                <div onLoad={alert('Wea creada mi rey')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al crear el genero')}></div>
            )
        }
    }

    const handleUpdate = async (formData) => {
        const response = await fetch(`${global_vars.api_url}/genres/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            return (
                <div onLoad={alert('Se actualizó el genero')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al actualizar el genero')}></div>
            )
        }
    }

    const handleDelete = async () => {

        const response = await fetch(`${global_vars.api_url}/genres/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            navigate('/')
            return (
                <div onLoad={alert('Se eliminó el genero')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al eliminar el genero')}></div>
            )
        }
    }

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
                <div>
                    <a href="/" className="btn btn-secondary m-2">Get back to List</a>
                </div>
                <Card>
                    <Card.Body className="p-4">
                        <h1> Genre </h1>
                        <Row className="mt-3">
                            <Col className="d-flex">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Genre Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter genre name"
                                            value={genreName} onChange={(e) => setGenreName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Genre Banner</Form.Label>
                                        <Form.Control type="file" placeholder="Add the Banner for the Genre"
                                            onChange={(e) => setGenreBanner(e.target.files[0])} required={!id} />
                                        {(id) && (
                                            <img src={global_vars.genres_files_path + genreBanner} class="img-fluid mt-2" style={{ maxWidth: "200px" }} />
                                        )}
                                    </Form.Group>
                                    <Form.Group style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button class="btn btn-success m-3">Save</button>
                                        { (id) && (
                                            <button class="btn btn-danger m-3" onClick={() => handleDelete()} type="button">Delete</button>
                                        )}
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