import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
});

const useAxios = <T,>(
  initialValue: T,
  path: string,
  resource: string,
  authorization: boolean = false
) => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get(`${path}`, {
        headers: authorization ? { token: localStorage.token } : {},
      });
      setData(response.data);
    } catch (err) {
      setError(`Error Fetching ${resource}: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useAxios;
