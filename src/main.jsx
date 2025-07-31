import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./components/PlayerContextProvider";

createRoot(document.getElementById("root")).render(
    <PlayerContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </PlayerContextProvider>
);
