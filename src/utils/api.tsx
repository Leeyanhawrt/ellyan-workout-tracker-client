import axios from "axios";
import { toast } from "react-toastify";

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
  }
};

export const postData = async <T,>(
  path: string,
  data: T,
  authorization: boolean = false
) => {
  try {
    const response = await api.post(`${path}`, data, {
      headers: authorization ? { token: localStorage.token } : {},
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err.response?.data.error || err.message;
      console.error(error);
      toast.error(error);
    } else {
      console.error((err as Error)?.message);
      toast.error((err as Error)?.message);
    }
  }
};

export const deleteData = async (
  path: string,
  authorization: boolean = false
) => {
  try {
    const response = await api.delete(`${path}`, {
      headers: authorization ? { token: localStorage.token } : {},
    });

    if (response.status === 200) {
      toast.success(response.data.message);
    }

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const error = err.response?.data.error || err.message;
      console.error(error);
      toast.error(error);
    } else {
      console.error((err as Error)?.message);
      toast.error((err as Error)?.message);
    }
  }
};
