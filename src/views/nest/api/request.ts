import axios from "axios";
import { ElNotification } from "element-plus";
const baseURL = "http://localhost:2000";
const request = axios.create({
  baseURL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 400) {
      ElNotification({
        message: response.data.msg,
        type: "error",
      });
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
