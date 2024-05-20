import { getUser, removeUser } from "../utils/auth";
import axios from "axios";

// axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.baseURL = "https://academify-f0qd.onrender.com";

axios.interceptors.request.use((config) => {
  const user = getUser();
  config.headers.Authorization = `Bearer ${user?.token}`;
  config.headers.Accept = "application/json";
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      removeUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { axios as customAxios };
