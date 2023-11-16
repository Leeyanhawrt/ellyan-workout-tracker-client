import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const backendUrl = import.meta.env.VITE_APP_BACKEND;

  useEffect(() => {
    isAuth();
  }, []);

  const setAuth = (value: boolean) => {
    setIsAuthenticated(value);
  };

  const isAuth = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/is-verified`, {
        headers: { token: localStorage.token },
      });

      response.data === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (err) {
      console.log((err as Error)?.message);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={setAuth} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Register setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setAuth={setAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
