import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/stylesheets/application.css.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
