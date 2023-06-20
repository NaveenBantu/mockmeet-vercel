import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_API_URL}`,
});

let accessToken = "";

export const setAccessToken = (token) => {
  accessToken = token;
};

// Adding Authorization header to all the axios request calls
// axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Retrieve the access token from your storage or wherever it's stored
    // const accessToken = localStorage.getItem("accessToken");

    // If an access token exists, add it to the request headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
