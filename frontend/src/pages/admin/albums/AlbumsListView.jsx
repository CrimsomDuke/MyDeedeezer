import { useEffect, useState } from "react";
import global_vars from "../../../config/global_vars";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import { Container, Row, Table, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const AlbumsListView = () => {

    const [albumsList, setAlbumsList] = useState([]);

    const fetchAlbums = async () => {
        const response = await fetch(`${global_vars.api_url}/albums`);
        const data = await response.json();
        setAlbumsList(data);
    }

    useEffect(() => {
        fetchAlbums();
    }, [])

    return (
        <>
            <CustomNavbar />
            <Container className="mt-3">
                <div>
                    <a href="/admin/albums/form" className="btn btn-success m-3">Crear Album</a>
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
                            <tbody>
                                {albumsList.map((album) => (
                                    <tr>
                                        <td>{album.id}</td>
                                        <td>{album.album_name}</td>
                                        <td><a className="btn btn-primary" href={`/admin/albums/form/${album.id}`}>Editar</a></td>
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

export default AlbumsListView;