import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {useUser} from "../store/user";

// 创建一个 Axios 实例
const request: AxiosInstance = axios.create({
    timeout: 10000, // 设置默认的请求超时时间（单位为毫秒）
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
});

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error: any) => {
        console.log(error,'error123123131')
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // 对响应数据做点什么
        console.log(response,'response123')
        if(response.data.code === '1' && response.data.msg === "未登录或登录超时。请重新登录"){
            useUser().setToken('')
        } else  {
            useUser().setToken(''+Date.now())
            if (response.data.code === 200) {
                useUser().setToken(''+Date.now())
            }
        }

        return response;
    },
    (error: any) => {
        console.log(error,'error123')
        if(error.code ==="ERR_NETWORK"){
            console.log('网络错误')
            useUser().setToken('')
        }
        return
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default request;
