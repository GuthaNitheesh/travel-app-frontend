// services/index.js or services/auth.js
import axios from "axios";

export const loginHandler = async (number, password) => {
  try {
    const response = await axios.post("https://travel-app-backend-uyij.onrender.com/api/auth/login", {
      number,
      password
    });

    const { accessToken, username } = response.data;
    return { accessToken, username };
  } catch (err) {
    // 🚨 Important: explicitly throw error so login form can catch it
    throw new Error(err.response?.data?.message || "Login failed");
  }
};
