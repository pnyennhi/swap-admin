import Axios from "axios";

const Instance = () =>
  Axios.create({
    headers: {
      Authorization: "Bearer " + localStorage.getItem("TOKEN_AUTH"),
    },
    validateStatus: function (status) {
      if (status === 401) {
        localStorage.clear();
        window.location.assign("/");
      }
      return status;
    },
  });
export default Instance;
