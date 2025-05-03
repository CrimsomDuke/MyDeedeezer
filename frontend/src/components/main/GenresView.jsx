import { useEffect, useState } from "react";
import global_vars from "../../config/global_vars";
import "../../index.css";
import ArtistsView from './ArtistsView';


const GenresView = (props) => {

    const global_state = props.global_state;

    const [genresList, setGenresList] = useState([]);
    const [selectedGenreId, setSelectedGenreId] = useState(0);

    useEffect(() => {
        fetchGenres();
    }, [])

    const fetchGenres = async () => {
        const response = await fetch(`${global_vars.api_url}/genres`);
        const data = await response.json();

        setGenresList(data);
    }

    const handleBackwardsArtists = () => {
        setSelectedGenreId(0);
    }

    return (
        <section class="genres-component container">
            {!selectedGenreId > 0 && (
                <>
                    <h1 class="genres-title">Bienvenido a MyDeeDeezer, estos son nuestro generos</h1>
                    {(genresList && genresList.length > 0) ? (
                        <div class="d-flex container flex-wrap justify-content-center align-items-center">
                            {genresList.map((genre) => (
                                <div className="genre-item" onClick={() => setSelectedGenreId(genre.id)} key={genre.id}>
                                    <img src={global_vars.genres_files_path + genre.banner_path} className="img-fluid w-100" />
                                    <h3>{genre.name}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h2>No hay generos disponibles</h2>
                        </div>
                    )}
                </>
            )}

            {selectedGenreId > 0 && (
                <div className="content-wrapper">
                    <ArtistsView selectedGenreId={selectedGenreId} onBackwards={handleBackwardsArtists}
                        global_state={global_state} />
                </div>
            )}
        </section>
    )
}

export default GenresView;