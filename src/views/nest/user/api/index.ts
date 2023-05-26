import { id } from "element-plus/es/locale";
import instance from "./request";
export interface LoginData {
  username: string;
  password: string;
}

export interface ResListType<T> {
  code: number;
  data: {
    list: T[];
    total: number;
  };
  msg: string;
}

export interface ResType<T> {
  code: number;
  data: T;
  msg: string;
}

export interface UserListRes {
  account_name: string;
  real_name: string;
  mobile: string;
  role: string;
  user_status: string;
  create_time: string;
  update_time: string;
}
export const apiGetUserList = (
  keyword: string,
  page: number,
  limit: number
): Promise<ResListType<UserListRes>> => {
  if (keyword === "") keyword = "@@@123";
  return instance.get("/nest2001/user/" + keyword, { params: { page, limit } });
};

export interface LoginRes {
  token?: string;
  user?: IUserInfo;
}
export interface IUserInfo {
  account_name: string;
  real_name: string;
  mobile: string;
  role: string;
  user_status: string;
  create_time: string;
  update_time: string;
  [key: string]: any;
}
export const apiLogin = (
  data: LoginData
): Promise<ResType<LoginRes | null>> => {
  return instance.post("/nest2001/login", data);
};

export const apiAddUser = (data: any): Promise<ResType<LoginRes | null>> => {
  return instance.post("/nest2001/user", data);
};

export const apiUpdateUser = (
  id: number,
  data: any
): Promise<ResType<LoginRes | null>> => {
  return instance.patch("/nest2001/user/" + id, data);
};

export const apiDeleteUser = (
  id: number
): Promise<ResType<LoginRes | null>> => {
  return instance.delete("/nest2001/user/" + id);
};
