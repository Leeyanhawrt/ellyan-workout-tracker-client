import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthUpdate } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { UserMaxesProvider } from "./contexts/UserMaxesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import HomePage from "./scenes/home/HomePage";
import Footer from "./components/Footer";
import Login from "./scenes/home/Login";
import DashboardPage from "./scenes/dashboard/DashboardPage";
import Nav from "./scenes/globals/Nav";
import useAuthentication from "./hooks/useAuthentication";

const App = () => {
  const setAuth = useAuthUpdate();

  const { isAuthenticated } = useAuthentication();

  return (
    <>
      <UserMaxesProvider>
        <ModalProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate to="/dashboard/workout_program" replace />
                )
              }
            />
            <Route
              path="/dashboard/*"
              element={
                isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />
              }
            />
          </Routes>
          <Footer />
          <ToastContainer />
        </ModalProvider>
      </UserMaxesProvider>
    </>
  );
};

export default App;
