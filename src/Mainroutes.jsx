import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AddSongs from "./pages/AddSongs";
import SongsLibrary from "./pages/SongsLibrary";

const Mainroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add_songs" element={<AddSongs />} />
            <Route path="/songs_library" element={<SongsLibrary />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
        </Routes>
    );
};

export default Mainroutes;
