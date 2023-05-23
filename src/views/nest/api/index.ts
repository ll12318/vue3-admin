import request from "./request";
export interface IUser {
  id?: number;
  name: string;
  desc: string;
  jobid: number;
}
export const getUserList = (params: { keyword: string }) => {
  return request({
    url: "/usr-curd",
    method: "get",
    params,
  });
};

export const addUser = (data: IUser) => {
  return request({
    url: "/usr-curd",
    method: "post",
    data,
  });
};

export const delUser = (id: number) => {
  return request({
    url: `/usr-curd/${id}`,
    method: "delete",
  });
};

export const updateUser = (data: IUser) => {
  return request({
    url: `/usr-curd/${data.id}`,
    method: "patch",
    data,
  });
};
