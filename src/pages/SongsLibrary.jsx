import { useContext, useEffect } from "react";
import { PlayerContext } from "./../components/PlayerContextProvider";
import { Link } from "react-router-dom";
import axios from "../API/axios_config";
import { FaPlay, FaPause } from "react-icons/fa";

const SongsLibrary = () => {
    const { songs, setSongs, setCurrentSong, currentSong } =
        useContext(PlayerContext);

    useEffect(() => {
        async function fetchSongs() {
            try {
                const allSongs = await axios.get("/songs");
                if (allSongs) setSongs(allSongs.data.songs);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchSongs();
    }, []);

    const handleSongPlayClick = (item) => {
        if (currentSong && currentSong._id === item._id) {
            // Clicking the same song = pause it (optional)
            setCurrentSong(null);
        } else {
            setCurrentSong(item);
        }
    };

    return (
        <div className="all_songs">
            <p className="go_home">
                <Link to="/">Back to Home</Link>
            </p>
            <div className="all_songs_card">
                {songs && songs.length > 0 ? (
                    songs.map((item, idx) => (
                        <div className="song_card" key={idx}>
                            <div className="song_info">
                                <img
                                    src={item.image || "/guitar.jpg"}
                                    alt="cover"
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
                                                <>
                                                    <FaPause />
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlay />
                                                </>
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
        </div>
    );
};

export default SongsLibrary;
