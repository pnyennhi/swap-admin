import axios from "axios";

const Instance = axios.create();

Instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("TOKEN_AUTH");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert(1);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default Instance;
