import {serverURL} from "../config"
export const backEndServer:string=serverURL;
export const getConfig=(token:string):Object=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config;
}