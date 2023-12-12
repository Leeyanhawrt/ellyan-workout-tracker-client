import { useEffect } from "react";
import { useAuth, useAuthUpdate } from "../contexts/AuthContext";
import { useUserUpdate } from "../contexts/UserContext";
import { fetchData } from "../utils/api";

const useAuthentication = () => {
  const authState = useAuth();
  const setAuthState = useAuthUpdate();
  const setUser = useUserUpdate();

  const isAuth = async () => {
    try {
      const response = await fetchData(
        `/auth/is-verified`,
        "Authentication Status",
        true
      );

      const data = response?.data;

      if (data) {
        setAuthState(true);
        setUser(data);
      } else {
        setAuthState(false);
      }
    } catch (err) {
      console.error((err as Error)?.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  return { isAuthenticated: authState };
};

export default useAuthentication;
