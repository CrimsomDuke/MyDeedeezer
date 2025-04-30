import { useEffect, useState } from "react";
import global_vars from "../../config/global_vars";
import { BackspaceFill } from "react-bootstrap-icons";


const AlbumsView = (props) => {

    const { selectedArtistId, onBackwards, global_state } = props;
    const [albumsList, setAlbumsList] = useState([]);

    useEffect(() => {
        fetchAlbums();
    }, [])

    const fetchAlbums = async () => {
        const response = await fetch(`${global_vars.api_url}/albums/artist/${selectedArtistId}`);
        const data = await response.json();
        if (response.status >= 400 || data.message) {
            setAlbumsList([])
        }
        setAlbumsList(data);
    }


    return (
        <section class="genres-component">
            <>
                <p onClick={onBackwards} className="backwards-button"><BackspaceFill></BackspaceFill> -- Volver a Artistas</p>
                <h1 class="genres-title">Albumes del artista:</h1>
                {(albumsList && albumsList.length > 0) ? (
                    <div class="d-flex container flex-wrap justify-content-center align-items-center">
                        {albumsList.map((album) => (
                            <div className="row album-item" key={album.id}>
                                <div className="col-sm-4">
                                    <img src={global_vars.albums_files_path + album.picture_path} className="img-fluid w-100" />
                                </div>
                                <div className="col-sm-8">
                                    <h2>{album.album_name}</h2>
                                    <div className="d-flex flex-column justify-content-center">
                                        {album.songs.length <= 0 && (
                                            <p className="text-center">No hay canciones en este album</p>
                                        )}
                                        {album.songs.map((song) => (
                                            <div className="song-item" key={song.id} onClick={() => global_state.setCurrentSongId(song.id)}>
                                                <h5>{song.song_name}</h5>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h2>No hay albumes para este artista</h2>
                    </div>
                )}
            </>
        </section>
    )
}

export default AlbumsView;