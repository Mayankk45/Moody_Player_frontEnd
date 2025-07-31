import { useContext, useRef, useEffect } from "react";
import { PlayerContext } from "./PlayerContextProvider";
import { FaPlay, FaPause } from "react-icons/fa";

const Songs = () => {
    const { songs, emotion, setCurrentSong, currentSong } =
        useContext(PlayerContext);

    const filteredSongs = songs?.filter((item) => item.mood === emotion);

    const audioRef = useRef(null);

    // Handle pause when currentSong becomes null
    useEffect(() => {
        if (!currentSong && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [currentSong]);

    const handleSongPlayClick = (item) => {
        if (currentSong && currentSong._id === item._id) {
            // Pause the audio before removing currentSong
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            setCurrentSong(null);
        } else {
            setCurrentSong(item);
        }
    };

    return (
        <div className="mood_songs">
            <p>Let the Music Feel What You Feel</p>

            <div className="all_songs_card">
                {filteredSongs?.length > 0 ? (
                    filteredSongs.map((item) => (
                        <div className="song_card" key={item._id}>
                            <div className="song_info">
                                <img
                                    src={item.image || "/guitar.jpg"}
                                    alt={item.title}
                                    className="song_image"
                                />

                                <div className="song_meta">
                                    <p className="title">{item.title}</p>
                                    <p className="artist">
                                        Artist: {item.artist}
                                    </p>

                                    <div className="audio_wrapper">
                                        <button
                                            className="play_btn"
                                            onClick={() =>
                                                handleSongPlayClick(item)
                                            }
                                        >
                                            {currentSong &&
                                            currentSong._id === item._id ? (
                                                <FaPause />
                                            ) : (
                                                <FaPlay />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no_songs">Currently no songs available</div>
                )}
            </div>

            {/* Hidden audio element to control pause when song removed */}
            <audio ref={audioRef} style={{ display: "none" }} />
        </div>
    );
};

export default Songs;
