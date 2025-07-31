import { useContext, useEffect } from "react";
import { PlayerContext } from "./components/PlayerContextProvider.jsx";
import Mainroutes from "./Mainroutes.jsx";
import { ToastContainer } from "react-toastify";
import axios from "./API/axios_config.js";
import AudioPlayer from "./components/AudioPlayer";

const App = () => {
    const { setSongs } = useContext(PlayerContext);
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

    return (
        <div>
            <Mainroutes />
            <AudioPlayer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                pauseOnHover={true}
                draggable={true}
            />
        </div>
    );
};

export default App;
