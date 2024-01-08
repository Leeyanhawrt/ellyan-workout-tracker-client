import { Route, Routes, Navigate } from "react-router-dom";
import { ModalProvider } from "./contexts/ModalContext";
import { UserMaxesProvider } from "./contexts/UserMaxesContext";
import { MicrocyclesProvider } from "./contexts/MicrocyclesContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import HomePage from "./scenes/home/HomePage";
import Login from "./scenes/home/Login";
import Unauthorized from "./scenes/globals/Unauthorized";
import AdminLogin from "./scenes/home/AdminLogin";
import DashboardPage from "./scenes/dashboard/DashboardPage";
import AdminPage from "./scenes/admin/AdminPage";
import Nav from "./scenes/globals/Nav";
import useAuthentication from "./hooks/useAuthentication";
import { useUser } from "./contexts/UserContext";

const App = () => {
  const user = useUser();

  const { isAuthenticated } = useAuthentication();

  return (
    <>
      <MicrocyclesProvider>
        <UserMaxesProvider>
          <ModalProvider>
            <Nav />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login />
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
              <Route
                path="/admin/*"
                element={
                  isAuthenticated &&
                  user?.roles?.some((role) => role === "member") ? (
                    <AdminPage />
                  ) : (
                    <Navigate to="/login/admin" />
                  )
                }
              />
              <Route
                path="/login/admin"
                element={
                  !isAuthenticated ? (
                    <AdminLogin />
                  ) : user?.roles?.some((role) => role === "admin") ? (
                    <Navigate to="/admin/manage_users" replace />
                  ) : (
                    <Unauthorized />
                  )
                }
              />
            </Routes>
            <ToastContainer />
          </ModalProvider>
        </UserMaxesProvider>
      </MicrocyclesProvider>
    </>
  );
};

export default App;
