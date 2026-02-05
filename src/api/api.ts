import instance from "@/util/request.js";
export const login = async (data: any) => {
  return await instance.request({
    url: "/blogApi/login",
    method: "post",
    data,
  });
};
export const register = async (data: any) => {
  return await instance.request({
    url: "/blogApi/register",
    method: "post",
    data,
  });
};
export const uploadImage = async (data: any) => {
  return await instance.request({
    url: "/blogApi/upload/image",
    method: "post",
    data,
  });
};
export const uploadVideo = async (data: any) => {
  return await instance.request({
    url: "/blogApi/upload/video",
    method: "post",
    data,
  });
};
export const createArticle = async (data: any) => {
  return await instance.request({
    url: "/blogApi/createArticle",
    method: "post",
    data,
  });
};
export const getArticle = async (params?: any) => {
  return await instance.request({
    url: "/blogApi/getArticle",
    method: "get",
    params,
  });
};
export const deleteArticle = async (data: any) => {
  return await instance.request({
    url: "/blogApi/deleteArticle",
    method: "post",
    data,
  });
};
export const getUser = async (params?: any) => {
  return instance.request({
    url: "/blogApi/getUser",
    method: "get",
    params,
  });
};
export const deleteUser = async (data?: any) => {
  return await instance.request({
    url: "/blogApi/updateUser",
    method: "post",
    data,
  });
};
export const updateUser = async (data?: any) => {
  return await instance.request({
    url: "/blogApi/updateUser",
    method: "post",
    data,
  });
};