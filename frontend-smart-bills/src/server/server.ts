export const backEndServer:string="https://bgrlmpqjvk.execute-api.ap-southeast-2.amazonaws.com/dev/"
export const getConfig=(token:string):Object=>{
    const config={
        headers: {
            Authorization:`Bearer ${token}`
        }
    }
    return config;
}