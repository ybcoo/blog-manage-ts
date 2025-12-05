import instance from "@/util/request.js";
export const login=async(data:any)=>{
    return await instance.request({
        url:'/blogApi/login',
        method:'post',
        data
    })
}