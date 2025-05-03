import { Container, Row, Table, Col } from "react-bootstrap"
import CustomNavbar from "../../../components/admin/CustomNavbar"
import { Link } from "react-router"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from "react"
import global_vars from '../../../config/global_vars.js'


const GenresListView = () => {

    const [genresList, setGenresList] = useState([]);

    const fetchGenres = async () => {
        const response = await fetch(`${global_vars.api_url}/genres`);
        const data = await response.json();
        setGenresList(data);
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    return (
        <>
            <CustomNavbar />
            <Container className="mt-3">
                <div>
                    <a href="/admin/genres/form" className="btn btn-success m-3">Crear genero</a>
                </div>
                <Row>
                    <Col>
                        <Table striped bordered size="sm" responsive>
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            {genresList.length > 0 && (
                                <tbody>
                                    {genresList.map((genre) => (
                                        <tr key={genre.id}>
                                            <td>{genre.id}</td>
                                            <td>{genre.name}</td>
                                            <td>
                                                <Link to={`/admin/genres/form/${genre.id}`} className="btn btn-primary">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default GenresListView