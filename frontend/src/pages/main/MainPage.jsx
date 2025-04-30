
import { useEffect, useState } from 'react';
import MusicPlayer from '../../components/main/MusicPlayer';
import '../../index.css'
import GenresView from '../../components/main/GenresView';'../../components/main/GenresView'

const MainPage = () => {

    const [currentSongId, setCurrentSongId] = useState(null);

    const global_state = {
        currentSongId: currentSongId,
        setCurrentSongId: setCurrentSongId,
    }

    useEffect(() => {
        setCurrentSongId(currentSongId)
    }, [currentSongId])

    return (
        <main className="main-page bg-dark">
            <GenresView global_state={global_state}/>
            {(currentSongId) && (
                <MusicPlayer currentSongId={currentSongId} />
            )}
        </main>
    );
}

export default MainPage;