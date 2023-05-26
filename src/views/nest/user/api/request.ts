import axios, { AxiosInstance } from "axios";
import { ElNotification } from "element-plus";
import router from "../../../../router";
const instance: AxiosInstance = axios.create({
  // baseURL: "http://c.ll12138.icu:2001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      ElNotification.error({
        message: "登录已过期，请重新登录",
      });
      // 跳转到登录页面 /user/login
      router.push("/nest/user/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
