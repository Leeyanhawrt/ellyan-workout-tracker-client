import axios from "axios";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

interface RegisterUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const backendUrl = import.meta.env.VITE_APP_BACKEND;

const registerUser = createAsyncThunk(
  "auth/register",
  async (userData: RegisterUserPayload) => {
    const { firstName, lastName, email, password } = userData;

    try {
      const response = await axios.post(`${backendUrl}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      return response.data;
    } catch (err) {
      console.log(err);
      return isRejectedWithValue(
        (err as Error)?.message || "Failed to register"
      );
    }
  }
);

export { registerUser };
