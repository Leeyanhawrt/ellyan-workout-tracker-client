import { useEffect } from "react";
import { useAuth, useAuthUpdate } from "../contexts/AuthContext";
import { fetchData } from "../utils/api";

const useAuthentication = () => {
  const authState = useAuth();
  const setAuthState = useAuthUpdate();

  const isAuth = async () => {
    try {
      const response = await fetchData(
        `/auth/is-verified`,
        "Authentication Status",
        true
      );

      const data = response.data;

      data === true ? setAuthState(true) : setAuthState(false);
    } catch (err) {
      console.error((err as Error)?.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, [isAuth]);

  return { isAuthenticated: authState };
};

export default useAuthentication;
