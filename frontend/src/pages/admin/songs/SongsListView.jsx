import { useEffect, useState } from "react";
import global_vars from "../../../config/global_vars";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import { Container, Row, Table, Col } from "react-bootstrap";

const SongsListView = () => {

    const [songsList, setSongsList] = useState([]);

    const fetchSongs = async () => {
        const response = await fetch(`${global_vars.api_url}/songs`);
        const data = await response.json();
        setSongsList(data);
    }

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <>
            <CustomNavbar />
            <Container className="mt-3">
                <div>
                    <a href="/admin/songs/form" className="btn btn-success m-3">Crear Cancion</a>
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
                                {songsList.map((album) => (
                                    <tr>
                                        <td>{album.id}</td>
                                        <td>{album.song_name}</td>
                                        <td><a className="btn btn-primary" href={`/admin/songs/form/${album.id}`}>Editar</a></td>
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

export default SongsListView;