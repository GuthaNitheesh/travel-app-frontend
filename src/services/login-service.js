import axios from "axios";

export const loginHandler = async (number, password) => {
  try {
    const response = await axios.post("https://travel-app-backend-uyij.onrender.com/api/auth/login", {
      number,
      password
    });

    const { accessToken, username } = response.data;

    if (!accessToken || !username) {
      throw new Error("Missing access token or username in response");
    }

    return { accessToken, username };
  } catch (err) {
    // Proper error propagation
    const message = err.response?.data?.message || "Invalid credentials";
    throw new Error(message);
  }
};
