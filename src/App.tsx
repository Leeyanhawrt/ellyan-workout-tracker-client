import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth, useAuthUpdate } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import DashboardPage from "./pages/DashboardPage";
import Nav from "./components/Nav";

const App = () => {
  const authStatus = useAuth();
  const setAuth = useAuthUpdate();

  useEffect(() => {
    isAuth();
  }, []);

  const isAuth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/auth/is-verified`,
        {
          headers: { token: localStorage.token },
        }
      );

      response.data === true ? setAuth(true) : setAuth(false);
    } catch (err) {
      console.log((err as Error)?.message);
    }
  };

  return (
    <>
      <ModalProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              !authStatus ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              authStatus ? (
                <DashboardPage setAuth={setAuth} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
        <ToastContainer />
      </ModalProvider>
    </>
  );
};

export default App;
