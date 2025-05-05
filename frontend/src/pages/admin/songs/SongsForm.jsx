import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import global_vars from "../../../config/global_vars";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import CustomComboBox from "../../../components/admin/CustomComboBox";
import { Card, Col, Container, Form, Row } from "react-bootstrap";

const SongsForm = () => {

    const { id } = useParams();
    const [songsName, setSongsName] = useState("");
    const [songsAlbumId, setSongsAlbumId] = useState(0);
    const [songFile, setSongFile] = useState(null);
    const [albumsDataSource, setAlbumsDataSource] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAlbumsForDataSource()
        if (!id) return;
        fetchSongsData();
    }, [id])

    const fetchSongsData = async () => {
        const response = await fetch(`${global_vars.api_url}/songs/${id}`);
        const data = await response.json();

        if (!response.ok) {
            navigate('/admin/songs')
            return (
                <div onLoad={alert('Error al cargar el genero')}></div>
            )
        }

        console.log(data);

        setSongsName(data.song_name);
        setSongFile(data.file_path);
        setSongsAlbumId(data.album_id);

        console.log(songFile)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        //form data which receive a audio file
        const formData = new FormData();
        
        formData.append("song_name", songsName);
        if(songFile instanceof File) {
            formData.append("song", songFile);
        }

        //En caso de create y no se haya seleccionado un albumn, se selecciona el primero de la lista
        if(songsAlbumId != 0){
            formData.append("album_id", songsAlbumId);
        }else{
            formData.append("album_id", albumsDataSource[0].id);
        }

        console.log(formData);

        if (id) {
            await handleUpdate(formData);
            //reload
        } else {
            await handleCreate(formData);
        }
        navigate('/admin/Songs');
    }

    const handleCreate = async (formData) => {
        const response = await fetch(`${global_vars.api_url}/songs/create`, {
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
        const response = await fetch(`${global_vars.api_url}/songs/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            return (
                <div onLoad={alert('Se actualizó la cancion')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al actualizar la cancion')}></div>
            )
        }
    }

    const handleDelete = async () => {

        const response = await fetch(`${global_vars.api_url}/songs/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            navigate('/admin/songs')
            return (
                <div onLoad={alert('Se eliminó la cancion')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al eliminar la cancion')}></div>
            )
        }
    }

    const fetchAlbumsForDataSource = async () => {
        const response = await fetch(`${global_vars.api_url}/albums`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data);

        setAlbumsDataSource(data);
    }

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
                <div>
                    <a href="/admin/Songs" className="btn btn-secondary m-2">Volver a la lista</a>
                </div>
                <Card>
                    <Card.Body className="p-4">
                        <h1> Camciom </h1>
                        <Row className="mt-3">
                            <Col className="d-flex">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nombre de la cancion</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre de la canción"
                                            value={songsName} onChange={(e) => setSongsName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Album</Form.Label>
                                        <CustomComboBox dataSource={albumsDataSource} textField="album_name" valueField="id" selectedValue={songsAlbumId}
                                            disabled={id != undefined} required={id == undefined} onChange={(value) => setSongsAlbumId(value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Song</Form.Label>
                                        <Form.Control type="file" placeholder="Song" accept="audio/*"
                                            onChange={(e) => setSongFile(e.target.files[0])} required={!id} />
                                        {(songFile) && (
                                            <audio controls className="m-3">
                                                <source src={global_vars.songs_files_path + songFile} type="audio/mpeg" />
                                            </audio>
                                        )}
                                    </Form.Group>
                                    <Form.Group style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button class="btn btn-success m-3">Guardar</button>
                                        {(id) && (
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

export default SongsForm;