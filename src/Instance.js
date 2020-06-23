import axios from "axios";
import { useHistory } from "react-router-dom";
import { deleteUser } from "./redux/actions/user";

const history = useHistory();

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
      localStorage.clear();
      deleteUser();
      history.push("/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default Instance;
