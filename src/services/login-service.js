import axios from "axios";

export const loginHandler = async (number, password) => {
  try {
    const response = await axios.post(
      "https://travel-app-backend-uyij.onrender.com/api/auth/login",
      {
        number: number,
        password: password,
      }
    );

    const { accessToken, username } = response.data;
    console.log(response.data); // ✅ Logs full data

    return { accessToken, username };
  } catch (err) {
    console.log(err);
  }
};
