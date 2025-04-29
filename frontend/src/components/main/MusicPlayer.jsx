import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PauseCircleFill, PlayCircleFill } from "react-bootstrap-icons";
import global_vars from "../../config/global_vars";

const MusicPlayer = (props) => {
    const { currentSongUrl } = props;

    const [currentSongName, setCurrentSongName] = useState("");
    const [currentSongArtist, setCurrentSongArtist] = useState("");
    const [currentSongFilePath, setCurrentSongFilePath] = useState("");

    const [currentTime, setCurrentTime] = useState("");
    const [progress, setProgress] = useState(0);

    const audioControlsRef = useRef(null);

    //useEffect to fetch song data when currentSongUrl changes
    useEffect(() => {
        console.log("Current song:", currentSongUrl);
        fetchSongData();
    }, [currentSongUrl]);

    useEffect(() => {
        const audioControls = audioControlsRef.current;

        const handleTimeUpdate = () => {
            const progress = getSongsProgress();
            const currentTime = getSongCurrentTime();

            setProgress(progress);
            setCurrentTime(currentTime);
        }

        audioControls.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audioControls.removeEventListener("timeupdate", handleTimeUpdate);
        }
    }, [])

    const fetchSongData = async () => {
        const response = await fetch(currentSongUrl);
        const data = await response.json();

        console.log("data:", data);

        setCurrentSongName(data.song_name);
        setCurrentSongArtist(data.albums.artists.name);
        setCurrentSongFilePath(data.file_path);
    }

    const handlePlayPause = () => {
        if (audioControlsRef.current.paused) {
            audioControlsRef.current.play();
        } else {
            audioControlsRef.current.pause();
        }
    }

    const getSongDuration = () => {
        if (audioControlsRef.current) {
            const duration = audioControlsRef.current.duration;
            //duration string
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            return formattedDuration;
        }
        return "0:00";
    }

    const getSongsProgress = () => {
        if (audioControlsRef.current) {
            const progress = audioControlsRef.current.currentTime / audioControlsRef.current.duration * 100;
            return progress;
        }
        return 0;
    }

    const getSongCurrentTime = () => {
        if (audioControlsRef.current) {
            const currentTime = audioControlsRef.current.currentTime;
            //current time string
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            const formattedCurrentTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            return formattedCurrentTime;
        }
        return "0:00";
    }

    return (
        <>
            <section className="music-player p-3">
                <Row>
                    <Col className="col-sm-2">
                        <h3>{currentSongName}</h3>
                        <p className="small">{currentSongArtist}</p>
                    </Col>
                    <Col className="col-sm-9 text-center align-content-center justify-content-center">
                        <div>
                            {audioControlsRef.current && (
                                <Button className="rounded-5" onClick={() => { handlePlayPause() }}>
                                    {audioControlsRef.current.paused ?
                                        <PlayCircleFill size={30}></PlayCircleFill>
                                        :
                                        <PauseCircleFill size={30}></PauseCircleFill>
                                    }
                                </Button>
                            )}
                        </div>
                        <br></br>
                        <div className="d-flex align-content-center justify-content-center">
                            <p class="small">{currentTime}</p>
                            <input type="range" min="0" max="100" step="1" value={progress} className="song-progress" class="w-100" />
                            <p class="small">{getSongDuration()}</p>
                        </div>
                    </Col>
                    <div className="hidden-audio-player visually-hidden">
                        <audio ref={audioControlsRef} id="audio_player" controls>
                            {(currentSongFilePath) && (
                                <source src={global_vars.songs_files_path + currentSongFilePath} type="audio/mpeg" />
                            )}
                        </audio>
                    </div>
                </Row>
            </section>
        </>
    )
}

export default MusicPlayer;