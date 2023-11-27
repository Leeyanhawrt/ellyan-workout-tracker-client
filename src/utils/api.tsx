import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND,
});

export const fetchData = async (
  path: string,
  resource: string,
  authorization: boolean = false
) => {
  try {
    const response = await api.get(`${path}`, {
      headers: authorization ? { token: localStorage.token } : {},
    });

    return response;
  } catch (error) {
    console.error(`Error Fetching ${resource}: ${error}`);
    throw error;
  }
};
