
import { useState, useEffect } from "react";
import global_vars from "../../../config/global_vars";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import { Container, Row, Table, Col } from "react-bootstrap";

const ArtistsListView = () => {

    const [artistsList, setArtistsList] = useState([]);

    const fetchGenres = async () => {
        const response = await fetch(`${global_vars.api_url}/artists`);
        const data = await response.json();
        setArtistsList(data);
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    return (
        <>
            <CustomNavbar />
            <Container className="mt-3">
                <div>
                    <a href="/admin/artists/form" className="btn btn-success m-3">Crear Artista</a>
                </div>
                <Row>
                    <Col>
                        <Table striped bordered size="sm" responsive>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Editar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artistsList.map((genresList) => (
                                    <tr>
                                        <td>{genresList.id}</td>
                                        <td>{genresList.name}</td>
                                        <td><a className="btn btn-primary" href={`/admin/artists/form/${genresList.id}`}>Editar</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ArtistsListView;