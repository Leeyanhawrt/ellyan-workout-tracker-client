import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/stylesheets/application.css.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import "./i18n/config.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </AuthProvider>
);
