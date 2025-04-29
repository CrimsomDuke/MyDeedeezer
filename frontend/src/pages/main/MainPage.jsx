
import { useEffect, useState } from 'react';
import MusicPlayer from '../../components/main/MusicPlayer';
import '../../index.css'
import GenresView from '../../components/main/GenresView';'../../components/main/GenresView'

const MainPage = () => {

    const [currentSongUrl, setCurrentSongUrl] = useState(null);

    const global_state = {
        current_song_url: currentSongUrl,
        setCurrentSongUrl: setCurrentSongUrl,
    }

    useEffect(() => {
        setCurrentSongUrl(global_state.current_song_url)
    }, [])

    return (
        <main className="main-page bg-dark">
            <GenresView global_state={global_state}/>
            {(currentSongUrl) && (
                <MusicPlayer currentSongUrl={currentSongUrl} />
            )}
        </main>
    );
}

export default MainPage;