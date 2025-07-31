import { createContext, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const [emotion, setEmotion] = useState(null);
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    return (
        <PlayerContext.Provider
            value={{
                emotion,
                setEmotion,
                songs,
                setSongs,
                currentSong,
                setCurrentSong,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
