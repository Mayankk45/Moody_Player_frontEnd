import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currUser, setCurrUser] = useState("");

    useEffect(() => {
        const currUser = JSON.parse(localStorage.getItem("moody_player_user"));
        if (currUser) {
            if (currUser.isAdmin) setIsAdmin(true);
            setCurrUser(currUser.userName);
            setShowLogout(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("moody_player_user");
        setShowLogout(false);
        setIsAdmin(false);
        setCurrUser("");
        toast.success("Logout Successfully");
    };

    return (
        <>
            <div className="navbar">
                <div className="navbar__left">
                    <h1 className="logo">
                        <Link to="/">MoodyPlayer</Link>
                    </h1>
                </div>

                <div className="navbar__center">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link
                                to="/songs_library"
                                onClick={(e) => {
                                    if (!currUser) {
                                        e.preventDefault(); // stop navigation
                                        toast.warn(
                                            "Please login to access Library"
                                        );
                                    }
                                }}
                            >
                                Library
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/mood-history">Mood History</Link>
                        </li> */}
                        {isAdmin && (
                            <li>
                                <Link to="/add_songs">Add Songs</Link>
                            </li>
                        )}
                    </ul>
                </div>

                {currUser && (
                    <div className="welcome_banner">
                        <p>
                            welcome :{" "}
                            <span className="userName">{currUser}</span>
                        </p>
                    </div>
                )}

                <div className="navbar__right">
                    <div className="user-menu">
                        <FaUserCircle
                            onClick={() => setShowLogin(!showLogin)}
                            className="user-icon"
                        />
                        {showLogin && !showLogout && (
                            <div className="login-modal">
                                <Link to="/register">User</Link>
                                <Link to="/adminlogin">Admin</Link>
                            </div>
                        )}
                        {showLogin && showLogout && (
                            <p className="login-modal" onClick={handleLogout}>
                                Logout
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
