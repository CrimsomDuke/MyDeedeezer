import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import global_vars from "../../../config/global_vars";
import CustomNavbar from "../../../components/admin/CustomNavbar";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import CustomComboBox from "../../../components/admin/CustomComboBox";


const ArtistForm = () => {

    const { id } = useParams();
    const [artistName, setArtistName] = useState("");
    const [artistPicture, setArtistPicture] = useState(null);
    const [artistGenreId, setArtistGenreId] = useState(0);
    const [genresDataSource, setGenresDataSource] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenresForDataSource()
        if (!id) return;
        fetchArtistData();
        }, [id])

    const fetchArtistData = async () => {
        const response = await fetch(`${global_vars.api_url}/artists/${id}`);
        const data = await response.json();

        if (!response.ok) {
            navigate('/admin/artists')
            return (
                <div onLoad={alert('Error al cargar el genero')}></div>
            )
        }

        setArtistName(data.name);
        setArtistPicture(data.picture_path);
        setArtistGenreId(data.genre_id);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("name", artistName);
        //En caso de create y no se haya seleccionado un genero, se selecciona el primero de la lista
        formData.append("genre_id", artistGenreId)
        //Agregar el banner solo si es un archivo
        if (artistPicture instanceof File) {
            formData.append("picture", artistPicture);
        }

        console.log(formData);

        if (id) {
            await handleUpdate(formData);
            //reload
        } else {
            await handleCreate(formData);
        }
        navigate('/admin/artists');
    }

    const handleCreate = async (formData) => {
        const response = await fetch(`${global_vars.api_url}/artists/create`, {
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
        const response = await fetch(`${global_vars.api_url}/artists/update/${id}`, {
            method: 'PUT',
            body: formData,
        });

        if (response.ok) {
            return (
                <div onLoad={alert('Se actualizó el artista')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al actualizar el artista')}></div>
            )
        }
    }

    const handleDelete = async () => {

        const response = await fetch(`${global_vars.api_url}/artists/delete/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            navigate('/admin/artists')
            return (
                <div onLoad={alert('Se eliminó el artista')}></div>
            )
        } else {
            return (
                <div onLoad={alert('Error al eliminar el artista')}></div>
            )
        }
    }

    const fetchGenresForDataSource = async () => {
        const response = await fetch(`${global_vars.api_url}/genres`, {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data);

        setGenresDataSource(data);
        //set default genre id to the first one in the list
        if(artistGenreId === 0){
            setArtistGenreId(data[0].id);
        }
    }

    return (
        <>
            <CustomNavbar />
            <Container className="mt-5">
                <div>
                    <a href="/admin/artists" className="btn btn-secondary m-2">Volver a la lista</a>
                </div>
                <Card>
                    <Card.Body className="p-4">
                        <h1> Artista </h1>
                        <Row className="mt-3">
                            <Col className="d-flex">
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Nombre del artista</Form.Label>
                                        <Form.Control type="text" placeholder="Enter genre name"
                                            value={artistName} onChange={(e) => setArtistName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Género</Form.Label>
                                        <CustomComboBox dataSource={genresDataSource} textField="name" valueField="id" selectedValue={artistGenreId}
                                            disabled={id != undefined} required={id == undefined} onChange={(value) => setArtistGenreId(value)} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Genre Banner</Form.Label>
                                        <Form.Control type="file" placeholder="Add the Banner for the Genre"
                                            onChange={(e) => setArtistPicture(e.target.files[0])} required={!id} />
                                        {(id) && (
                                            <img src={global_vars.artists_files_path + artistPicture} class="img-fluid mt-2" style={{ maxWidth: "200px" }} />
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

export default ArtistForm;