import instance from "@/util/request.js";
export const login=async(data:any)=>{
    return await instance.request({
        url:'/blogApi/login',
        method:'post',
        data
    })
}
export const uploadImage=async(data:any)=>{
    return await instance.request({
        url:'/blogApi/upload/image',
        method:'post',
        data
    })
}
export const uploadVideo=async(data:any)=>{
    return await instance.request({
        url:'/blogApi/upload/video',
        method:'post',
        data
    })
}