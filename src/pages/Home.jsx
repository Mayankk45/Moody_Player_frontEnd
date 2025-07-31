import Songs from "../components/Songs";
import WebcamView from "../components/WebcamView";
import Navbar from "./../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <WebcamView />
            <Songs />
        </div>
    );
};

export default Home;
