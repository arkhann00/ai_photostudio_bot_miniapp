import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initTelegramUI } from "./lib/telegram.js";
import "./StyleModal.css"
import "./index.css"
import "./App.css"

initTelegramUI();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
