
import { useEffect, useState } from 'react';
import MusicPlayer from '../../components/main/MusicPlayer';
import '../../index.css'

const MainPage = () => {

    const [currentSongUrl, setCurrentSongUrl] = useState(null);

    useEffect(() => {
        setCurrentSongUrl('http://localhost:3000/api/songs/10')
    }, [])

    return (
        <main className="main-page bg-dark">
            <h1>Hola</h1>
            {(currentSongUrl) && (
                <MusicPlayer currentSongUrl={currentSongUrl} />
            )}
        </main>
    );
}

export default MainPage;