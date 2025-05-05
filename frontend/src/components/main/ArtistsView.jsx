import { useEffect, useState } from "react";
import global_vars from "../../config/global_vars";
import AlbumsView from "./AlbumsView";
import { BackspaceFill } from "react-bootstrap-icons";


const ArtistsView = (props) => {

    const { selectedGenreId, onBackwards, global_state } = props;

    const [artistsList, setArtistsList] = useState([]);
    const [selectedArtistId, setSelectedArtistId] = useState(0);

    useEffect(() => {
        fetchArtists();
    }, [])

    const fetchArtists = async () => {
        const response = await fetch(`${global_vars.api_url}/artists/genre/${selectedGenreId}`);
        const data = await response.json();

        setArtistsList(data);
    }

    const handleBackwardsAlbums = () => {
        setSelectedArtistId(0);
    }

    return (
        <section class="genres-component container">
            {selectedArtistId <= 0 && (
                <>
                    <p onClick={onBackwards} className="backwards-button"><BackspaceFill></BackspaceFill> -- Volver a generos</p>
                    <h1 class="genres-title">Los artistas del genero</h1>
                    {(artistsList && artistsList.length > 0) ? (
                        <div class="d-flex container flex-wrap justify-content-center align-items-center">
                            {artistsList.map((artist) => (
                                <div className="genre-item" key={artist.id} onClick={() => setSelectedArtistId(artist.id)}>
                                    <img src={global_vars.artists_files_path + artist.picture_path} className="img-fluid w-100" />
                                    <h3>{artist.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h2>No hay artistas para este genero</h2>
                        </div>
                    )}
                </>
            )}

            {selectedArtistId > 0 && (
                <div className="content-wrapper">
                    <AlbumsView selectedArtistId={selectedArtistId} onBackwards={handleBackwardsAlbums}
                        global_state={global_state} />
                </div>
            )}
        </section>
    )
}

export default ArtistsView;