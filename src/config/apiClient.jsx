import axios from "axios";

const axiosClient = axios.create({
  baseURL:  "http://192.168.18.240:4000",
  // withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

//console.log(axiosClient.headers);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log(error);
    return error;
  }
);

export default axiosClient;
