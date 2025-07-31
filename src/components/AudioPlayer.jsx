import { useContext, useRef, useEffect, useState } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaPlay, FaPause } from "react-icons/fa";

const AudioPlayer = () => {
    const { currentSong } = useContext(PlayerContext);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    console.log(currentSong);
    useEffect(() => {
        if (audioRef.current && currentSong) {
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
            setProgress(0);
        }

        if (!currentSong) {
            audioRef.current.load();
            audioRef.current.pause();
            setIsPlaying(false);
            setProgress(0);
        }
    }, [currentSong]);

    // Update progress bar as song plays
    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            if (audio?.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        if (audio) {
            audio.addEventListener("timeupdate", updateProgress);
        }

        return () => {
            audio?.removeEventListener("timeupdate", updateProgress);
        };
    }, [audioRef.current]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const value = e.target.value;
        const audio = audioRef.current;
        if (audio?.duration) {
            audio.currentTime = (value / 100) * audio.duration;
            setProgress(value);
        }
    };

    if (currentSong?.length < 1) return;

    return (
        <div className="audio_player_bar">
            <div className="song_info">
                <img
                    src={currentSong?.image || "/guitar.jpg"}
                    alt="cover"
                    className="song_cover"
                />
                <div className="song_texts">
                    <p className="song_title">{currentSong?.title}</p>
                    <p className="song_artist">{currentSong?.artist}</p>
                </div>
            </div>

            <div className="controlls">
                <button className="play_btn" onClick={togglePlay}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="progress_bar"
                    style={{
                        background: `linear-gradient(to right, green ${
                            progress + 0.5
                        }%, #ccc ${progress + 0.5}%)`,
                    }}
                />
            </div>

            <audio ref={audioRef}>
                <source src={currentSong?.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
