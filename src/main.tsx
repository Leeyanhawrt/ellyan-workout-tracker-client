import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/stylesheets/application.css.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./i18n/config.js";
import store from "./store/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
