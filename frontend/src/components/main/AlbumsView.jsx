import { useEffect, useState } from "react";
import global_vars from "../../config/global_vars";


const AlbumsView = (props) => {

    const { selectedArtistId, onBackwards, global_state } = props;
    const [albumsList, setAlbumsList] = useState([]);
    const [selectedAlbumId, setSelectedAlbumId] = useState(0);

    useEffect(() => {
        fetchAlbums();
    })

    const fetchAlbums = async () => {
        const response = await fetch(`${global_vars.api_url}/albums/artist/${selectedArtistId}`);
        const data = await response.json();

        setAlbumsList(data);
    }


    return (
        <section class="genres-component">
            {!selectedAlbumId > 0 && (
                <>
                    <p onClick={onBackwards}> -- Volver a Artistas</p>
                    <h1 class="genres-title">Los artistas del genero</h1>
                    <div class="d-flex container flex-wrap justify-content-center align-items-center">
                        {albumsList.map((album) => (
                            <div className="genre-item" onClick={() => setSelectedAlbumId(album.id)} key={album.id}>
                                <img src={global_vars.albums_files_path + album.picture_path} className="img-fluid w-100" />
                                <h3>{album.album_name}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default AlbumsView;