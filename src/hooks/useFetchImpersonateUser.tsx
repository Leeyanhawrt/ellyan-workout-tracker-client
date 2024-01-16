import { useEffect } from "react";
import {
  useImpersonateUser,
  useImpersonateUserUpdate,
} from "../contexts/ImpersonateUserContext";
import { fetchData } from "../utils/api";
import { User } from "../contexts/UserContext";

const useFetchImpersonateUser = (userId?: string) => {
  const impersonatedUser = useImpersonateUser();
  const setImpersonateUser = useImpersonateUserUpdate();

  const setData = async () => {
    try {
      const url = `/admin/users/${userId}`;

      const response = await fetchData(url, "Impersonate Users", true);

      const data: User = response?.data;

      setImpersonateUser(data);
    } catch (err) {
      console.error("Error Fetching Impersonated User:", err);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return impersonatedUser;
};

export default useFetchImpersonateUser;
