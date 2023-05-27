import request from "./request";
// @ts-ignore
import Qs from 'qs';

export const login = (data: any) => {
    return request.post('/api/login', Qs.stringify(data))
}

export const getImgUrl = () => {
    return request.get('/api/captcha/captchaImage?type=math',{responseType: 'blob'})
}

// 获取用户列表
export const getUserList = (data: any) => {
    return request.post('/api/system/user/list', {params: data})
}

// 获取服务器信息
export const getServerInfo = () => {
    return request.get('/api/monitor/server')
}