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
        <section className="text-white pt-5 mt-5">
            <p onClick={onBackwards} className="backwards-button">
                <BackspaceFill /> Volver a Artistas
            </p>

            <h1 className="genres-title text-center mb-4">Álbumes del Artista</h1>

            {(albumsList && albumsList.length > 0) ? (
                <div className="container d-flex flex-wrap justify-content-center mt-5 pt-5">
                    {albumsList.map((album) => (
                        <div className="album-card" key={album.id}>
                            <img
                                src={global_vars.albums_files_path + album.picture_path}
                                alt={album.album_name}
                                className="album-cover w-100"
                            />
                            <div className="album-details">
                                <h4>{album.album_name}</h4>
                                {album.songs.length <= 0 ? (
                                    <p className="text-muted">No hay canciones en este álbum.</p>
                                ) : (
                                    album.songs.map((song) => (
                                        <div
                                            className="song-item"
                                            key={song.id}
                                            onClick={() => global_state.setCurrentSongId(song.id)}
                                        >
                                            {song.song_name}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-5">
                    <h2>No hay álbumes para este artista.</h2>
                </div>
            )}
        </section>
    )
}

export default AlbumsView;