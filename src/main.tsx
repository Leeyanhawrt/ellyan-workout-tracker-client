import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/stylesheets/application.css.scss";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config.js";
import { AuthProvider } from "./contexts/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
);
