import axios from "axios";
const instance = axios.create();
instance.interceptors.request.use(function (config:any) {
    // 在发送请求之前做些什么
    const token=localStorage.getItem('token')
    config.headers.Authorization=`Bearer ${token}`
    return config;
  }, function (error:any) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response:any) {
    const {authorization}=response.headers
    authorization&&localStorage.setItem('token',authorization)
    return response;
  }, function (error:any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  export default instance