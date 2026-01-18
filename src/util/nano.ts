import { customAlphabet } from "nanoid";
export const nanoid = (length: number = 8) => {
    const nanoid=customAlphabet('123456789abcdefghijklmnopqrstuvwxyz',length)
    return nanoid()
};
export const sleep=(ms:number)=>{
    return new Promise(resolve=>setTimeout(resolve,ms))
}