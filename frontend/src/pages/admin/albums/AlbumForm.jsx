import { useNavigate, useParams } from "react-router";
import global_vars from "../../../config/global_vars";
import { useEffect, useState } from "react";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import CustomComboBox from "../../../components/admin/CustomComboBox";


const AlbumsForm = () => {

    const { id } = useParams();
    const [albumsName, setAlbumsName] = useState("");
    const [albumsPicture, setAlbumsPicture] = useState(null);
    const [albumsArtistId, setAlbumsArtistId] = useState(0);
    const [artistsDataSource, setArtistsDataSource] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchArtistsForDataSource()
        if (!id) return;
        fetchAlbumsData();
    }, [id])

    const fetchAlbumsData = async () => {
        const response = await fetch(`${global_vars.api_url}/albums/${id}`);
        const data = await response.json();

        if (!response.ok) {
            navigate('/admin/Albumss')
            return (
                <div onLoad={alert('Error al cargar el genero')}></div>
            )
        }

        setAlbumsName(data.album_name);
        setAlbumsPicture(data.picture_path);
        setAlbumsArtistId(data.artist_id);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("album_name", albumsName);
        //En caso de create y no se haya seleccionado un genero, se selecciona el primero de la lista
        formData.append("artist_id", albumsArtistId)
        //Agregar el banner solo si es un archivo
        if (albumsPicture instanceof File) {
            formData.append("picture", albumsPicture);
        }

        console.log(formData);

        if (id) {
            await handleUpdate(formData);
            //reload
        } else {
            await handleCreate(formData);
        }
        navigate('/admin/albums');
    }

    const handleCreate = async (formData) => {
        const response = await fetch(`${global_vars.api_url}/albums/create`, {
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
        const response = await fetch(`${global_vars.api_url}/albums/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            return (
                <div onLoad={alert('Se actualizó el Albumsa')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al actualizar el Albumsa')}></div>
            )
        }
    }

    const handleDelete = async () => {

        const response = await fetch(`${global_vars.api_url}/albums/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            navigate('/admin/albums')
            return (
                <div onLoad={alert('Se eliminó el Albumsa')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al eliminar el Albumsa')}></div>
            )
        }
    }

    const fetchArtistsForDataSource = async () => {
        const response = await fetch(`${global_vars.api_url}/artists`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data);

        setArtistsDataSource(data);
        //set default Artist id to the first one in the list
        if(albumsArtistId === 0){
            setAlbumsArtistId(data[0].id);
        }
    }

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
                <div>
                    <a href="/admin/albums" className="btn btn-secondary m-2">Volver a la lista</a>
                </div>
                <Card>
                    <Card.Body className="p-4">
                        <h1> Album </h1>
                        <Row className="mt-3">
                            <Col className="d-flex">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nombre del Albumsa</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Albums name"
                                            value={albumsName} onChange={(e) => setAlbumsName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Artista</Form.Label>
                                        <CustomComboBox dataSource={artistsDataSource} textField="name" valueField="id" selectedValue={albumsArtistId}
                                            disabled={id != undefined} required={id == undefined} onChange={(value) => setAlbumsArtistId(value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Album cover</Form.Label>
                                        <Form.Control type="file" placeholder="Add the Banner for the Artist"
                                            onChange={(e) => setAlbumsPicture(e.target.files[0])} required={!id} />
                                        {(id) && (
                                            <img src={global_vars.albums_files_path + albumsPicture} class="img-fluid mt-2" style={{ maxWidth: "200px" }} />
                                        )}
                                    </Form.Group>
                                    <Form.Group style={{ display: "flex", justifyContent: "space-between" }}>
                                        <button class="btn btn-success m-3">Guardar</button>
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

export default AlbumsForm;